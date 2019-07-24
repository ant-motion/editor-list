import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TweenOneGroup } from 'rc-tween-one';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Collapse from 'antd/lib/collapse';
import Radio from 'antd/lib/radio';
import Icon from './common/Icon';


const Panel = Collapse.Panel;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Layout extends Component {
  static propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    font: PropTypes.array,
    value: PropTypes.object,
    onChange: PropTypes.func,
    locale: PropTypes.object,
  };

  static defaultProps = {
    className: 'editor-layout',
    value: {
      display: 'block',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    onChange: () => {
    },
  };
  onChange = (e, key) => {
    const type = e.target.value;
    const { value } = this.props;
    value[key] = type
    this.props.onChange('layout', value);
  }

  getFlexChildToRender = () => {
    const { locale, value } = this.props;
    const { flexSelect, flexName } = locale;
    const getItemToChild = (data, $key) => {
      return Object.keys(data).map(key => (
        <RadioButton value={key} className={`${this.props.className}-radio-button`} key={key}>
          <Icon type={`${$key}-${key}`} prompt={data[key]} />
        </RadioButton>
      ));
    }
    const rowItem = Object.keys(flexSelect).map(key => {
      const item = flexSelect[key];
      const nameObj = flexName[key];
      return (
        <Row gutter={8} key={key}>
          <Col span={3}><Icon type={nameObj.icon} prompt={nameObj.name} /></Col>
          <Col span={21}>
            <RadioGroup
              value={value[key]}
              size="small"
              onChange={(e) => {
                this.onChange(e, key);
              }}
            >
              {getItemToChild(item, key)}
            </RadioGroup>
          </Col>
        </Row>
      )
    });
    return (
      <div key="flex" style={{ overflow: 'hidden' }}>
        {rowItem}
      </div>
    )
  }
  render() {
    const { value, locale, header, ...props } = this.props;
    const radioChildrenToRender = (
      <RadioGroup
        value={value.display}
        size="small"
        onChange={(e) => {
          this.onChange(e, 'display');
        }}
      >
        {Object.keys(locale.displaySelect).map(key => (
          <RadioButton value={key} className={`${this.props.className}-radio-button`} key={key}>
            <Icon type={key === 'none' ? 'eye-invisible' : key} prompt={locale.displaySelect[key]} />
          </RadioButton>
        ))}
      </RadioGroup>);
    const flexChild = value.display === 'flex' ? this.getFlexChildToRender() : null;
    return (
      <Panel {...props} header={header || locale.header}>
        <Row gutter={8}>
          <Col>{locale.name}</Col>
        </Row>
        <Row gutter={8}>
          <Col>
            {radioChildrenToRender}
          </Col>
        </Row>
        <TweenOneGroup
          enter={{ height: 0, type: 'from', duration: 300, ease: 'easeInOutCirc' }}
          leave={{ height: 0, duration: 300, ease: 'easeInOutCirc' }}
          style={{ overflow: 'hidden'}}
        >
          {flexChild}
        </TweenOneGroup>
      </Panel>
    );
  }
}
export default Layout;