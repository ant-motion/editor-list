import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import 'codemirror/mode/css/css.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import CodeMirror from './common/CodeMirror';

const Panel = Collapse.Panel;

export default class EditorCss extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    cssName: PropTypes.string,
    header: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    onChange: () => {
    },
  };

  onChange = (value) => {
    this.props.onChange(value.replace(/{\n|\n}|{|}/g, ''));
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
    const { value, locale } = props;
    ['defaultData', 'onChange'].map(key => delete props[key]);
    const newValue = `{\n${value}\n}`;
    return (<Panel {...props} header={props.header || locale.header}>
      <CodeMirror
        value={newValue}
        options={{
          mode: { name: 'css', globalVars: true },
          theme: 'ambiance',
        }}
        onKeyUp={this.onKeyUp}
        onBlur={(_, __, v) => {
          if (v.replace(/\s+/g, '') !== newValue.replace(/\s+/g, '')) {
            this.onChange(v);
          }
        }}
      />
    </Panel>);
  }
}

EditorCss.componentName = 'EditorCss';
