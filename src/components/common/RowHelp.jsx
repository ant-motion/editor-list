import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';

export default (props) => {
  const { title, help, children } = props
  return (
    <Row gutter={8} {...props}>
      <Col span={3}>
        {title}
      </Col>
      <Col span={18}>
        {children}
      </Col>
      <Col span={3}>
        <Tooltip placement="topRight" arrowPointAtCenter title={help}>
          <Icon type="question-circle" />
        </Tooltip>
      </Col>
    </Row>
  );
}