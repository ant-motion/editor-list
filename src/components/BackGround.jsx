import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import SelectInput from './common/SelectInput';
import Color from './common/Color';
import RowHelp from './common/RowHelp';
import Radio from 'antd/lib/radio';
import { getOption, getOptionArray, getRadioButton } from '../utils';


const RadioGroup = Radio.Group;

const Panel = Collapse.Panel;

class EditorBg extends Component {
  static propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.object,
  };

  static defaultProps = {
    className: 'editor-bg',
    header: '背景',
    value: {
      color: null,
      image: '',
      repeat: 'repeat',
      position: 'center',
      size: 'contain',
      attachment: 'scroll',
    },
    onChange: () => {},
  };

  onChange = (key, v) => {
    const value = {
      ...this.props.value,
      [key]: v,
    };
    this.props.onChange('background', value);
  }

  repeat = { repeat: '重复', 'repeat-x': '横向重复', 'repeat-y': '竖向重复', 'no-repeat': '不重复' };

  position = ['center', 'center left', 'center right', 'top', 'top left',
    'top right', 'bottom', 'bottom left', 'bottom right'];

  size = ['100%', '100% 50%', 'auto', 'contain', 'cover'];

  attachment = ['scroll', 'fixed'];

  render() {
    const { ...props } = this.props;
    const { value } = props;
    ['value', 'onChange', 'font'].map(key => delete props[key]);
    return (<Panel {...props}>
      <Color
        onChange={(e) => {
          this.onChange('color', e);
        }}
        color={value.color}
      />
      <Row gutter={8}>
        <Col span={4}>
          图片
        </Col>
        <Col span={20}>
          <Input
            value={value.image || ''}
            onChange={(e) => {
              const v = e.target.value;
              this.onChange('image', v);
            }}
            size="small"
            placeholder="添加图片"
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>
          重复
        </Col>
        <Col span={20}>
          <Select
            style={{ width: '100%' }}
            value={value.repeat || 'repeat'}
            size="small"
            onChange={(e) => {
              this.onChange('repeat', e);
            }}
          >
            {getOption(this.repeat)}
          </Select>
        </Col>
      </Row>
      <RowHelp title="位置" help={<div>可设置自定义值(x, y)<br />如: 50px 100px</div>}>
        <SelectInput
          style={{ width: '100%' }}
          value={value.position || ''}
          size="small"
          onChange={(e) => {
            this.onChange('position', e);
          }}
        >
          {getOptionArray(this.position)}
        </SelectInput>
      </RowHelp>
      <RowHelp title="尺寸" help={<div>可设置自定义值(x, y)<br />如: 50px 100px</div>}>
        <SelectInput
          style={{ width: '100%' }}
          value={value.size || ''}
          size="small"
          onChange={(e) => {
            this.onChange('size', e);
          }}
        >
          {getOptionArray(this.size)}
        </SelectInput>
      </RowHelp>
      <Row gutter={8}>
        <Col span={4}>
          类型
        </Col>
        <Col span={20}>
          <RadioGroup
            value={value.attachment || 'scroll'}
            size="small"
            onChange={(e) => {
              const v = e.target.value;
              this.onChange('attachment', v);
            }}
          >
            {getRadioButton(this.attachment)}
          </RadioGroup>
        </Col>
      </Row>
    </Panel>);
  }
}

EditorBg.componentName = 'EditorBackGround';

export default EditorBg;
