import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Radio from 'antd/lib/radio';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Switch from 'antd/lib/switch';

const Panel = Collapse.Panel;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class EditorState extends Component {
  static propsTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    header: PropTypes.string,
  };

  static defaultProps = {
    header: '状态',
    value: '',
  };

  render() {
    const { ...props } = this.props;
    const { value } = props;
    ['value', 'onChange'].map(key => delete props[key]);
    const childrenToRender = [
      { value: 'default', content: '无' },
      { value: 'active', content: '按下' },
      { value: 'hover', content: '经过' },
      { value: 'focus', content: '选中' },
    ].map(item => (
      <RadioButton value={item.value} key={item.value} className="ant-radio-button-auto-width">
        {item.content}
      </RadioButton>
    ));
    return (<Panel {...props} >
      <Row gutter={8}>
        <Col span={4}>
          手型
        </Col>
        <Col span={20}>
          <Switch
            size="small"
            checked={value.cursor}
            onChange={(e) => {
              this.props.onChange && this.props.onChange('cursor', e);
            }}
          />
        </Col>
      </Row>
      <Row gutter={8}>
        样式状态
      </Row>
      <Row gutter={8} style={{ textAlign: 'center' }}>
        <RadioGroup defaultValue={value.classState} size="small" onChange={(e) => {
          this.props.onChange && this.props.onChange('classState', e.target.value)
        }}>
          {childrenToRender}
        </RadioGroup>
      </Row>
    </Panel>)
  }
}

EditorState.componentName = 'EditorState';