import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import Icon from './common/Icon';
import AutoComplete from './common/AutoComplete';
import RowHelp from './common/RowHelp';
import BoxModel from './common/BoxModel';
import { getOption, getParentNode } from '../utils';

const Panel = Collapse.Panel;

export default class EditorInterface extends Component {
  static propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    locale: PropTypes.object,
  };

  static defaultProps = {
    className: 'editor-font',
    value: {
      overflow: 'visible',
      width: '0px',
      maxWidth: null,
      minWidth: null,
      position: 'static',
      top: null,
      right: null,
      bottom: null,
      left: null,
    },
    onChange: () => { },
  };

  onChange = (key, v) => {
    const value = key === 'offset' ? {
      ...this.props.value,
      ...v,
    }
      : {
        ...this.props.value,
        [key]: v,
      };
    this.props.onChange('interface', value);
  }

  render() {
    const { ...props } = this.props;
    const { value, locale } = props;
    ['value', 'font'].map(key => delete props[key]);
    return (
      <Panel {...props} header={props.header || locale.header}>
        <Row gutter={8}>
          <Col span={3}>
            <Icon type="overflow" prompt={locale.overflow} />
          </Col>
          <Col span={21}>
            <Select
              style={{ width: '100%' }}
              value={value.overflow || 'visible'}
              size="small"
              onChange={(e) => {
                this.onChange('overflow', e);
              }}
              getPopupContainer={node => getParentNode(node, 'editor-list')}
              dropdownMatchSelectWidth={false}
              dropdownClassName="editor-list-dropdown"
            >
              {getOption(locale.overflow_select, true)}
            </Select>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={3}>
            <Icon type="width" prompt={locale.width} />
          </Col>
          <Col span={9}>
            <AutoComplete
              style={{ width: '100%' }}
              value={value.width}
              onChange={(e) => {
                this.onChange('width', e);
              }}
            />
          </Col>
          <Col span={6}>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder="min"
              value={value.minWidth}
              onChange={(e) => {
                this.onChange('minWidth', e);
              }}
            />
          </Col>
          <Col span={6}>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder="max"
              value={value.maxWidth}
              onChange={(e) => {
                this.onChange('maxWidth', e);
              }}
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={3}>
            <Icon type="height" prompt={locale.height} />
          </Col>
          <Col span={9}>
            <AutoComplete
              style={{ width: '100%' }}
              value={value.height}
              onChange={(e) => {
                this.onChange('height', e);
              }}
            />
          </Col>
          <Col span={6}>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder="min"
              value={value.minHeight}
              onChange={(e) => {
                this.onChange('minHeight', e);
              }}
            />
          </Col>
          <Col span={6}>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder="max"
              value={value.maxHeight}
              onChange={(e) => {
                this.onChange('maxHeight', e);
              }}
            />
          </Col>
        </Row>
        {/* <Row>
          <Col>
            位置 - Position
            <Tooltip
              placement="topRight"
              arrowPointAtCenter
              title={<span>1. 如需设定位置，请先设置定位; <br /> 2. 如果 4 个都有值，以 top left 为准;</span>}
            >
              <Icon type="question-circle" style={{ marginLeft: 5 }} />
            </Tooltip>
          </Col>
        </Row> */}
        <RowHelp
          title={<Icon type="position" prompt={locale.position} />}
          help={locale.position_help}
        >
          <Select
            style={{ width: '100%' }}
            value={value.position || 'static'}
            size="small"
            onChange={(e) => {
              this.onChange('position', e);
            }}
            getPopupContainer={node => getParentNode(node, 'editor-list')}
            dropdownMatchSelectWidth={false}
            dropdownClassName="editor-list-dropdown"
          >
            {getOption(locale.position_select, true)}
          </Select>
        </RowHelp>
        <BoxModel keys={['top', 'right', 'bottom', 'left']}
          value={{
            top: value.top,
            right: value.right,
            bottom: value.bottom,
            left: value.left,
          }}
          onChange={(e) => {
            this.onChange('offset', e);
          }}
          disabled={!value.position || value.position === 'static'}
        />
      </Panel>
    );
  }
}

EditorInterface.componentName = 'EditorInterface';
