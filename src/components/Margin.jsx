import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Radio from 'antd/lib/radio';
import BoxModel from './common/BoxModel';

const Panel = Collapse.Panel;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
export default class EditorMargin extends Component {
  static propsTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    header: PropTypes.string,
  };

  static defaultProps = {
    header: '边距',
    value: {
      margin: null,
      padding: null
    },
  };

  constructor(props) {
    super(props);
    this.keys = ['top', 'right', 'bottom', 'left', 'center'];
    this.tags = {
      margin: '外边 margin',
      padding: '内边 padding',
    };
    this.state = {
      key: 'margin',
    };
  }

  radioChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  onChange = (e) => {
    const value = {
      ...this.props.value,
      [this.state.key]: e
    };
    this.props.onChange && this.props.onChange('margin', value);
  }

  getTabs = () => (
    <RadioGroup value={this.state.key} onChange={this.radioChange} size="small">
      {Object.keys(this.tags).map(key => (
        <RadioButton value={key} key={key} className="ant-radio-button-auto-width">
          {this.tags[key]}
        </RadioButton>
      ))}
    </RadioGroup>
  )

  render() {
    const { ...props } = this.props;
    const { value } = props;
    const key = this.state.key;
    ['value', 'tags', 'onChange'].map(key => delete props[key]);
    return (<Panel {...props}>
      {this.getTabs()}
      <BoxModel
        name={key}
        key={key}
        keys={this.keys}
        value={value[key]}
        onChange={this.onChange}
      />
    </Panel>);
  }
}

EditorMargin.componentName = 'EditorMargin';