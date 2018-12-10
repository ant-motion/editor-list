import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tag from 'antd/lib/tag';

const Panel = Collapse.Panel;

const { CheckableTag } = Tag;

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
    const { value, classNameArray, editClassName } = props;
    ['value', 'onChange'].map(key => delete props[key]);
    return (
      <Panel {...props}>
        <Row gutter={8}>
          <Col span={6}>
            专属样式
          </Col>
        </Row>
        <Row gutter={8}>
          <Col>
            <CheckableTag
              key={editClassName}
              onChange={() => {
                this.onChange(editClassName);
              }}
              checked={value === editClassName}
            >
              {editClassName}
            </CheckableTag>
          </Col>
        </Row>
        {classNameArray.length && [
          (<Row gutter={8} key="name">
            <Col span={24}>标签上其它样式编辑</Col>
          </Row>),
          (
          <Row gutter={8} key="select">
              <Col span={18}>
                {classNameArray.map(key => {
                  return (
                    <CheckableTag
                      key={key}
                      onChange={() => {
                        this.onChange(key);
                      }}
                      checked={value === key}
                    >
                      {key}
                    </CheckableTag>
                  );
                })}
              </Col>
            </Row>
          ),
        ]}
      </Panel>
    );
  }
}

EditorClassName.componentName = 'EditorClassName';
