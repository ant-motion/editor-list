import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import TweenOne from 'rc-tween-one';
import AutoComplete from './common/AutoComplete';
import SelectInput from './common/SelectInput';
import { getOption, getOptionArray, getRandomKey, removeMultiEmpty } from '../utils';

const Panel = Collapse.Panel;

const TweenOneGroup = TweenOne.TweenOneGroup;

const nameSource = ['all', 'transform', 'background', 'border', 'color',
  'opacity', 'width', 'height', 'margin', 'padding', 'top', 'right',
  'bottom', 'left', 'box-shadow', 'text-shadow'];

const easeSource = {
  ease: '缓动',
  'ease-in': '前',
  'ease-out': '后',
  'ease-in-out': '前后',
  'cubic-bezier(0.08, 0.82, 0.17, 1)': 'circ 后',
  'cubic-bezier(0.6, 0.04, 0.98, 0.34)': 'circ 前',
  'cubic-bezier(0.78, 0.14, 0.15, 0.86)': 'circ 前后',
};

export default class EditorTransition extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    header: PropTypes.string,
  };

  static defaultProps = {
    header: '过渡',
    value: '',
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    const values = this.props.value.split(/(?<=[^0-9]),/g).map(c => c.trim());
    let data = values.filter(str =>
      (str && str !== 'all 0s ease 0s' && str !== 'all 0s ease'))
      .map(str => {
        const d = str.split(/(?<=[^,])\s+/g);
        return ({ key: getRandomKey(), name: d[0], duration: d[1], ease: d[2], delay: d[3] });
      });
    data = data.length ? data : [{ key: getRandomKey() }];
    this.state = {
      data,
    };
  }

  onClick = () => {
    const data = this.state.data;
    data.push({ key: getRandomKey() });
    this.setState({
      data,
    });
  }

  onChange = (key, i, value) => {
    const data = this.state.data;
    const currentData = data[i];
    currentData[key] = value;
    this.setData(data);
  }

  setData = (data) => {
    this.setState({
      data,
    }, () => {
      let value = data.length ? '' : 'none';
      data.forEach(d => {
        if (d.name) {
          value += `${value ? ', ' : ''}${removeMultiEmpty(
            `${d.name} ${d.duration || '0s'} ${d.ease || 'ease'}${d.delay ? ` ${d.delay}` : ''}`
          )}`;
        }
      });
      if (value) {
        value += ';';
      }
      this.props.onChange('transition', value);
    });
  }

  getChildren = () => (
    this.state.data.map((data, i) => (
      (<Row gutter={8} key={data.key}>
        <Col span={6}>
          <SelectInput
            style={{ width: '100%' }}
            value={data.name || ''}
            size="small"
            onChange={(e) => {
              this.onChange('name', i, e);
            }}
          >
            {getOptionArray(nameSource)}
          </SelectInput>
        </Col>
        <Col span={5}>
          <AutoComplete
            dataSource={['s', 'ms']}
            style={{ width: '100%' }}
            value={data.duration || ''}
            onChange={(e) => {
              this.onChange('duration', i, e);
            }}
          /></Col>
        <Col span={6}>
          <SelectInput
            style={{ width: '100%' }}
            value={data.ease || ''}
            dropdownStyle={{ width: 104 }}
            onChange={(e) => {
              this.onChange('ease', i, e);
            }}
          >
            {getOption(easeSource)}
          </SelectInput>
        </Col>
        <Col span={5}>
          <AutoComplete
            dataSource={['s', 'ms']}
            style={{ width: '100%' }}
            value={data.delay || ''}
            placement="bottomRight"
            onChange={(e) => {
              this.onChange('delay', i, e);
            }}
          />
        </Col>
        <Col span={2}>
          <div
            onClick={() => {
              this.removeClick(i);
            }}
            className="icon-button"
          >
            <Icon type="close-circle" />
          </div>
        </Col>
      </Row>)
    ))
  );

  removeClick = (i) => {
    const data = this.state.data;
    data.splice(i, 1);
    this.setData(data);
  }

  render() {
    const { ...props } = this.props;
    ['value', 'font'].map(key => delete props[key]);
    return (
      <Panel {...props}>
        <Row gutter={8}>
          <Col span={6}>
            名称
          </Col>
          <Col span={5}>时间</Col>
          <Col span={6}>缓动</Col>
          <Col span={5}>延时</Col>
        </Row>
        <TweenOneGroup
          appear={false}
          enter={{
            height: 0,
            marginBottom: 0,
            opacity: 0,
            type: 'from',
            duration: 300,
            ease: 'easeOutCirc',
          }}
          leave={{ height: 0, marginBottom: 0, opacity: 0, duration: 300, ease: 'easeOutCirc' }}
          className="editor-transition-tween"
        >
          {this.getChildren()}
        </TweenOneGroup>
        <a onClick={this.onClick} className="add-button"><Icon type="plus" /></a>
      </Panel>
    );
  }
}

EditorTransition.componentName = 'EditorTransition';
