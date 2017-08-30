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
import {
  toArrayChildren,
  getComputedStyle,
  convertData,
  convertDefaultData,
  convertBorderData,
  convertShadowData,
  toCss
} from './utils';

class EditorList extends Component {
  static propsTypes = {
    className: PropTypes.string,
    defaultActiveKey: PropTypes.any,
    select: PropTypes.array,
    editorElem: PropTypes.any,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: 'editor-list',
    defaultActiveKey: ['EditorFont'],
  };

  select = {};

  constructor(props) {
    super(props);
    const style = getComputedStyle(props.editorElem);
    const value = this.getDefaultData(style);
    this.state = {
      value,
    }
  }

  getDefaultData = (style) => {
    return {
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
        color: convertBorderData(style.borderColor, style.borderWidth),
        width: convertBorderData(style.borderWidth),
        radius: convertBorderData(style.borderRadius),
      },
      margin: {
        margin: convertBorderData(style.margin),
        padding: convertBorderData(style.padding)
      },
      shadow: {
        boxShadow: convertShadowData(style.boxShadow),
        textShadow: convertShadowData(style.textShadow)
      }
    }
  }

  getChildren = (props) => {
    const { value } = this.state;
    console.log(value)
    if (props.children) {
      return toArrayChildren(props.children).map(item => {
        const { ...itemProps } = item.props;
        const key = item.type.componentName;
        if (this.select[key]) {
          return console.warn(`child(${key}) component is repeat.`);
        }
        this.select[key] = true;
        itemProps.onChange = this.onChange;
        itemProps.key = itemProps.key || key;
        return cloneElement(item, itemProps);
      });
    }
    return [
      <Font onChange={this.onChange} key="EditorFont" value={value.font} />,
      <Interface onChange={this.onChange} key="EditorInterface" value={value.interface} />,
      <BackGround onChange={this.onChange} key="EditorBackGround" value={value.background} />,
      <Border onChange={this.onChange} key="EditorBorder" value={value.border} />,
      <Margin onChange={this.onChange} key="EditorMargin" value={value.margin} />,
      <Shadow onChange={this.onChange} key="EditorShadow" value={value.shadow} />,
      <Css onChange={this.onChange} key="EditorCss" value={toCss(value)}/>,
    ];
  }
  onChange = (key, data) => {
    this.setState({
      value: {
        ...this.state.value,
        [key]: data,
      },
    })
  };

  render() {
    const { ...props } = this.props;
    ['select'].map(key => delete props[key]);
    return (<Collapse bordered={false} {...props}>
      {this.getChildren(props)}
    </Collapse>)
  }
}

EditorList.Font = Font;
EditorList.BackGround = BackGround;
EditorList.Border = Border;
EditorList.Interface = Interface;
EditorList.Margin = Margin;
EditorList.Shadow = Shadow;
EditorList.Css = Css;
export default EditorList;
