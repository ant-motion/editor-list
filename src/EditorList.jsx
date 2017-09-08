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
} from './utils';

const stateSort = { hover: 0, focus: 1, active: 2 };

class EditorList extends Component {
  static propTypes = {
    className: PropTypes.string,
    defaultActiveKey: PropTypes.any,
    editorElem: PropTypes.any,
    onChange: PropTypes.func,
    useClassName: PropTypes.bool,
  };

  static defaultProps = {
    className: 'editor-list',
    defaultActiveKey: ['EditorState'],
    useClassName: true,
    onChange: () => {
    },
  };

  constructor(props) {
    super(props);
    this.select = {};
    this.state = this.setDefaultState(props.editorElem);
    this.setEditorElemClassName();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editorElem !== nextProps.editorElem) {
      this.setState(this.setDefaultState(nextProps.editorElem));
    }
  }

  onStateChange = (key, data) => {
    if (key === 'cursor') {
      const value = {
        cursor: data,
      };
      this.onChange('state', value);
    } else {
      this.setState({
        classState: data,
      }, this.changeCss);
    }
  }

  onCssChange = (cssValue, cssNameValue) => {
    const dom = this.props.editorElem;
    const { css, cssName, classState } = this.state;
    if (cssNameValue !== cssName) {
      const styleDom = this.ownerDocument.querySelector(`#${cssName}`);
      if (styleDom) {
        styleDom.remove();
      }
      Object.keys(css).forEach(key => {
        css[key] = css[key].replace(cssName, cssNameValue);
      });
      dom.className = dom.className.replace(cssName, '');
    }
    this.setState({
      css: {
        ...css,
        [classState]: cssValue,
      },
      cssName: cssNameValue,
    }, (cssValue !== css[classState] || cssNameValue !== cssName) && this.changeCss);
  }

  onChange = (key, data) => {
    const { value, classState, cssName, css } = this.state;
    const v = {
      ...value,
      [key]: data,
    };
    const state = {
      value: v,
      css: {
        ...css,
        [classState]: `.${cssName}${classState === 'default'
          ? '' : `:${classState}`} {\n  ${toCss(v, this.defaultData).replace(/\n/g, '\n  ')}\n}`,
      },
    };
    this.setState(state, this.setCssToDom);
    this.props.onChange(state);
  };

  setCssToDom = () => {
    const { css, cssName } = this.state;
    const { editorElem } = this.props;
    if (cssName) {
      this.setClassNameToDom();
      this.setEditorElemClassName();
    } else {
      editorElem.style.cssText = css;
    }
  }

  setClassNameToDom = () => {
    const { css } = this.state;
    const cssStr = Object.keys(css).sort((a, b) => (
      stateSort[a] > stateSort[b]
    )).map(key => {
      return css[key].replace(/;/g, ' !important;');
    }).join('\n');
    const style = this.ownerDocument.querySelector(`#${this.state.cssName}`) || this.createStyle();
    style.innerHTML = cssStr;
  }

  setEditorElemClassName = () => {
    const dom = this.props.editorElem;
    const domClassName = dom.className.replace(this.state.cssName, '');
    dom.className = removeMultiEmpty(`${domClassName ?
      `${domClassName} ` : ''}${this.state.cssName}`);
  }

  setDefaultState = (dom) => {
    this.ownerDocument = dom.ownerDocument;
    this.domStyle = getDomCssRule(dom);
    const value = this.getDefaultData(this.domStyle);
    this.defaultData = value;
    const cssName = this.getClassName();
    return {
      value,
      css: {
        default: `.${cssName} {\n\n}`,
        hover: `.${cssName}:hover {\n\n}`,
        active: `.${cssName}:active {\n\n}`,
        focus: `.${cssName}:focus {\n\n}`,
      },
      cssName,
      classState: 'default',
    };
  }

  getClassName = () => {
    const classNameArray = this.props.editorElem.className &&
      this.props.editorElem.className.split(' ');
    const lastClassName = classNameArray[classNameArray.length - 1];
    const lastStyle = this.ownerDocument.querySelector(`#${lastClassName}`);
    const editorClassName = lastStyle && lastStyle.tagName === 'STYLE' ? lastClassName :
      (classNameArray.filter(css => (css.indexOf('editor_css') > 0))[0] ||
      `editor_css-${getRandomKey()}`);
    return this.props.useClassName ? editorClassName : '';
  };

  getDefaultData = (style) => {
    const borderBool = style.borderStyle !== 'none' && style.borderColor !== '0px';
    return {
      state: {
        cursor: style.cursor === 'pointer',
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
    const { value, css, cssName, classState } = this.state;
    const stateValue = { cursor: value.state.cursor, classState };
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
          itemProps.value = css;
          itemProps.cssName = cssName;
          itemProps.onChange = this.onCssChange;
        } else if (key === 'EditorState') {
          itemProps.showClassState = false;
          itemProps.value = stateValue;
          itemProps.onChange = this.onStateChange;
        } else {
          itemProps.onChange = this.onChange;
          itemProps.value = value[key.toLocaleLowerCase().replace('editor', '')];
        }
        return cloneElement(item, itemProps);
      });
    }
    return [
      <State onChange={this.onStateChange}
        key="EditorState"
        showClassState={this.props.useClassName}
        value={stateValue}
      />,
      <Font onChange={this.onChange} key="EditorFont" value={value.font} />,
      <Interface onChange={this.onChange} key="EditorInterface" value={value.interface} />,
      <BackGround onChange={this.onChange} key="EditorBackGround" value={value.background} />,
      <Border onChange={this.onChange} key="EditorBorder" value={value.border} />,
      <Margin onChange={this.onChange} key="EditorMargin" value={value.margin} />,
      <Shadow onChange={this.onChange} key="EditorShadow" value={value.shadow} />,
      <Transition onChange={this.onChange} key="EditorTransition" value={value.transition} />,
      <Css onChange={this.onCssChange} key="EditorCss" value={css[classState]} cssName={cssName} />,
    ];
  }

  createStyle = () => {
    const style = this.ownerDocument.createElement('style');
    style.id = this.state.cssName;
    this.ownerDocument.head.appendChild(style);
    return style;
  }

  changeCss = () => {
    const dom = this.props.editorElem;
    this.setCssToDom();
    this.domStyle = getDomCssRule(dom, this.state.classState === 'default' ?
      null : this.state.classState);
    const value = this.getDefaultData(this.domStyle);
    this.setState({
      value,
    });
    this.props.onChange({ value, css: this.state.css });
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
