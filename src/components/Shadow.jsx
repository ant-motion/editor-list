import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Radio from 'antd/lib/radio';
import Switch from 'antd/lib/switch';
import AutoComplete from './common/AutoComplete';
import Color from './common/Color';

const Panel = Collapse.Panel;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
export default class EditorShadow extends Component {
  static propsTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    header: PropTypes.string,
  };

  static defaultProps = {
    header: '阴影',
    value: {
      boxShadow: {},
      textShadow: {},
    },
  };

  constructor(props) {
    super(props);
    this.tags = {
      boxShadow: '边框阴影',
      textShadow: '文字阴影',
    };
    this.state = {
      key: 'boxShadow',
    };
  }

  radioChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  onChange = (key, v) => {
    const keyValue = {
      ...this.props.value[this.state.key],
      [key]: v,
    };
    const value = this.props.value;
    value[this.state.key] = keyValue;
    this.props.onChange && this.props.onChange('shadow', value);
  };

  getTabs = () => (
    <RadioGroup value={this.state.key} onChange={this.radioChange} size="small">
      {Object.keys(this.tags).map(key => (
        <RadioButton value={key} key={key} className="ant-radio-button-auto-width">
          {this.tags[key]}
        </RadioButton>
      ))}
    </RadioGroup>
  );

  render() {
    const { ...props } = this.props;
    const { value } = props;
    const key = this.state.key;
    ['value', 'tags', 'onChange'].map(key => delete props[key]);
    return (<Panel {...props}>
      {this.getTabs()}
      <div key={key} style={{ marginTop: 10 }}>
        <Row gutter={8}>
          <Col span={4}>
            偏移
          </Col>
          <Col span={10}>
            <AutoComplete
              dataSource={['px', 'rem', 'em']}
              style={{ width: '100%' }}
              size="small"
              placeholder="offset x"
              value={value[key].x}
              onChange={(e) => {
                this.onChange('x', e);
              }}
            />
          </Col>
          <Col span={10}>
            <AutoComplete
              dataSource={['px', 'rem', 'em']}
              style={{ width: '100%' }}
              size="small"
              placeholder="offset y"
              value={value[key].y}
              onChange={(e) => {
                this.onChange('y', e);
              }}
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4}>
            模糊
          </Col>
          <Col span={20}>
            <AutoComplete
              dataSource={['px', 'rem', 'em']}
              style={{ width: '100%' }}
              size="small"
              placeholder="blur"
              value={value[key].blur}
              onChange={(e) => {
                this.onChange('blur', e);
              }}
            />
          </Col>
        </Row>
        {this.state.key === 'boxShadow' && (
          <Row gutter={8}>
            <Col span={4}>
              范围
            </Col>
            <Col span={8}>
              <AutoComplete
                dataSource={['px', 'rem', 'em']}
                style={{ width: '100%' }}
                size="small"
                placeholder="spread"
                value={value[key].spread}
                onChange={(e) => {
                  this.onChange('spread', e);
                }}
              />
            </Col>
            <Col span={6}>
              内阴影
            </Col>
            <Col span={6}>
              <Switch size="small" checked={!!value[key].inset} onChange={(e) => {
                this.onChange('inset', e ? 'inset' : null);
              }} />
            </Col>
          </Row>
        )}
        <Color color={value[key].color} onChange={(e) => {
          this.onChange('color', e);
        }}/>
      </div>
    </Panel>);
  }
}

EditorShadow.componentName = 'EditorShadow';