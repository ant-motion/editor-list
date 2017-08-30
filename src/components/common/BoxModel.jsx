import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';
import AutoComplete from './AutoComplete';
import Color from './Color';
import InputGroup from './InputGroup';

const Option = Select.Option;

export default class BoxModel extends Component {
  static propsTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    keys: PropTypes.array,
    name: PropTypes.string,
  };

  static defaultProps = {
    keys: ['top', 'right', 'bottom', 'left', 'center']
  };

  constructor(props) {
    super(props);
    this.radioKeys = ['top-left', 'top-right', 'bottom-right', 'bottom-left', 'center'];
    const value = typeof props.value === 'string' ? props.value : { ...props.value };
    console.log(props.value)
    this.state = {
      value,
    };
  }

  onChange = (e) => {
    this.props.onChange && this.props.onChange(e);
    this.setState({
      value: e,
    });
  }

  getInput = (isRadius) => {
    const { value } = this.state;
    console.log(value)
    return ((isRadius ? this.radioKeys : this.props.keys).map(key => {
      const v = (value && value[key]) ||
        (typeof value === 'string' ? value : null);
      return (
        <AutoComplete
          key={key}
          style={{ width: 50 }}
          dataSource={['px', 'rem', 'em']}
          size="small"
          value={v}
          className={key}
        />
      );
    }));
  }

  getColor = () => {
    const { value } = this.state;
    return (this.props.keys.map(key => {
      const v = (value && value[key]) ||
        (typeof value === 'string' ? value : null);
      return (
        <Color
          key={key}
          style={{ width: 50 }}
          type="cut"
          className={key}
          color={v}
        />
      );
    }));
  }

  getSelect = () => {
    const select = ['none', 'solid', 'dashed', 'dotted', 'double'];
    const { value } = this.state;
    return (
      this.props.keys.map(key => {
        const v = (value && value[key]) ||
          (typeof value === 'string' ? value : select[0]);
        return (
          <Select
            className={key}
            size="small"
            key={key}
            value={v}
          >
            {select.map(cKey => (
              <Option value={cKey} key={cKey}>
                {cKey}
              </Option>
            ))}
          </Select>
        )
      }));
  }

  getChildrenToBox = () => {
    switch (this.props.name) {
      case 'color':
        return this.getColor();
      case 'style':
        return this.getSelect();
      default:
        return this.getInput(this.props.name === 'radius');
    }
  }

  render() {
    return (
      <div className="box-model-wrapper">
        <InputGroup className="box-model" onChange={this.onChange}>
          {this.getChildrenToBox()}
        </InputGroup>
      </div>
    );
  }
}
