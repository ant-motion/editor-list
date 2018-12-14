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
import Locale from './locale/zh_CN';
import {
  styleInUse,
  toArrayChildren,
  convertData,
  convertDefaultData,
  convertBorderData,
  convertShadowData,
  toCss,
  getRandomKey,
  removeMultiEmpty,
  removeEditClassName,
  getDomCssRule,
  getClassNameCssRule,
  getParentClassName,
  mobileTitle,
} from './utils';

const stateSort = { default: 0, hover: 1, focus: 2, active: 3 };

class EditorList extends Component {
  static propTypes = {
    className: PropTypes.string,
    defaultActiveKey: PropTypes.any,
    editorElem: PropTypes.any,
    onChange: PropTypes.func,
    useClassName: PropTypes.bool,
    isMobile: PropTypes.bool,
    parentClassNameCanUseTagName: PropTypes.bool,
    parentClassNameLength: PropTypes.number,
    editorDefaultClassName: PropTypes.string,
    cssToDom: PropTypes.bool,
    locale: PropTypes.object,
  };

  static defaultProps = {
    className: 'editor-list',
    defaultActiveKey: ['EditorClassName'],
    useClassName: true,
    onChange: () => {
    },
    isMobile: false,
    parentClassNameCanUseTagName: true,
    parentClassNameLength: 2,
    editorDefaultClassName: 'editor_css',
    cssToDom: true,
    locale: Locale,
  };

  constructor(props) {
    super(props);
    this.select = {};
    this.defaultValue = {};
    this.defaultData = {};
    this.currentData = {};
    this.cssString = '';
    this.state = this.setDefaultState(props.editorElem, props);
    this.setEditorElemClassName();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editorElem !== nextProps.editorElem) {
      this.defaultValue = {};
      this.defaultData = {};
      this.editClassName = this.getClassName(nextProps);
      this.setState(this.setDefaultState(nextProps.editorElem, nextProps), () => {
        this.setEditorElemClassName(nextProps);
      });
    }
    if (this.props.isMobile !== nextProps.isMobile) {
      const { classState, cssValue, cssName } = this.state;
      const domStyle = this.getDefaultValue(nextProps.editorElem,
        nextProps.isMobile, this.state.classState);
      this.defaultValue[classState] = domStyle;
      const value = this.getDefaultData(domStyle);
      this.defaultData = value;
      this.setState({
        cssValue: {
          ...cssValue,
          [cssName]: {
            ...cssValue[cssName],
            value,
          },
        },
        classState,
        cssName,
      });
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
    const { onChange, isMobile, editorElem, editorDefaultClassName } = this.props;
    this.defaultValue[classState] = this.defaultValue[classState] ||
      this.getDefaultValue(editorElem, isMobile, classState);
    this.currentData[classState] = this.currentData[classState] ||
      this.getDefaultData(this.defaultValue[classState]);
    const value = this.currentData[classState];

    this.defaultData = this.getDefaultData(this.defaultValue[classState]);

    const { cssName, cssValue } = this.state;

    this.setState({
      cssValue: {
        ...cssValue,
        [cssName]: {
          ...cssValue[cssName],
          value,
        },
      },
      classState,
    });
    onChange({
      parentClassName: this.parentClassName,
      cssValue,
      cssName: `${this.editClassName}-${editorDefaultClassName}`,
      cssString: this.cssString,
    });
  }

