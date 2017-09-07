import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';

export default class RowHelp extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    help: PropTypes.any,
    children: PropTypes.any,
  };

  static defaultProps = {
    title: '',
    help: '',
  };

  render() {
    const { ...props } = this.props;
    ['title', 'help'].map(key => delete props[key]);
    return (
      <Row gutter={8} {...props}>
        <Col span={4}>
          {this.props.title}
        </Col>
        <Col span={17}>
          {this.props.children}
        </Col>
        <Col span={3}>
          <Tooltip placement="topRight" arrowPointAtCenter title={this.props.help}>
            <Icon type="question-circle" />
          </Tooltip>
        </Col>
      </Row>
    );
  }
}
