import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/css/css.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/css-hint.js';

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

  constructor(props) {
    super(props);
    console.log(333)
    this.state = {
      key: 'width',
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.value, this.props.value)
    if(nextProps.value!==this.props.value){
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onChange = (e) => {
  }

  setRef = (c) => {
    c.codeMirror.on("keyup", (cm, event) => {
      if (!cm.state.completionActive &&
        (event.key.match(/[a-z]/ig) &&
        event.key.length === 1 ||
        event.keyCode === 32)
      ) {
        c.codeMirror.showHint();
      }
    });
  }

  render() {
    const { ...props } = this.props;
    const { value } = this.state;
    console.log(value);
    ['defaultData', 'onChange'].map(key => delete props[key]);
    return (<Panel {...props}>
      <CodeMirror
        value={this.state.value}
        ref={this.setRef}
        options={{
          mode: { name: "css", globalVars: true },
          theme: 'ambiance',
        }}
        onChange={this.onChange}
      />
    </Panel>);
  }
}

EditorCss.componentName = 'EditorCss';