  onClassNameChange = (cssName) => {
    const { cssValue } = this.state;
    const { editorElem, isMobile, editorDefaultClassName } = this.props;
    const dom = editorElem;
    const className = dom.className;
    const classState = 'default';
    const inDomStyle = cssName !== this.editClassName ? false : className.split(' ')
      .some(c => c === `${cssName}-${editorDefaultClassName}`);
    const domStyle = getClassNameCssRule(
      { dom: editorElem, className: cssName, isMobile, state: null, getObject: true }
    );
    const value = this.getDefaultData(domStyle);
    if (!cssValue[cssName]) {
      const state = {
        cssName,
        classState,
      };
      const newCssValue = this.getStateCSSValue(cssName, className, inDomStyle,
        classState, domStyle, value);
      this.setState({
        ...state,
        cssValue: {
          ...cssValue,
          ...newCssValue,
        },
      });
    } else {
      this.setDefaultData({
        inDomStyle, isMobile, className, dom, classState, value, domStyle,
      });
    }
    this.setState({
      cssName,
      classState: 'default',
    });
  }

  onCssChange = ($cssValue) => {
    const { editorElem, isMobile } = this.props;
    const { cssValue, cssName, classState } = this.state;
    const { css, mobileCss } = cssValue[cssName];
    const myCss = isMobile ? mobileCss : css;

    this.setState({
      cssValue: {
        ...cssValue,
        [cssName]: {
          ...cssValue[cssName],
          [isMobile ? 'mobileCss' : 'css']: {
            ...myCss,
            [classState]: $cssValue,
          },
        },
      },
    }, () => {
      this.setCssToDom();
      // 关联编辑器里的参性, 后期忧化;
      const domStyle = this.getDefaultValue(editorElem, isMobile, classState);
      const value = this.getDefaultData(domStyle);
      this.currentData[classState] = value;
      this.setState({
        cssValue: {
          ...cssValue,
          [cssName]: {
            ...cssValue[cssName],
            value,
          },
        },
      });
    });
  }

