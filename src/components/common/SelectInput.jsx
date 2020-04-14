import React from 'react';
import AutoComplete from 'antd/lib/auto-complete';
// import Input from 'antd/lib/input';
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

  static getDerivedStateFromProps(props, { prevProps }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && prevProps.value !== props.value) {
      nextState.value = props.value;
    }
    return nextState;
  }

  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
      value: props.value,
    };
  }

  onChangeEnd = (e) => {
    const { target } = e;
    const v = target ? target.value : e;
    if (v !== this.props.value) {
      this.setState({
        showAll: false,
        value: v,
      });
      this.props.onChange(v);
    }
  };

  onFocus = () => {
    this.setState({
      showAll: true,
    });
  }

  onChange = (value) => {
    this.isSelect = false;
    this.setState({
      value,
      showAll: false,
    });
  }

  filterOption = (input, option) => {
    if (this.state.showAll) {
      return true;
    }
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  render() {
    const { value } = this.state;
    const { children, onChange, ...props } = this.props;
    return (
      <AutoComplete
        className="select-input"
        style={{ width: '100%' }}
        {...props}
        placeholder={this.props.placeholder || '--'}
        filterOption={this.filterOption}
        onBlur={this.onChangeEnd}
        onFocus={this.onFocus}
        onChange={this.onChange}
        onSelect={(v) => {
          this.isSelect = true;
          this.onChangeEnd(v)
        }}
        value={value}
        getPopupContainer={node => getParentNode(node, 'editor-list')}
        size="small"
        dropdownMatchSelectWidth={false}
        dropdownClassName="editor-list-dropdown"
      >
        {children}
      </AutoComplete>
    );
  }
}
