import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Radio from 'antd/lib/radio';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import { getOption, getParentNode } from '../utils';

const Panel = Collapse.Panel;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const cursorState = {
  auto: '默认光标',
  pointer: '手型光标',
  crosshair: '十字线光标',
  move: '移动光标',
  text: '文本光标',
  wait: '加载光标',
  help: '帮助光标',
};

export default class EditorState extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    header: PropTypes.string,
    showClassState: PropTypes.bool,
  };

  static defaultProps = {
    header: '状态',
    value: '',
    onChange: () => {
    },
  };

  render() {
    const { ...props } = this.props;
    const { value, showClassState, isMobile } = props;
    ['value', 'onChange'].map(key => delete props[key]);
    const childrenToRender = [
      { value: 'default', content: '无' },
      { value: 'hover', content: '经过' },
      { value: 'active', content: '按下' },
      { value: 'focus', content: '选中' },
    ].map(item => {
      if (isMobile && item.value === 'hover') {
        return null;
      }
      return (
        <RadioButton value={item.value} key={item.value} className="ant-radio-button-auto-width">
          {item.content}
        </RadioButton>
      );
    }).filter(c => c);
    return (<Panel {...props} >
      <Row gutter={8}>
        <Col span={24}>
          鼠标光标状态
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={24}>
          <Select
            style={{ width: '100%' }}
            value={value.cursor || 'auto'}
            size="small"
            onChange={(e) => {
              this.props.onChange('cursor', e);
            }}
            getPopupContainer={node => getParentNode(node, 'editor-list')}
            dropdownMatchSelectWidth={false}
            dropdownClassName="editor-list-dropdown"
          >
            {getOption(cursorState)}
          </Select>
        </Col>
      </Row>
      {showClassState && [
        <Row gutter={8} key="0">
          <Col span={24}>
            样式状态
          </Col>
        </Row>,
        <Row gutter={8} key="1">
          <Col span={24}>
            <RadioGroup
              value={value.classState}
              size="small"
              onChange={(e) => {
                this.props.onChange('classState', e.target.value);
              }}
            >
              {childrenToRender}
            </RadioGroup>
          </Col>
        </Row>]}
    </Panel>);
  }
}

EditorState.componentName = 'EditorState';
