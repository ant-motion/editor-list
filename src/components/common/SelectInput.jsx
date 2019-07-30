import React from 'react';
import AutoComplete from 'antd/lib/auto-complete';
import PropTypes from 'prop-types';
import { getParentNode } from '../../utils';

export default class SelectInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func,
    children: PropTypes.any,
  };

  static defaultProps = {
    onChange: () => {
    },
  };

  constructor(props) {
    super(props);
    this.value = this.props.value;
    this.state = {
      showAll: false,
      value: props.value,
      noChange: false,
    };
  }

  onBlur = (e) => {
    const o = {
      showAll: false,
    };
    if (this.state.value === this.value) {
      o.noChange = true;
    } else {
      this.value = e;
    }
    this.setState(o);
  };

  onFocus = () => {
    this.setState({
      showAll: true,
      noChange: false,
    });
  }

  onChange = (value) => {
    this.props.onChange(value);
    this.setState({
      value,
      showAll: false,
    });
  }

  filterOption = (input, option) => {
    if (this.state.showAll || this.state.noChange) {
      return true;
    }
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  render() {
    return (
      <AutoComplete
        className="select-input"
        style={{ width: '100%' }}
        {...this.props}
        placeholder={this.props.placeholder || '--'}
        filterOption={this.filterOption}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onChange={this.onChange}
        value={this.props.value}
        getPopupContainer={node => getParentNode(node, 'editor-list')}
        size="small"
        dropdownMatchSelectWidth={false}
        dropdownClassName="editor-list-dropdown"
      >
        {this.props.children}
      </AutoComplete>
    );
  }
}
