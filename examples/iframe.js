import React from 'react';
import ReactDOM from 'react-dom';

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
      <div/>
    </div>)
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
