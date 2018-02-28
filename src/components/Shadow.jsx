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
  static propTypes = {
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
    onChange: () => {
    },
  };

  constructor(props) {
    super(props);
    this.tags = {
      boxShadow: '边框阴影',
      textShadow: '文字阴影',
    };
    this.defaultShadow = {
      x: '5px',
      y: '5px',
      blur: '5px',
      color: 'rgba(0,0,0,0.35)',
    };
    this.state = {
      key: 'boxShadow',
      open: {
        boxShadow: !!Object.keys(props.value.boxShadow).length,
        textShadow: !!Object.keys(props.value.textShadow).length,
      },
    };
  }

  onChange = (key, v) => {
    const keyValue = {
      ...this.defaultShadow,
      ...this.state.value[this.state.key],
      [key]: v,
    };
    const { value } = this.props;
    const mValue = { ...value };
    mValue[this.state.key] = keyValue;
    this.props.onChange('shadow', mValue);
    this.setState({
      open: {
        ...this.state.open,
        [this.state.key]: true,
      },
    });
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

  openChange = (e) => {
    const { open, key } = this.state;
    const value = {
      ...this.props.value,
      [key]: e ? { ...this.defaultShadow } : {},
    };
    this.props.onChange('shadow', value);
    this.setState({
      open: {
        ...open,
        [key]: e,
      },
    });
  }

  radioChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  render() {
    const { ...props } = this.props;
    const { value } = props;
    const { key, open } = this.state;
    ['value', 'tags', 'onChange'].map(str => delete props[str]);
    return (<Panel {...props}>
      {this.getTabs()}
      <div key={key} style={{ marginTop: 10 }}>
        <Row gutter={8}>
          <Col span={4}>
            开启
          </Col>
          <Col span={20}>
            <Switch size="small" checked={!!open[key]} onChange={this.openChange} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4}>
            偏移
          </Col>
          <Col span={10}>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder="offset x"
              value={open[key] ? value[key].x : ''}
              onChange={(e) => {
                this.onChange('x', e);
              }}
            />
          </Col>
          <Col span={10}>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder="offset y"
              value={open[key] ? value[key].y : ''}
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
              style={{ width: '100%' }}
              placeholder="blur"
              value={open[key] ? value[key].blur : ''}
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
                style={{ width: '100%' }}
                placeholder="spread"
                value={open[key] ? value[key].spread : ''}
                onChange={(e) => {
                  this.onChange('spread', e);
                }}
              />
            </Col>
            <Col span={6}>
              内阴影
            </Col>
            <Col span={6}>
              <Switch
                size="small"
                checked={open[key] ? !!value[key].inset : false}
                onChange={(e) => {
                  this.onChange('inset', e ? 'inset' : null);
                }}
              />
            </Col>
          </Row>
        )}
        <Color
          color={open[key] ? value[key].color : ''}
          onChange={(e) => {
            this.onChange('color', e);
          }}
        />
      </div>
    </Panel>);
  }
}

EditorShadow.componentName = 'EditorShadow';
