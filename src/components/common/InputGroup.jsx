import React from 'react';
import PropTypes from 'prop-types';
import Input from 'antd/lib/input';
import { toArrayChildren } from '../../utils';

const Group = Input.Group;

export default class InputGroup extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {
    },
  };

  constructor(props) {
    super(props);
    const values = this.getValues(props);
    this.state = {
      values,
    };
  }

  componentWillReceiveProps(nextProps) {
    const values = this.getValues(nextProps);
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

  onChange = (key, e) => {
    const values = this.state.values;
    const value = e && e.target ? e.target.value : e;
    if (key === 'center') {
      this.props.onChange(value);
      Object.keys(values).forEach(key => {
        values[key] = value;
      });
    } else {
      values[key] = value;
      values.center = null;
      this.props.onChange(values);
    }
    this.setState({
      values,
    });
  }

  render() {
    const { ...props } = this.props;
    ['onChange'].forEach(key => delete props[key]);
    const children = toArrayChildren(props.children).map(item => {
      if (!item) {
        return null;
      }
      const onChange = (e) => {
        this.onChange(item.key, e);
      };
      return React.cloneElement(item, { ...item.props, onChange });
    });
    return React.createElement(Group, props, children);
  }
}
