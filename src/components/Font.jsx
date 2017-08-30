import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import InpurtNumber from 'antd/lib/input-number';
import AutoComplete from './common/AutoComplete';
import SelectInput from './common/SelectInput';
import Color from './common/Color';
import { getOptionArray } from '../utils';

const Panel = Collapse.Panel;
const Option = Select.Option;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class EditorFont extends Component {
  static propsTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    font: PropTypes.array,
    value: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: 'editor-font',
    header: '字体',
    font: [],
    value: {
      family: 'Helvetica Neue',
      size: '1rem',
      weight: 'normal',
      lineHeight: 1.2,
      color: '#000',
      letterSpacing: '0',
      align: 'left',
      decoration: 'none',
    },
  };

  font = ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 'Impact',
    'Lucida Console', 'MS Serif', 'Palatino Linotype', 'Papyrus', 'Tahoma', 'Times New Roman',
    'Helvetica Neue', 'Segoe UI', 'Hiragino Sans GB', 'PingFang SC', 'Microsoft YaHei',
    'SimSun', 'SimHei', 'Trebuchet MS', 'Verdana'];

  weight = ['bold', 'lighter', 'normal', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

  constructor(props) {
    super(props);
    /*this.state = {
      value: { ...props.value },
    };*/
  }

  onChange = (key, v) => {
    const value = {
      ...this.props.value,
      [key]: v,
    };
    this.props.onChange && this.props.onChange('font', value);
    // this.setState({ value });
  }

  getFontFamily = () => (
    this.font.concat(this.props.font).sort().filter((item, pos, ary) => (
      !pos || item != ary[pos - 1]
    )).map(key => (
      <Option value={key} key={key} style={{ fontFamily: `${key}, sans-serif` }}>
        {key}
      </Option>))
  );

  getFontAlign = () => {
    let align = this.props.value.align;
    align = align === 'start' ? 'left' : align;
    align = align === 'end' ? 'right': align;
    return (<RadioGroup value={align} size="small" onChange={(e) => {
        const target = e.target;
        this.onChange('align', target.value)
      }}>
        {['left', 'center', 'right', 'justify'].map(key => (
          <RadioButton value={key} className={`${this.props.className}-align`} key={key}>
            <div className={key} />
          </RadioButton>
        ))}
      </RadioGroup>
    )
  };

  getFontDecoration = () => (
    <RadioGroup value={this.props.value.decoration || 'none'} size="small" onChange={(e) => {
      const target = e.target;
      this.onChange('decoration', target.value)
    }}>
      {['none', 'underline', 'line-through', 'overline'].map(key => (
        <RadioButton value={key} key={key}>
          <div className="decoration" style={{ textDecoration: key }}>Aa</div>
        </RadioButton>
      ))}
    </RadioGroup>
  );

  render() {
    const { ...props } = this.props;
    const { value } = props;
    ['value', 'font'].map(key => delete props[key]);
    return (<Panel {...props}>
      <Row gutter={8}>
        <Col span={4}>字体</Col>
        <Col span={20}>
          <SelectInput
            placeholder="选择字体"
            style={{ width: '100%' }}
            value={value.family}
            size="small"
            transitionName="editor-slide-up"
            onChange={(e) => {
              this.onChange('family', e);
            }}
          >
            {this.getFontFamily()}
          </SelectInput>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>大小</Col>
        <Col span={8}>
          <AutoComplete
            dataSource={['px', 'rem', 'em']}
            style={{ width: '100%' }}
            size="small"
            value={value.size}
            onChange={(e) => {
              this.onChange('size', e);
            }}
          />
        </Col>
        <Col span={4}>粗细</Col>
        <Col span={8}>
          <Select
            style={{ width: '100%' }}
            value={value.weight || 'normal'}
            size="small"
            transitionName="editor-slide-up"
            onChange={(e) => {
              this.onChange('weight', e);
            }}
          >
            {getOptionArray(this.weight)}
          </Select>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>行距</Col>
        <Col span={8}>
          <AutoComplete
            dataSource={['px', 'rem', 'em']}
            size="small"
            style={{ width: '100%' }}
            value={value.lineHeight}
            onChange={(e) => {
            this.onChange('lineHeight', e)
          }} />
        </Col>
        <Col span={4}>间距</Col>
        <Col span={8}>
          <AutoComplete
            dataSource={['px', 'rem', 'em']}
            style={{ width: '100%' }}
            size="small"
            value={value.letterSpacing}
            onChange={(e) => {
              this.onChange('letterSpacing', e)
            }}
          />
        </Col>
      </Row>
      <Color color={value.color} onChange={(e) => {
        this.onChange('color', e);
      }} />
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          {this.getFontDecoration()}
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          {this.getFontAlign()}
        </Col>
      </Row>
    </Panel>)
  }
}
EditorFont.componentName = 'EditorFont';
export default EditorFont;