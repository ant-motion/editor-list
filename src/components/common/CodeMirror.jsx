import React from 'react';
import codeMirror from 'codemirror';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';

function noop() { }

class RcCodeMirror extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    options: {},
    value: '',
    onChange: noop,
    onKeyDown: noop,
    onKeyUp: noop,
  };

  static getDerivedStateFromProps(props, { prevProps, $self }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props.value && props.value !== $self.editor.getValue()) {
      $self.updated = true;
      $self.editor.setValue(props.value);
    }
    return nextState;
  }

  constructor(props) {
    super(props);
    this.state = {
      $self: this,
    };
  }

  componentDidMount() {
    this.editor = codeMirror(this.ref);
    this.editor.on('change', (_, metadata) => {
      if (this.props.onChange && !this.updated) {
        this.props.onChange(this.editor, metadata, this.editor.getValue());
      }
    });
    this.editor.on('blur', (_, metadata) => {
      if (this.props.onBlur) {
        this.props.onBlur(this.editor, metadata, this.editor.getValue());
      }
    });
    if (this.props.onKeyUp) {
      this.editor.on('keyup', (_, event) => {
        this.props.onKeyUp(this.editor, event);
      });
    }
    this.editor.on('keydown', (_, event) => {
      this.updated = false;
      this.props.onKeyDown(this.editor, event);
    });
    Object.keys(this.props.options).forEach(key => {
      this.editor.setOption(key, this.props.options[key]);
    });
    this.editor.setValue(this.props.value);
  }

  render() {
    const className = classnames({
      'react-codemirror': true,
      [this.props.className]: !!this.props.className,
    });
    return (
      <div className={className} ref={(self) => { this.ref = self; }} />
    );
  }
}

export default polyfill(RcCodeMirror);