import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import AutoComplete from './common/AutoComplete';
import RowHelp from './common/RowHelp';
import BoxModel from './common/BoxModel';
import { getOption } from '../utils';

const Panel = Collapse.Panel;

export default class EditorInterface extends Component {
  static propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: 'editor-font',
    header: '界面',
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

  pos = { static: '没有定位', absolute: '绝对定位', relative: '相对定位', fixed: '窗口定位' };

  overflow = { visible: '不裁剪', hidden: '裁剪内容', scroll: '裁剪出现滚动', auto: '超出则出现滚动' };

  render() {
    const { ...props } = this.props;
    const { value } = props;
    ['value', 'font'].map(key => delete props[key]);
    return (
      <Panel {...props}>
        <Row gutter={8}>
          <Col span={4}>
            裁剪
          </Col>
          <Col span={20}>
            <Select
              style={{ width: '100%' }}
              value={value.overflow || 'visible'}
              size="small"
              onChange={(e) => {
                this.onChange('overflow', e);
              }}
              dropdownMatchSelectWidth={false}
              dropdownClassName="editor-list-dropdown"
            >
              {getOption(this.overflow)}
            </Select>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4}>
            宽度
          </Col>
          <Col span={8}>
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
          <Col span={4}>
            高度
          </Col>
          <Col span={8}>
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
        <RowHelp title="定位" help={<div>
          请选择当前相应的定位，如为绝对定位，请开启父级的相对定位，否则将以有相对定位的顶级为定位。</div>}
        >
          <Select
            style={{ width: '100%' }}
            value={value.position || 'static'}
            size="small"
            onChange={(e) => {
              this.onChange('position', e);
            }}
            dropdownMatchSelectWidth={false}
            dropdownClassName="editor-list-dropdown"
          >
            {getOption(this.pos)}
          </Select>
        </RowHelp>
        <Row >
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
        </Row>
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
