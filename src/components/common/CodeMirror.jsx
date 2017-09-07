import React from 'react';
import codeMirror from 'codemirror';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function noop() {}

export default class RcCodeMirror extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
  };

  static defaultProps = {
    option: {},
    value: '',
    onChange: noop,
    onKeyDown: noop,
    onKeyUp: noop,
  };

  componentDidMount() {
    this.editor = codeMirror(this.ref);
    this.editor.on('change', (cm, metadata) => {
      if (this.props.onChange && !this.updated) {
        this.props.onChange(this.editor, metadata, this.editor.getValue());
      }
    });
    if (this.props.onKeyUp) {
      this.editor.on('keyup', (cm, event) => {
        this.props.onKeyUp(this.editor, event);
      });
    }
    this.editor.on('keydown', (cm, event) => {
      this.updated = false;
      this.props.onKeyDown(this.editor, event);
    });
    Object.keys(this.props.options).forEach(key => {
      this.editor.setOption(key, this.props.options[key]);
    });
    this.editor.setValue(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.editor.getValue()) {
      this.updated = true;
      this.editor.setValue(nextProps.value);
    }
  }

  render() {
    const className = classnames({
      'react-codemirror': true,
      [this.props.className]: !!this.props.className,
    });
    return (
      <div className={className} ref={(self) => this.ref = self} />
    );
  }
}
