import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import InputNumber from 'antd/lib/input-number';
import Tooltip from 'antd/lib/tooltip';
import Radio from 'antd/lib/radio';
import AntIcon from 'antd/lib/icon';
import { TweenOneGroup } from 'rc-tween-one';

import Icon from './common/Icon';
import AutoComplete from './common/AutoComplete';
import RowHelp from './common/RowHelp';
import BoxModel from './common/BoxModel';
import { getOption, getParentNode } from '../utils';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
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
    const { value, locale, ...props } = this.props;
    const posChild = value.position !== 'static' ? (
      <div key="pos" style={{ overflow: 'hidden' }}>
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
        />
        <Row gutter={8}>
          <Col span={4} offset={5}>
            zIndex
              </Col>
          <Col span={7}>
            <InputNumber
              min={0}
              size="small"
              style={{ width: '100%' }}
              value={value.zIndex}
              onChange={(e) => {
                this.onChange('zIndex', e);
              }}
            />
          </Col>
          <Col span={3}>
            <Tooltip arrowPointAtCenter title={locale.zIndex}>
              <AntIcon type="question-circle" />
            </Tooltip>
          </Col>
        </Row>
      </div>
    ) : null;
    const floatChild = value.position === 'static' ? (
      <div key="float" style={{ overflow: 'hidden' }}>
        <Row gutter={8}>
          <Col span={3}>
            <Icon type="float" prompt={locale.float} />
          </Col>
          <Col span={21}>
            <RadioGroup
              value={value.float}
              size="small"
              onChange={(e) => {
                console.log(e)
                this.onChange('float', e.target.value);
              }}
            >
              {Object.keys(locale.floatSelect).map(key => (
                <RadioButton value={key} key={key}>
                  <Icon type={key === 'none' ? 'float-close' : `float-${key}`} prompt={locale.floatSelect[key]} />
                </RadioButton>
              ))}
            </RadioGroup>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={3}>
            <Icon type="minus-circle" prompt={locale.clear} />
          </Col>
          <Col span={21}>
            <RadioGroup
              value={value.clear}
              size="small"
              onChange={(e) => {
                console.log(e)
                this.onChange('clear', e.target.value);
              }}
            >
              {Object.keys(locale.clearSelect).map(key => (
                <RadioButton value={key} key={key}>
                  <Icon type={key === 'none' ? 'float-close' : `clear-${key}`} prompt={locale.clearSelect[key]} />
                </RadioButton>
              ))}
            </RadioGroup>
          </Col>
        </Row>
      </div>) : null;
    return (
      <Panel {...props} header={props.header || locale.header}>
        <Row gutter={8}>
          <Col span={3}>
            <Icon type="overflow" prompt={locale.overflow} />
          </Col>
          <Col span={21}>
            <Select
              style={{ width: '100%' }}
              value={value.overflow}
              size="small"
              onChange={(e) => {
                this.onChange('overflow', e);
              }}
              getPopupContainer={node => getParentNode(node, 'editor-list')}
              dropdownMatchSelectWidth={false}
              dropdownClassName="editor-list-dropdown"
            >
              {getOption(locale.overflowSelect, true)}
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
        <RowHelp
          title={<Icon type="position" prompt={locale.position} />}
          help={locale.position_help}
        >
          <Select
            style={{ width: '100%' }}
            value={value.position}
            size="small"
            onChange={(e) => {
              this.onChange('position', e);
            }}
            getPopupContainer={node => getParentNode(node, 'editor-list')}
            dropdownMatchSelectWidth={false}
            dropdownClassName="editor-list-dropdown"
          >
            {getOption(locale.positionSelect, true)}
          </Select>
        </RowHelp>
        <TweenOneGroup
          enter={{ height: 0, type: 'from', duration: 300, ease: 'easeInOutCirc' }}
          leave={{ height: 0, duration: 300, ease: 'easeInOutCirc' }}
          style={{ overflow: 'hidden' }}
        >
          {floatChild}
        </TweenOneGroup>
        <TweenOneGroup
          enter={{ height: 0, type: 'from', duration: 300, ease: 'easeInOutCirc' }}
          leave={{ height: 0, duration: 300, ease: 'easeInOutCirc' }}
          style={{ overflow: 'hidden' }}
        >
          {posChild}
        </TweenOneGroup>
      </Panel>
    );
  }
}

EditorInterface.componentName = 'EditorInterface';
