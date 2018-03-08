import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/es/collapse';
import Radio from 'antd/lib/radio';
import BoxModel from './common/BoxModel';

var Panel = Collapse.Panel;

var RadioButton = Radio.Button;
var RadioGroup = Radio.Group;

var EditorBorder = function (_Component) {
  _inherits(EditorBorder, _Component);

  function EditorBorder(props) {
    _classCallCheck(this, EditorBorder);

    var _this = _possibleConstructorReturn(this, (EditorBorder.__proto__ || Object.getPrototypeOf(EditorBorder)).call(this, props));

    _this.onChange = function (e) {
      var value = _extends({}, _this.props.value, _defineProperty({}, _this.state.key, e));
      _this.props.onChange('border', value);
    };

    _this.getTabs = function () {
      return React.createElement(
        RadioGroup,
        { value: _this.state.key, onChange: _this.radioChange, size: 'small' },
        Object.keys(_this.tags).map(function (key) {
          return React.createElement(
            RadioButton,
            { value: key, key: key, className: 'ant-radio-button-auto-width' },
            _this.tags[key]
          );
        })
      );
    };

    _this.radioChange = function (e) {
      _this.setState({
        key: e.target.value
      });
    };

    _this.keys = ['top', 'right', 'bottom', 'left', 'center'];
    _this.tags = {
      width: '线宽',
      color: '颜色',
      style: '样式',
      radius: '圆角'
    };
    _this.state = {
      key: 'width'
    };
    return _this;
  }

  _createClass(EditorBorder, [{
    key: 'render',
    value: function render() {
      var props = _objectWithoutProperties(this.props, []);

      var value = props.value;

      var key = this.state.key;
      ['value', 'onChange'].map(function (str) {
        return delete props[str];
      });
      return React.createElement(
        Panel,
        props,
        this.getTabs(),
        React.createElement(BoxModel, {
          name: key,
          key: key,
          keys: this.keys,
          value: value[key],
          onChange: this.onChange
        })
      );
    }
  }]);

  return EditorBorder;
}(Component);

EditorBorder.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  header: PropTypes.string
};
EditorBorder.defaultProps = {
  header: '边框',
  value: {
    style: 'none',
    color: '#000',
    width: null,
    radius: null
  },
  onChange: function onChange() {}
};
export default EditorBorder;


EditorBorder.componentName = 'EditorBorder';