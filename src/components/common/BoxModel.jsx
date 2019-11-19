import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';
import AutoComplete from './AutoComplete';
import Color from './Color';
import InputGroup from './InputGroup';
import { getParentNode } from '../../utils';

const Option = Select.Option;

export default class BoxModel extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    keys: PropTypes.array,
    name: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    keys: ['top', 'right', 'bottom', 'left', 'center'],
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.radioKeys = ['top-left', 'top-right', 'bottom-right', 'bottom-left', 'center'];
  }

  getInput = (isRadius) => {
    const { value } = this.props;
    return ((isRadius ? this.radioKeys : this.props.keys).map(key => {
      let v = (value && value[key]) ||
        (typeof value === 'string' ? value : null);
      if (key === 'center') {
        const values = Object.keys(value).map(c => value[c]);
        const equal = values.every(c => c === values[0]);
        v = equal ? values[0] : v;
      }
      return (
        <AutoComplete
          key={key}
          value={v}
          className={key}
          placeholder={key}
          disabled={this.props.disabled}
        />
      );
    }));
  }

  getColor = () => {
    const { value } = this.props;
    return (this.props.keys.map(key => {
      const v = (value && value[key]) ||
        (typeof value === 'string' ? value : null);
      return (
        <Color
          key={key}
          type="cut"
          className={key}
          color={v}
        />
      );
    }));
  }

  getSelect = () => {
    const select = ['none', 'solid', 'dashed', 'dotted', 'double'];
    const { value } = this.props;
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
            getPopupContainer={node => getParentNode(node, 'editor-list')}
            dropdownMatchSelectWidth={false}
            dropdownClassName="editor-list-dropdown"
          >
            {select.map(cKey => (
              <Option value={cKey} key={cKey}>
                {cKey}
              </Option>
            ))}
          </Select>
        );
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
        <InputGroup className="box-model" onChange={(v, isDrag) => {
          this.props.onChange(v, isDrag)
        }}>
          {this.getChildrenToBox()}
        </InputGroup>
      </div>
    );
  }
}
