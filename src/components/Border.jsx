import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Radio from 'antd/lib/radio';
import BoxModel from './common/BoxModel';

const Panel = Collapse.Panel;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
export default class EditorBorder extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    header: PropTypes.string,
  };

  static defaultProps = {
    header: '边框',
    value: {
      style: 'none',
      color: '#000',
      width: null,
      radius: null,
    },
    onChange: () => {
    },
  };

  constructor(props) {
    super(props);
    this.keys = ['top', 'right', 'bottom', 'left', 'center'];
    this.tags = {
      width: '线宽',
      color: '颜色',
      style: '样式',
      radius: '圆角',
    };
    this.state = {
      key: 'width',
    };
  }

  onChange = (e) => {
    const value = {
      ...this.props.value,
      [this.state.key]: e,
    };
    this.props.onChange('border', value);
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

  radioChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  render() {
    const { ...props } = this.props;
    const { value } = props;
    const key = this.state.key;
    ['value', 'onChange'].map(str => delete props[str]);
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

EditorBorder.componentName = 'EditorBorder';
