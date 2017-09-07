import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import 'codemirror/mode/css/css.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import CodeMirror from './common/CodeMirror';

const Panel = Collapse.Panel;

export default class EditorCss extends Component {
  static propsTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    header: PropTypes.string,
  };

  static defaultProps = {
    header: '样式编辑',
    value: '',
  };

  onChange = (value, cssName) => {
    const reg = /^\.(.*)\{/;
    const currentValue = cssName !== this.props.cssName ?
      value.replace(reg, `.${cssName}{`) : value;
    const cssNameMatch = value.match(reg);
    const currentCssName = cssNameMatch && (cssNameMatch[1].split(':')[0].trim());
    this.props.onChange && this.props.onChange(currentValue, cssName !== this.props.cssName ? cssName : currentCssName);
  };

  onKeyUp = (cm, event) => {
    if (!cm.state.completionActive &&
      (event.key.match(/[a-z]/ig) &&
      event.key.length === 1 ||
      event.keyCode === 32)
    ) {
      cm.showHint();
    }
  };

  render() {
    const { ...props } = this.props;
    const { cssName, value } = props;
    ['defaultData', 'onChange'].map(key => delete props[key]);
    return (<Panel {...props}>
      <Row gutter={8}>
        <Col span={8}>自定义名称</Col>
        <Col span={13}>
          <Input size="small" value={cssName} onChange={(e) => {
            const css = e.target.value;
            this.onChange(value, css);
          }} placeholder="editor-css" />
        </Col>
        <Col span={3}>
          <Tooltip
            placement="topRight"
            arrowPointAtCenter
            title={<span>样式会自动加 !important; 请不要手动增加; <br/>样式名称请不要随意更改，尽量保持唯一样式名。</span>}
          >
            <Icon type="question-circle" />
          </Tooltip>
        </Col>
      </Row>
      <CodeMirror
        value={value}
        options={{
          mode: { name: "css", globalVars: true },
          theme: 'ambiance',
        }}
        onKeyUp={this.onKeyUp}
        onChange={(e, metadata, v) => {
          this.onChange(v, this.props.cssName);
        }}
      />
    </Panel>);
  }
}

EditorCss.componentName = 'EditorCss';