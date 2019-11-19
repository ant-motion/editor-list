import React from 'react';
import PropTypes from 'prop-types';
import Input from 'antd/lib/input';
import { polyfill } from 'react-lifecycles-compat';
import { toArrayChildren } from '../../utils';

const Group = Input.Group;

class InputGroup extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {
    },
  };

  static getDerivedStateFromProps(props, { prevProps, getValues }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && prevProps.children !== props.children) {
      const values = getValues(props);
      nextState.values = values;
    }
    return nextState;
  }

  constructor(props) {
    super(props);
    const values = this.getValues(props);
    this.state = {
      values,
      getValues: this.getValues, // eslint-disable-line
    };
  }

  onChange = (key, e, isDrag) => {
    const values = this.state.values;
    const value = e && e.target ? e.target.value : e;
    if (key === 'center') {
      this.props.onChange(value);
      Object.keys(values).forEach(cKey => {
        values[cKey] = value;
      });
    } else {
      values[key] = value;
      values.center = null;
      this.props.onChange(values, isDrag);
    }
    this.setState({
      values,
    });
  }

  getValues = (props) => {
    const values = {};
    toArrayChildren(props.children).forEach(item => {
      const key = item.key;
      values[key] = item.props.defaultValue || item.props.value || item.props.color;
    });
    return values;
  }

  render() {
    const { ...props } = this.props;
    ['onChange'].forEach(key => delete props[key]);
    const children = toArrayChildren(props.children).map(item => {
      if (!item) {
        return null;
      }
      const onChange = (e, isDrag) => {
        this.onChange(item.key, e, isDrag);
      };
      return React.cloneElement(item, { ...item.props, onChange });
    });
    return React.createElement(Group, props, children);
  }
}

export default polyfill(InputGroup);
