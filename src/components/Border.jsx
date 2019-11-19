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
    locale: PropTypes.object,
  };

  static defaultProps = {
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
    this.state = {
      key: 'width',
    };
  }

  onChange = (e, isDrag) => {
    const value = {
      ...this.props.value,
      [this.state.key]: e,
    };
    this.props.onChange('border', value, isDrag);
  }

  getTabs = () => (
    <RadioGroup value={this.state.key} onChange={this.radioChange} size="small">
      {Object.keys(this.props.locale.tags).map(key => (
        <RadioButton value={key} key={key} className="ant-radio-button-auto-width">
          {this.props.locale.tags[key]}
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
    const { value, locale } = props;
    const key = this.state.key;
    ['value', 'onChange'].map(str => delete props[str]);
    return (<Panel {...props} header={props.header || locale.header}>
      {this.getTabs()}
      <BoxModel
        name={key}
        key={key}
        keys={this.keys}
        value={value[key]}
        onChange={(v, isDrag) => {
          this.onChange(v, isDrag)
        }}
      />
    </Panel>);
  }
}

EditorBorder.componentName = 'EditorBorder';