  onChange = (key, data) => {
    const { cssValue, classState, cssName } = this.state;
    const { value, css, mobileCss } = cssValue[cssName];
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
      let stateCssArray = stateCss.split('\n').map(c => c.trim()).filter(c => c);
      const currentCssName = currentCss.map(str => str.split(':')[0].trim());
      const borderArray = currentCssName.filter(c => c === 'border-style' ||
        c === 'border-color' || c === 'border-width');
      borderArray.forEach(c => {
        const reg = new RegExp(`border(.*)${c.split('-')[1]}.*`);
        stateCssArray = stateCssArray.filter(d => !d.match(reg));
      });
      const stateNewCss = stateCssArray.map(str => {
        const $cssName = str.split(':')[0].trim();
        return currentCssName.indexOf($cssName) >= 0 || styleInUse[$cssName] ? null : str;
      }).filter(c => c);
      newCss = `  ${`${stateNewCss.join('\n  ')}\n  ${currentCss.join('\n  ')}`.trim()}`;
    }
    this.currentData[classState] = v;
    const state = {
      ...cssValue[cssName],
      value: v,
      [this.props.isMobile ? 'mobileCss' : 'css']: {
        ...myCss,
        [classState]: newCss,
      },
    };
    this.setState({
      cssValue: {
        ...cssValue,
        [cssName]: state,
      },
    }, this.setCssToDom);
  };

  getStateCSSValue = (
    cssName, className, inDomStyle, classState, domStyle, value, props = this.props
  ) => {
    const dom = props.editorElem;
    const { editorDefaultClassName, isMobile } = props;
    this.setDefaultData({
      inDomStyle, isMobile, className, dom, classState, value, domStyle,
    });
    const css = this.getDefaultCssData(dom, inDomStyle, cssName === this.editClassName ?
      `${cssName}-${editorDefaultClassName}` : cssName);
    this.currentData = {};
    if (this.props.useClassName) {
      this.currentData[classState] = this.getDefaultData(domStyle);
    } else {
      this.currentData.default = value;
    }
    return {
      [cssName]: {
        value,
        css: css.css,
        mobileCss: css.mobileCss,
        cssName,
        classState,
      },
    };
  }

  getDefaultValue = (dom, isMobile, state) => {
    let domStyle = {};
    if (this.props.useClassName) {
      if (state !== 'default') {
        domStyle = { ...this.defaultValue.default, ...getDomCssRule({ dom, isMobile, state }) };
      } else {
        domStyle = getDomCssRule({ dom, isMobile });
      }
    } else {
      domStyle = getDomCssRule({ dom, isMobile });
    }
    return domStyle;
  }

  setDefaultData = ({ inDomStyle, isMobile, className, dom, classState, domStyle, value }) => {
    if (inDomStyle) {
      dom.className = this.defaultDomClass;
      this.defaultValue[classState] = this.getDefaultValue(dom, isMobile, classState);
      this.defaultData = this.getDefaultData(this.defaultValue[classState]);
      dom.className = className;
    } else {
      this.defaultValue[classState] = domStyle;
      this.defaultData = value;
    }
  }

  setCssToDom = () => {
    const { cssName, cssValue } = this.state;
    const { css } = cssValue[cssName];
    const { editorElem, onChange, cssToDom, editorDefaultClassName } = this.props;
    if (cssToDom) {
      if (cssName) {
        this.setStyleToDom();
      } else {
        editorElem.style.cssText = css.default;
      }
    }
    onChange({
      parentClassName: this.parentClassName,
      cssValue,
      cssName: `${this.editClassName}-${editorDefaultClassName}`,
      cssString: this.cssString,
    });
  }

  setStyleToDom = () => {
    const { cssValue, cssName } = this.state;
    let cssStr = '';
    const cssValueArray = Object.keys(cssValue).sort((a, b) => b === cssName ? -1 : 0);
    cssValueArray.forEach(key => {
      const $cssValue = cssValue[key];
      cssStr += this.cssObjectToString($cssValue.css, key);
      cssStr += '\n';
    });
    cssStr += `\n${mobileTitle}\n`;
    cssValueArray.forEach(key => {
      const $cssValue = cssValue[key];
      cssStr += this.cssObjectToString($cssValue.mobileCss, key);
      cssStr += '\n';
    });
    cssStr += '\n}';
    this.cssString = cssStr;
    // 如果是自定义样式或生成的样式插入到 body
    // const noDefault = !this.classNameInDefaultDomClass(cssName, editorDefaultClassName);
    let style = this.ownerDocument.querySelector(`#${this.dataId}`);
    // 通用插入到 head;
    if (style) {
      style.remove();
    }
    style = this.createStyle();
    style.innerHTML = cssStr;
  }

  setEditorElemClassName = (props = this.props) => {
    const { editorElem, editorDefaultClassName } = props;
    const { cssName } = this.state;

    if (!this.classNameInDefaultDomClass(cssName, editorDefaultClassName)) {
      editorElem.className = removeMultiEmpty(`${this.defaultDomClass} ${
        cssName}-${editorDefaultClassName}`).trim();
    }
  }

  setDefaultState = (dom, props) => {
    const { editorDefaultClassName, isMobile } = props;
    this.ownerDocument = dom.ownerDocument;
    this.editClassName = this.getClassName(props);
    const classState = 'default';
    const domStyle = this.getDefaultValue(dom, isMobile, classState);
    const value = this.getDefaultData(domStyle);
    const className = dom.className;
    this.defaultDomClass = dom.className ?
      removeEditClassName(dom.className, editorDefaultClassName) : '';
    const cssName = this.getClassName(props);
    const inDomStyle = className.split(' ')
      .some(c => c === `${cssName}-${editorDefaultClassName}`);
    const cssValue = this.getStateCSSValue(cssName, className,
      inDomStyle, classState, domStyle, value, props);
    return {
      cssValue,
      cssName,
      classState,
    };
  }

  getClassName = (props) => {
    const {
      editorElem,
      parentClassNameCanUseTagName,
      parentClassNameLength,
      editorDefaultClassName,
    } = props;
    const currentEditorCssName = (editorElem.className || '').split(' ')
      .filter(name => name.indexOf(editorDefaultClassName) >= 0)
      .map(name => name.replace(`-${editorDefaultClassName}`, ''))[0];
    const random = currentEditorCssName ||
      editorElem.getAttribute('data-editor_css_rand') || getRandomKey();
    this.dataId = `${editorDefaultClassName}-${random}`;
    editorElem.setAttribute('data-editor_css_rand', random);
    this.parentClassName = getParentClassName(editorElem,
      parentClassNameCanUseTagName, parentClassNameLength);
    return this.props.useClassName ? random : '';
  };
  getDefaultCssData = (dom, inDomStyle, className) => {
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
    if (this.props.useClassName && inDomStyle) {
      // 样式叠加型式。
      Object.keys(css).forEach(name => {
        Object.keys(css[name]).forEach(key => {
          css[name][key] = getClassNameCssRule(
            {
              dom,
              className,
              isMobile: name === 'mobileCss',
              onlyMobile: name === 'mobileCss',
              state: key !== 'default' && key,
            }
          );
        });
      });
    }
    return css;
  }

  getDefaultData = (style) => {
    if (!style) {
      return null;
    }
    const borderBool = style.borderStyle !== 'none' && style.borderColor !== '0px'
      || style.borderTopStyle !== 'none' && style.borderTopColor !== '0px'
      || style.borderRightStyle !== 'none' && style.borderRightColor !== '0px'
      || style.borderBottomStyle !== 'none' && style.borderBottomColor !== '0px'
      || style.borderLeftStyle !== 'none' && style.borderLeftColor !== '0px';
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
        decoration: convertData(style.textDecoration || style.textDecorationLine),
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
        top: convertDefaultData(convertData(style.top, true)),
        right: convertDefaultData(convertData(style.right, true)),
        bottom: convertDefaultData(convertData(style.bottom, true)),
        left: convertDefaultData(convertData(style.left, true)),
      },
      background: {
        color: convertDefaultData(style.backgroundColor),
        image: (convertData(style.backgroundImage) || '').replace(/^url\(|"|\)?/ig, ''), 
        repeat: convertDefaultData(style.backgroundRepeat),
        position: convertDefaultData(style.backgroundPosition),
        size: convertDefaultData(style.backgroundSize),
        attachment: convertDefaultData(style.backgroundAttachment),
      },
      border: {
        style: convertBorderData(style.borderStyle || (
          style.borderTopStyle ||
            style.borderRightStyle ||
            style.borderBottomStyle ||
            style.borderLeftStyle ?
            {
              top: style.borderTopStyle,
              right: style.borderRightStyle,
              bottom: style.borderBottomStyle,
              left: style.borderLeftStyle,
            } : null
        ), style.borderWidth) || 'none',
        color: borderBool && convertBorderData(style.borderColor || (
          style.borderTopColor ||
            style.borderRightColor ||
            style.borderBottomColor ||
            style.borderLeftColor ?
            {
              top: style.borderTopColor,
              right: style.borderRightColor,
              bottom: style.borderBottomColor,
              left: style.borderLeftColor,
            } : null
        ), style.borderWidth) || null,
        width: convertBorderData(style.borderWidth || (
          style.borderTopWidth ||
            style.borderRightWidth ||
            style.borderBottomWidth ||
            style.borderLeftWidth ?
            {
              top: style.borderTopWidth,
              right: style.borderRightWidth,
              bottom: style.borderBottomWidth,
              left: style.borderLeftWidth,
            } : null
        )),
        radius: convertBorderData(style.borderRadius || (
          style.borderTopLeftRadius ||
            style.borderTopRightRadius ||
            style.borderBottomRightRadius ||
            style.borderBottomLeftRadius ?
            {
              'top-left': style.borderTopLeftRadius,
              'top-right': style.borderTopRightRadius,
              'bottom-right': style.borderBottomRightRadius,
              'bottom-left': style.borderBottomLeftRadius,
            } : null
        ), null, true),
      },
      margin: {
        margin: convertBorderData(style.margin || {
          top: style.marginTop,
          right: style.marginRight,
          bottom: style.marginBottom,
          left: style.marginLeft,
        }),
        padding: convertBorderData(style.padding || {
          top: style.paddingTop,
          right: style.paddingRight,
          bottom: style.paddingBottom,
          left: style.paddingLeft,
        }),
      },
      shadow: {
        boxShadow: convertShadowData(style.boxShadow),
        textShadow: convertShadowData(style.textShadow),
      },
      transition: style.transition,
    };
  };

  getChildren = (props) => {
    const { cssValue, cssName, classState } = this.state;
    const { css, mobileCss, value } = cssValue[cssName];
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
          itemProps.editClassName = this.editClassName;
          itemProps.placeholder = this.props.editorDefaultClassName;
          item.classNameArray = classNameArray;
        } else {
          itemProps.onChange = this.onChange;
          itemProps.value = value[key.toLocaleLowerCase().replace('editor', '')];
        }
        itemProps.locale = Locale[key];
        return cloneElement(item, itemProps);
      }).filter(c => c);
    }
    return [
      this.props.useClassName && (
        <ClassName
          onChange={this.onClassNameChange}
          value={cssName}
          classNameArray={classNameArray}
          placeholder={this.props.editorDefaultClassName}
          key="EditorClassName"
          locale={Locale.EditorClassName}
          editClassName={this.editClassName}
        />
      ),
      <State
        onChange={this.onStateChange}
        key="EditorState"
        locale={Locale.EditorState}
        showClassState={this.props.useClassName}
        value={stateValue}
        isMobile={this.props.isMobile}
      />,
      <Font
        onChange={this.onChange}
        key="EditorFont"
        value={value.font}
        locale={Locale.EditorFont}
      />,
      <Interface
        onChange={this.onChange}
        key="EditorInterface"
        value={value.interface}
        locale={Locale.EditorInterface}
      />,
      <BackGround
        onChange={this.onChange}
        key="EditorBackGround"
        value={value.background}
        locale={Locale.EditorBackGround}
      />,
      <Border
        onChange={this.onChange}
        key="EditorBorder"
        value={value.border}
        locale={Locale.EditorBorder}
      />,
      <Margin
        onChange={this.onChange}
        key="EditorMargin"
        value={value.margin}
        locale={Locale.EditorMargin}
      />,
      <Shadow
        onChange={this.onChange}
        key="EditorShadow"
        value={value.shadow}
        locale={Locale.EditorShadow}
      />,
      <Transition
        onChange={this.onChange}
        key="EditorTransition"
        value={value.transition}
        locale={Locale.EditorTransition}
      />,
      <Css
        onChange={this.onCssChange}
        key="EditorCss"
        value={myCss[classState]}
        cssName={cssName}
        locale={Locale.EditorCss}
      />,
    ];
  }

  cssObjectToString = (css, name) => {
    const cssName = !this.classNameInDefaultDomClass(name, this.props.editorDefaultClassName)
      ? `${name}-${this.props.editorDefaultClassName}` : name;
    return Object.keys(css).sort((a, b) => (
      stateSort[a] > stateSort[b]
    )).map(key => {
      switch (key) {
        case 'default':
          return `${this.parentClassName} .${cssName} {\n${css[key]}\n}`;
        default:
          return `${this.parentClassName} .${cssName}:${key} {\n${css[key]}\n}`;
      }
    }).join('\n');
  }

  createStyle = () => {
    const style = this.ownerDocument.createElement('style');
    style.id = this.dataId;
    // this.ownerDocument[n ? 'body' : 'head'].appendChild(style);
    this.ownerDocument.body.appendChild(style);
    return style;
  }

  classNameInDefaultDomClass = (name, editorDefaultClass) => (
    this.defaultDomClass.split(' ')
      .some(key => key === name || key === `${name}-${editorDefaultClass}`)
  )

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
