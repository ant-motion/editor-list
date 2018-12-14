import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import SelectInput from './common/SelectInput';
import Icon from './common/Icon';
import Color from './common/Color';
import RowHelp from './common/RowHelp';
import { getOption, getOptionArray, getRadioButton, getParentNode } from '../utils';


const RadioGroup = Radio.Group;

const Panel = Collapse.Panel;

class EditorBg extends Component {
  static propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.object,
    locale: PropTypes.object,
  };

  static defaultProps = {
    className: 'editor-bg',
    value: {
      color: null,
      image: '',
      repeat: 'repeat',
      position: 'center',
      size: 'contain',
      attachment: 'scroll',
    },
    onChange: () => { },
  };

  onChange = (key, v) => {
    const value = {
      ...this.props.value,
      [key]: v,
    };
    this.props.onChange('background', value);
  }

  position = ['center', 'center left', 'center right', 'top', 'top left',
    'top right', 'bottom', 'bottom left', 'bottom right'];

  size = ['100%', '100% 50%', 'auto', 'contain', 'cover'];

  attachment = ['scroll', 'fixed'];

  render() {
    const { ...props } = this.props;
    const { value, locale } = props;
    ['value', 'onChange', 'font'].map(key => delete props[key]);
    return (<Panel {...props} header={props.header || locale.header}>
      <Color
        onChange={(e) => {
          this.onChange('color', e);
        }}
        title={<Icon type="bg-colors" prompt={locale.color}/>}
        color={value.color}
      />
      <Row gutter={8}>
        <Col span={3}>
          <Icon type="picture" prompt={locale.image} />
        </Col>
        <Col span={21}>
          <Input
            value={value.image || ''}
            onChange={(e) => {
              const v = e.target.value;
              this.onChange('image', v);
            }}
            size="small"
            placeholder="Add image url"
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={3}>
          <Icon type="repeat" prompt={locale.repeat} />
        </Col>
        <Col span={21}>
          <Select
            style={{ width: '100%' }}
            value={value.repeat || 'repeat'}
            size="small"
            onChange={(e) => {
              this.onChange('repeat', e);
            }}
            getPopupContainer={node => getParentNode(node, 'editor-list')}
            dropdownMatchSelectWidth={false}
            dropdownClassName="editor-list-dropdown"
          >
            {getOption(locale.repeat_select)}
          </Select>
        </Col>
      </Row>
      <RowHelp
        title={
          <Icon type="imagePosition" prompt={locale.position} />
        }
        help={locale.position_help}
      >
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
      <RowHelp
        title={<Icon type="size" prompt={locale.size} />}
        help={locale.size_help}
      >
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
        <Col span={3}>
          <Icon type="attachment" prompt={locale.attachment} />
        </Col>
        <Col span={21}>
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
