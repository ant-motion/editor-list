import React from 'react';
import PropTypes from 'prop-types';
import AntAutoComplete from 'antd/lib/auto-complete';
import Input from 'antd/lib/input';
import { getParentNode } from '../../utils';

export default class AutoComplete extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func,
    dataSource: PropTypes.array,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  static defaultProps = {
    dataSource: ['px', '%', 'rem', 'em', 'vw', 'vh'],
    size: 'small',
  }

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
      dataSource: [],
      value: props.value,
    };
  }

  onSearch = (value) => {
    if (this.props.onSearch) {
      this.props.onSearch();
    }
    this.setState({
      dataSource: value && !value.match(/[a-z|%]/ig) ?
        this.props.dataSource.map(key => `${value}${key}`) : [],
    });
  }

  onChangeEnd = (v) => {
    if (v !== this.props.value) {
      const o = {
        showAll: false,
        value: v,
      };
      this.setState(o);
      this.props.onChange(v);
    }
  };

  onChange = (value) => {
    this.setState({
      value,
    });
  }

  render() {
    const { onChange, ...props } = this.props;
    const { value } = this.state;
    return (
      <AntAutoComplete
        {...props}
        value={value}
        dataSource={this.state.dataSource}
        onSearch={this.onSearch}
        onChange={this.onChange}
        onBlur={this.onChangeEnd}
        onSelect={this.onChangeEnd}
        placeholder={this.props.placeholder || '--'}
        dropdownMatchSelectWidth={false}
        dropdownClassName="editor-list-dropdown"
        getPopupContainer={node => getParentNode(node, 'editor-list')}
      >
        <Input onPressEnter={(e) => { this.onChangeEnd(e.target.value) }} />
      </AntAutoComplete>
    );
  }
}
