import React from 'react';
import ReactDOM from 'react-dom';
import EditorList from 'rc-editor-list';
import 'rc-editor-list/assets/index.less';
import './less/index.less';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorDom: null,
    };
  }

  onClick = (e) => {
    const dom = e.target;
    this.setState({
      editorDom: dom,
    });
  }

  render() {
    return (<div>
      <div onClick={this.onClick} className="a c editor-user-css">
        测试测试测试测试测试测试测试<br />
        ---------请点击---------
      </div>

      {this.state.editorDom && (
        <EditorList
          style={{ width: 230, margin: 50, position: 'absolute', top: 0, right: 0, zIndex: 1 }}
          editorElem={this.state.editorDom}
        />)}
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
