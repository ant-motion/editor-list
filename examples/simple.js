import React from 'react';
import ReactDOM from 'react-dom';
import EditorList from 'rc-editor-list';
import 'rc-editor-list/assets/index.less';

import CodeMirror from 'react-codemirror';
import 'codemirror/mode/css/css.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/css-hint.js';

function getStyle() {
  return {
    top: 100,
    left: 400,
    width: 200,
    height: 200,
    border: '1px solid #fff000',
    borderRadius: '4px 2px 5px',
    cursor: 'pointer',
    margin: '10px 20px 10px 20px',
    padding: '20px 10px',
    boxShadow: '1px 2px 5px 10px #000 inset',
    textShadow: '2px 3px 4px #000'
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorDom: null,
      value: 'sdfdsfsdfsdfsdf',
    };
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        value: '11111'
      })
    }, 1000)
  }

  onClick = (e) => {
    const dom = e.target;
    this.setState({
      editorDom: dom,
    });
  }

  render() {
    return (<div style={{ position: 'relative', minHeight: 400 }}>
      <div style={getStyle()} onClick={this.onClick}>
        测试测试测试测试测试测试测试<br />
        ---------请点击---------
      </div>
      {this.state.editorDom && (
        <EditorList
          style={{ width: 230, margin: 50 }}
          editorElem={this.state.editorDom}
        />)}
        一秒后变值：
      <CodeMirror
        value={this.state.value}
        options={{
          mode: { name: "css", globalVars: true },
          theme: 'ambiance',
        }}
      />
    </div>)
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
