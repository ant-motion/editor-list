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
      state: 'web',
    };
  }

  onClick = (e) => {
    const dom = e.target;
    this.setState({
      editorDom: dom,
    });
  }

  onChange = (e) => {
    console.log(e);
  }

  onSwicth = () => {
    this.setState({
      state: this.state.state === 'web' ? 'mobile' : 'web',
      editorDom: null,
    });
  }
  closeEdit = () => {
    this.setState({
      editorDom: null,
    });
  }

  render() {
    return (<div className="box">
      <div onClick={this.onClick} className="a c editor-user-css jeply9mvwlk-editor_css">
        测试测试测试测试测试测试测试<br />
        ---------请点击---------
      </div>
      <div onClick={this.onClick} className="a c" style={{ background: '#0000ff' }}>
        bbbbbbbbbbbbbbbbbbbbbb<br />
        ---------请点击---------
      </div>
      <button onClick={this.closeEdit}>关闭</button>
      <button onClick={this.onSwicth}>切换模式：{this.state.state}</button>

      {this.state.editorDom && (
        <EditorList
          style={{ width: 280, margin: 50, position: 'absolute', top: 0, right: 0, zIndex: 1 }}
          editorElem={this.state.editorDom}
          onChange={this.onChange}
          isMobile={this.state.state === 'mobile'}
        />)}
      <style
        dangerouslySetInnerHTML={
          {
            __html: `.jeply9mvwlk-editor_css{
              text-decoration: underline;
            }
        .jeply9mvwlk-editor_css:focus{
          font-size: 64px;
        }
        @media screen and (max-width: 767px) {
          .jeply9mvwlk-editor_css{
            color: #00ff00;
          }
        }
        `,
          }
        }
      />
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
