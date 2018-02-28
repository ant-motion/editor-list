import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Font from './components/Font';
import BackGround from './components/BackGround';
import Border from './components/Border';
import Interface from './components/Interface';
import Margin from './components/Margin';
import Shadow from './components/Shadow';
import Css from './components/Css';
import Transition from './components/Transition';
import State from './components/State';
import ClassName from './components/ClassName';
import {
  toArrayChildren,
  convertData,
  convertDefaultData,
  convertBorderData,
  convertShadowData,
  toCss,
  getRandomKey,
  removeMultiEmpty,
  getDomCssRule,
  getParentClassName,
  mobileTitle,
} from './utils';

const stateSort = { hover: 0, focus: 1, active: 2 };

class EditorList extends Component {
  static propTypes = {
    className: PropTypes.string,
    defaultActiveKey: PropTypes.any,
    editorElem: PropTypes.any,
    onChange: PropTypes.func,
    useClassName: PropTypes.bool,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    className: 'editor-list',
    defaultActiveKey: ['EditorClassName'],
    useClassName: true,
    onChange: () => {
    },
    isMobile: false,
  };

  constructor(props) {
    super(props);
    this.select = {};
    this.state = this.setDefaultState(props.editorElem);
    this.defaultDomClass = props.editorElem.className || '';
    this.setEditorElemClassName();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editorElem !== nextProps.editorElem) {
      this.setState(this.setDefaultState(nextProps.editorElem));
    }
    if (this.props.isMobile !== nextProps.isMobile) {
      this.domStyle = getDomCssRule(nextProps.editorElem, nextProps.isMobile,
        this.state.classState === 'default' ?
          null : this.state.classState);
      const value = this.getDefaultData(this.domStyle);
      this.defaultData = value;
      this.setState({ value });
    }
  }

  onStateChange = (key, data) => {
    if (key === 'cursor') {
      const value = {
        cursor: data === 'auto' ? null : data,
      };
      this.onChange('state', value);
    } else {
      this.onChangeCssState(data);
    }
  }

  onChangeCssState = (classState) => {
    const dom = this.props.editorElem;
    this.domStyle = getDomCssRule(dom, this.props.isMobile, classState === 'default' ?
      null : classState);
    const value = this.getDefaultData(this.domStyle);
    this.defaultData = value;
    this.setState({
      value,
      classState,
    });
    const { cssName, css, mobileCss } = this.state;
    this.props.onChange({
      cssName,
      value,
      css,
      mobileCss,
    });
  }

  onClassNameChange = (cssNameValue) => {
    const styleDom = this.ownerDocument.head.querySelector(`#${this.dataId}`);
    if (styleDom) {
      styleDom.remove();
    }
    this.setState({
      cssName: cssNameValue,
    }, this.setCssToDom);
  }

  onCssChange = (cssValue) => {
    const dom = this.props.editorElem;
    const { css, classState, mobileCss } = this.state;
    const myCss = this.props.isMobile ? mobileCss : css;
    this.setState({
      [this.props.isMobile ? 'mobileCss' : 'css']: {
        ...myCss,
        [classState]: cssValue,
      },
    }, () => {
      this.setCssToDom();
      // 关联编辑器里的参性, 吃性能;
      this.domStyle = getDomCssRule(dom, this.props.isMobile, classState === 'default' ?
        null : classState);
      const value = this.getDefaultData(this.domStyle);
      this.setState({
        value,
      });
    });
  }

  onChange = (key, data) => {
    const { value, classState, css, mobileCss } = this.state;
    const myCss = this.props.isMobile ? mobileCss : css;
    const v = {
      ...value,
      [key]: data,
    };
    let newCss = `  ${toCss(v, this.defaultData).replace(/\n/g, '\n  ')}`;
    const currentCss = newCss.split('\n')
      .filter(c => c).map(c => c.trim());
    const stateCss = myCss[classState];
    if (stateCss) {
      const stateCssArray = stateCss.split('\n').map(c => c.trim()).filter(c => c);
      const currentCssName = currentCss.map(str => str.split(':')[0].trim());
      const stateNewCss = stateCssArray.map(str =>
        currentCssName.indexOf(str.split(':')[0].trim()) >= 0 ? null : str
      ).filter(c => c);
      newCss = `  ${`${currentCss.join('\n  ')}\n  ${stateNewCss.join('\n  ')}`.trim()}`;
    }

    const state = {
      value: v,
      [this.props.isMobile ? 'mobileCss' : 'css']: {
        ...myCss,
        [classState]: newCss,
      },
    };
    this.setState(state, this.setCssToDom);
  };

  setCssToDom = () => {
    const { css, cssName, value, mobileCss } = this.state;
    const { editorElem } = this.props;
    if (cssName) {
      this.setClassToDom();
      this.setEditorElemClassName();
    } else {
      const str = css.default;
      editorElem.style.cssText = str.substring(str.indexOf('{') + 1, str.indexOf('}'));
    }
    this.props.onChange({
      css, cssName, value, mobileCss,
    });
  }

  setClassToDom = () => {
    const { css, mobileCss, cssName } = this.state;
    let cssStr = this.cssObjectToString(css, cssName);
    cssStr += `\n${mobileTitle}\n`;
    cssStr += this.cssObjectToString(mobileCss, cssName);
    cssStr += '\n}';
    const style = this.ownerDocument.head.querySelector(`#${this.dataId}`) || this.createStyle();
    style.innerHTML = cssStr;
  }

  setEditorElemClassName = () => {
    const dom = this.props.editorElem;
    if (this.defaultDomClass.indexOf(this.state.cssName) === -1) {
      dom.className = removeMultiEmpty(`${this.defaultDomClass} ${this.state.cssName}`).trim();
    }
  }

  setDefaultState = (dom) => {
    this.ownerDocument = dom.ownerDocument;
    this.domStyle = getDomCssRule(dom, this.props.isMobile);
    const value = this.getDefaultData(this.domStyle);
    this.defaultData = value;
    const cssName = this.getClassName();
    const css = this.getDefaultCssData(cssName);
    return {
      value,
      css: css.css,
      mobileCss: css.mobileCss,
      cssName,
      classState: 'default',
    };
  }

  getClassName = () => {
    const { editorElem } = this.props;
    const random = getRandomKey();
    this.dataId = editorElem.getAttribute('data-edit_css_id') || `edit_css-${random}`;
    editorElem.setAttribute('data-edit_css_id', this.dataId);
    const classNameArray = editorElem.className &&
      editorElem.className.split(' ');
    this.parentClassName = getParentClassName(editorElem);
    const editorClassName = classNameArray ? classNameArray[0] : `editor_css-${random}`;
    return this.props.useClassName ? editorClassName : '';
  };
  getDefaultCssData = () => {
    const css = {
      css: {
        default: '',
        hover: '',
        active: '',
        focus: '',
      },
      mobileCss: {
        default: '',
        active: '',
        focus: '',
      },
    };
    if (this.props.useClassName) {
      const setCssDataToDefault = (content, currentCss) => {
        content.split('}').filter(c => c.trim()).forEach(c => {
          const cssContentArray = c.split('{');
          const state = cssContentArray[0].split(':')[1];
          const key = state ? state.trim() : 'default';
          const cssContent = cssContentArray[1].trim();
          if (cssContent) {
            currentCss[key] = `  ${cssContent.split(';').filter(b => b)
              .map(d => `${d.trim()};`).join('\n  ').trim()}`;
          }
        });
      };
      const defaultClass = this.ownerDocument.head.querySelector(`#${this.dataId}`);
      if (defaultClass && defaultClass.tagName === 'STYLE') {
        const content = defaultClass.innerText;
        content.split(mobileTitle).forEach((item, i) => {
          setCssDataToDefault(item, css[i ? 'mobileCss' : 'css']);
        });
      }
    }
    return css;
  }

  getDefaultData = (style) => {
    const borderBool = style.borderStyle !== 'none' && style.borderColor !== '0px';
    return {
      state: {
        cursor: style.cursor,
      },
      font: {
        family: style.fontFamily,
        size: style.fontSize,
        weight: convertData(style.fontWeight),
        lineHeight: convertData(style.lineHeight),
        color: convertDefaultData(style.color),
        letterSpacing: convertData(style.letterSpacing),
        align: convertDefaultData(style.textAlign),
        decoration: convertData(style.textDecoration),
      },
      interface: {
        overflow: convertDefaultData(style.overflow),
        width: convertData(style.width),
        maxWidth: convertData(style.maxWidth),
        minWidth: convertData(style.minWidth),
        height: convertData(style.height),
        maxHeight: convertData(style.maxHeight),
        minHeight: convertData(style.minHeight),
        position: convertDefaultData(style.position),
        top: convertDefaultData(convertData(style.top)),
        right: convertDefaultData(convertData(style.right)),
        bottom: convertDefaultData(convertData(style.bottom)),
        left: convertDefaultData(convertData(style.left)),
      },
      background: {
        color: convertDefaultData(style.backgroundColor),
        image: convertData(style.backgroundImage),
        repeat: convertDefaultData(style.backgroundRepeat),
        position: convertDefaultData(style.backgroundPosition),
        size: convertDefaultData(style.backgroundSize),
        attachment: convertDefaultData(style.backgroundAttachment),
      },
      border: {
        style: convertBorderData(style.borderStyle, style.borderWidth),
        color: borderBool && convertBorderData(style.borderColor, style.borderWidth) || null,
        width: convertBorderData(style.borderWidth),
        radius: convertBorderData(style.borderRadius, null, true),
      },
      margin: {
        margin: convertBorderData(style.margin),
        padding: convertBorderData(style.padding),
      },
      shadow: {
        boxShadow: convertShadowData(style.boxShadow),
        textShadow: convertShadowData(style.textShadow),
      },
      transition: style.transition,
    };
  };

  getChildren = (props) => {
    const { value, css, mobileCss, cssName, classState } = this.state;
    const myCss = props.isMobile ? mobileCss : css;
    const stateValue = { cursor: value.state.cursor, classState };
    const classNameArray = this.defaultDomClass.split(' ');
    if (props.children) {
      this.select = {};
      return toArrayChildren(props.children).map(item => {
        const { ...itemProps } = item.props;
        const key = item.type.componentName;
        if (this.select[key]) {
          return console.warn(`child(${key}) component is repeat.`);
        }
        this.select[key] = true;
        itemProps.key = itemProps.key || key;
        if (key === 'EditorCss') {
          if (!this.props.useClassName) {
            return null;
          }
          itemProps.value = myCss[classState];
          itemProps.cssName = cssName;
          itemProps.onChange = this.onCssChange;
        } else if (key === 'EditorState') {
          itemProps.showClassState = this.props.useClassName;
          itemProps.value = stateValue;
          itemProps.onChange = this.onStateChange;
          itemProps.isMobile = this.props.isMobile;
        } else if (key === 'EditorClassName') {
          if (!this.props.useClassName) {
            return null;
          }
          itemProps.value = cssName;
          item.classNameArray = classNameArray;
        } else {
          itemProps.onChange = this.onChange;
          itemProps.value = value[key.toLocaleLowerCase().replace('editor', '')];
        }
        return cloneElement(item, itemProps);
      }).filter(c => c);
    }
    return [
      this.props.useClassName && (
        <ClassName
          onChange={this.onClassNameChange}
          value={cssName}
          classNameArray={classNameArray}
          key="EditorClassName"
        />
      ),
      <State
        onChange={this.onStateChange}
        key="EditorState"
        showClassState={this.props.useClassName}
        value={stateValue}
        isMobile={this.props.isMobile}
      />,
      <Font onChange={this.onChange} key="EditorFont" value={value.font} />,
      <Interface onChange={this.onChange} key="EditorInterface" value={value.interface} />,
      <BackGround onChange={this.onChange} key="EditorBackGround" value={value.background} />,
      <Border onChange={this.onChange} key="EditorBorder" value={value.border} />,
      <Margin onChange={this.onChange} key="EditorMargin" value={value.margin} />,
      <Shadow onChange={this.onChange} key="EditorShadow" value={value.shadow} />,
      <Transition onChange={this.onChange} key="EditorTransition" value={value.transition} />,
      this.props.useClassName && (
        <Css
          onChange={this.onCssChange}
          key="EditorCss"
          value={myCss[classState]}
          cssName={cssName}
        />
      ),
    ];
  }

  cssObjectToString = (css, cssName) => (
    Object.keys(css).sort((a, b) => (
      stateSort[a] > stateSort[b]
    )).map(key => {
      switch (key) {
        case 'default':
          return `${this.parentClassName} .${cssName} {\n${css[key]}\n}`;
        default:
          return `${this.parentClassName} .${cssName}:${key} {\n${css[key]}\n}`;
      }
    }).join('\n'))

  createStyle = () => {
    const style = this.ownerDocument.createElement('style');
    style.id = this.dataId;
    this.ownerDocument.head.appendChild(style);
    return style;
  }

  render() {
    const { ...props } = this.props;
    ['useClassName', 'editorElem', 'onChange'].map(key => delete props[key]);
    return (<Collapse bordered={false} {...props}>
      {this.getChildren(props)}
    </Collapse>);
  }
}
EditorList.State = State;
EditorList.Font = Font;
EditorList.BackGround = BackGround;
EditorList.Border = Border;
EditorList.Interface = Interface;
EditorList.Margin = Margin;
EditorList.Shadow = Shadow;
EditorList.Css = Css;
EditorList.Transition = Transition;
export default EditorList;
