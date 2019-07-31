import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import Icon from './common/Icon';
import AutoComplete from './common/AutoComplete';
import SelectInput from './common/SelectInput';
import Color from './common/Color';
import { getOptionArray, getParentNode } from '../utils';

const Panel = Collapse.Panel;
const Option = Select.Option;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class EditorFont extends Component {
  static propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    font: PropTypes.array,
    value: PropTypes.object,
    onChange: PropTypes.func,
    locale: PropTypes.object,
  };

  static defaultProps = {
    className: 'editor-font',
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
    onChange: () => {
    },
  };

  onChange = (key, v) => {
    const value = {
      ...this.props.value,
      [key]: v,
    };
    this.props.onChange('font', value);
  }

  getFontFamily = () => (
    this.font.concat(this.props.font).sort().filter((item, pos, ary) => (
      !pos || item !== ary[pos - 1]
    )).map(key => (
      <Option value={key} key={key} style={{ fontFamily: `${key}, sans-serif` }}>
        {key}
      </Option>))
  );

  getFontAlign = () => {
    let align = this.props.value.align;
    align = align === 'start' ? 'left' : align;
    align = align === 'end' ? 'right' : align;
    return (
      <RadioGroup
        value={align}
        size="small"
        onChange={(e) => {
          const target = e.target;
          this.onChange('align', target.value);
        }}
      >
        {['left', 'center', 'right', 'justify'].map(key => (
          <RadioButton value={key} className={`${this.props.className}-align`} key={key}>
            <div className={key} />
          </RadioButton>
        ))}
      </RadioGroup>
    );
  };

  getFontDecoration = () => (
    <RadioGroup value={this.props.value.decoration &&
      this.props.value.decoration.split(' ')[0]} size="small" onChange={(e) => {
        const target = e.target;
        this.onChange('decoration', target.value);
      }}
    >
      {['none', 'underline', 'line-through', 'overline'].map(key => (
        <RadioButton value={key} key={key}>
          <div className="decoration" style={{ textDecoration: key }}>Aa</div>
        </RadioButton>
      ))}
    </RadioGroup>
  );

  font = ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 'Impact',
    'Lucida Console', 'MS Serif', 'Palatino Linotype', 'Papyrus', 'Tahoma', 'Times New Roman',
    'Helvetica Neue', 'Segoe UI', 'Hiragino Sans GB', 'PingFang SC', 'Microsoft YaHei',
    'SimSun', 'SimHei', 'Trebuchet MS', 'Verdana'];

  weight = ['bold', 'lighter', 'normal', '100', '200', '300', '400',
    '500', '600', '700', '800', '900'];

  render() {
    const { ...props } = this.props;
    const { value, locale } = props;
    ['value', 'font'].map(key => delete props[key]);
    return (<Panel {...props} header={props.header || locale.header}>
      <Row gutter={8}>
        <Col span={3} >
          <Icon prompt={locale.font}><span className="icon">A</span></Icon>
        </Col>
        <Col span={21}>
          <SelectInput
            placeholder={locale.placeholder}
            style={{ width: '100%' }}
            value={value.family}
            size="small"
            onChange={(e) => {
              this.onChange('family', e);
            }}
          >
            {this.getFontFamily()}
          </SelectInput>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={3} ><Icon type="font-size" prompt={locale.size} /></Col>
        <Col span={9}>
          <AutoComplete
            style={{ width: '100%' }}
            value={value.size}
            onChange={(e) => {
              this.onChange('size', e);
            }}
          />
        </Col>
        <Col span={3}><Icon type="bold" prompt={locale.bold} /></Col>
        <Col span={9}>
          <Select
            style={{ width: '100%' }}
            value={value.weight}
            size="small"
            getPopupContainer={node => getParentNode(node, 'editor-list')}
            onChange={(e) => {
              this.onChange('weight', e);
            }}
            dropdownMatchSelectWidth={false}
            dropdownClassName="editor-list-dropdown"
          >
            {getOptionArray(this.weight)}
          </Select>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={3} ><Icon type="line-height" prompt={locale.lineHeight} /></Col>
        <Col span={9}>
          <AutoComplete
            style={{ width: '100%' }}
            value={value.lineHeight}
            onChange={(e) => {
              this.onChange('lineHeight', e);
            }}
          />
        </Col>
        <Col span={3}><Icon type="letterSpacing" prompt={locale.letterSpacing} /></Col>
        <Col span={9}>
          <AutoComplete
            style={{ width: '100%' }}
            value={value.letterSpacing}
            onChange={(e) => {
              this.onChange('letterSpacing', e);
            }}
          />
        </Col>
      </Row>
      <Color
        color={value.color}
        title={<Icon type="font-colors" prompt={locale.color} />}
        onChange={(e) => {
          this.onChange('color', e);
        }}
      />
      <Row>
        <Col span={21} offset={3}>
          {this.getFontDecoration()}
        </Col>
      </Row>
      <Row>
        <Col span={21} offset={3}>
          {this.getFontAlign()}
        </Col>
      </Row>
    </Panel>);
  }
}
EditorFont.componentName = 'EditorFont';
export default EditorFont;
