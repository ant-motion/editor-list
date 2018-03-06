import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';

const Panel = Collapse.Panel;

export default class EditorClassName extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    classNameArray: PropTypes.array,
    header: PropTypes.string,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    header: '样式编辑',
    value: '',
    onChange: () => {
    },
  };

  state = {
    dropdownShow: false,
  }

  onChange = (value) => {
    this.props.onChange(value);
  }

  onClick = ({ key }) => {
    this.props.onChange(key);
  }

  render() {
    const { ...props } = this.props;
    const { value, classNameArray, placeholder } = props;
    const menuChild = classNameArray.filter(c => c && c.indexOf('editor_css-') === -1)
      .map(key => <Menu.Item key={key}>{key}</Menu.Item>);
    const menu = (
      <Menu onClick={this.onClick}>
        {menuChild}
      </Menu>
    );
    ['classNameArray', 'value', 'onChange'].map(key => delete props[key]);

    return (
      <Panel {...props}>
        <Row gutter={8}>
          <Col span={4}>名称</Col>
          <Col span={17}>
            <Dropdown
              overlay={menu}
              overlayClassName="editor-list-dropdown"
              getPopupContainer={node => node.parentNode}
            >
              <Input
                size="small"
                value={value}
                onChange={(e) => {
                  const css = e.target.value;
                  this.onChange(css);
                }}
                onMouseEnter={this.onHover}
                onMouseLeave={this.onLeave}
                placeholder={placeholder}
              />
            </Dropdown>
          </Col>
          <Col span={3}>
            <Tooltip
              placement="topRight"
              arrowPointAtCenter
              title={<span>自定义或选择当前样式编辑</span>}
            >
              <Icon type="question-circle" />
            </Tooltip>
          </Col>
        </Row>
      </Panel>
    );
  }
}

EditorClassName.componentName = 'EditorClassName';
