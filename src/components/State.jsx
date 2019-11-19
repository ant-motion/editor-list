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

export default class EditorState extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    header: PropTypes.string,
    locale: PropTypes.object,
    showClassState: PropTypes.bool,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    value: {},
    onChange: () => {
    },
  };
  onChange = (e) => {
    this.props.onChange('cursor', e);
  }

  render() {
    const { showClassState, locale, isMobile, value, onChange, ...props } = this.props;
    const childrenToRender = Object.keys(locale.styleSelect).map(key => {
      const item = locale.styleSelect;
      if (isMobile && item[key] === 'hover') {
        return null;
      }
      return (
        <RadioButton value={key} key={key} className="ant-radio-button-auto-width">
          {item[key]}
        </RadioButton>
      );
    }).filter(c => c);
    return (<Panel {...props} header={props.header || locale.header}>
      <Row gutter={8}>
        <Col span={24}>
          {locale.cursor}
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={24}>
          <Select
            style={{ width: '100%' }}
            value={value.cursor || 'auto'}
            size="small"
            onChange={this.onChange}
            getPopupContainer={node => getParentNode(node, 'editor-list')}
            dropdownMatchSelectWidth={false}
            dropdownClassName="editor-list-dropdown"
          >
            {getOption(locale.cursorSelect, true)}
          </Select>
        </Col>
      </Row>
      {showClassState && [
        <Row gutter={8} key="0">
          <Col span={24}>
            {locale.style}
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
