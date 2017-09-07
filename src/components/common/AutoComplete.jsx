import React from 'react';
import PropTypes from 'prop-types';
import AntAutoComplete from 'antd/lib/auto-complete';

export default class AutoComplete extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func,
    dataSource: PropTypes.array,
    placeholder: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  onSearch = (value) => {
    if (this.props.onSearch) {
      this.props.onSearch();
    }
    this.setState({
      dataSource: value && !value.match(/[a-z]/ig) ?
        this.props.dataSource.map(key => `${value}${key}`) : [],
    });
  }

  render() {
    return (
      <AntAutoComplete {...this.props}
        dataSource={this.state.dataSource}
        onSearch={this.onSearch}
        transitionName="editor-slide-up"
        placeholder={this.props.placeholder || '--'}
      />
    );
  }
}
