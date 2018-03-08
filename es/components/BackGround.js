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
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import SelectInput from './common/SelectInput';
import Color from './common/Color';
import RowHelp from './common/RowHelp';
import Radio from 'antd/lib/radio';
import { getOption, getOptionArray, getRadioButton, getParentNode } from '../utils';

var RadioGroup = Radio.Group;

var Panel = Collapse.Panel;

var EditorBg = function (_Component) {
  _inherits(EditorBg, _Component);

  function EditorBg() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditorBg);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorBg.__proto__ || Object.getPrototypeOf(EditorBg)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (key, v) {
      var value = _extends({}, _this.props.value, _defineProperty({}, key, v));
      _this.props.onChange('background', value);
    }, _this.repeat = { repeat: '重复', 'repeat-x': '横向重复', 'repeat-y': '竖向重复', 'no-repeat': '不重复' }, _this.position = ['center', 'center left', 'center right', 'top', 'top left', 'top right', 'bottom', 'bottom left', 'bottom right'], _this.size = ['100%', '100% 50%', 'auto', 'contain', 'cover'], _this.attachment = ['scroll', 'fixed'], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditorBg, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = _objectWithoutProperties(this.props, []);

      var value = props.value;

      ['value', 'onChange', 'font'].map(function (key) {
        return delete props[key];
      });
      return React.createElement(
        Panel,
        props,
        React.createElement(Color, {
          onChange: function onChange(e) {
            _this2.onChange('color', e);
          },
          color: value.color
        }),
        React.createElement(
          Row,
          { gutter: 8 },
          React.createElement(
            Col,
            { span: 4 },
            '\u56FE\u7247'
          ),
          React.createElement(
            Col,
            { span: 20 },
            React.createElement(Input, {
              value: value.image || '',
              onChange: function onChange(e) {
                var v = e.target.value;
                _this2.onChange('image', v);
              },
              size: 'small',
              placeholder: '\u6DFB\u52A0\u56FE\u7247'
            })
          )
        ),
        React.createElement(
          Row,
          { gutter: 8 },
          React.createElement(
            Col,
            { span: 4 },
            '\u91CD\u590D'
          ),
          React.createElement(
            Col,
            { span: 20 },
            React.createElement(
              Select,
              {
                style: { width: '100%' },
                value: value.repeat || 'repeat',
                size: 'small',
                onChange: function onChange(e) {
                  _this2.onChange('repeat', e);
                },
                getPopupContainer: function getPopupContainer(node) {
                  return getParentNode(node, 'editor-list');
                },
                dropdownMatchSelectWidth: false,
                dropdownClassName: 'editor-list-dropdown'
              },
              getOption(this.repeat)
            )
          )
        ),
        React.createElement(
          RowHelp,
          { title: '\u4F4D\u7F6E', help: React.createElement(
              'div',
              null,
              '\u53EF\u8BBE\u7F6E\u81EA\u5B9A\u4E49\u503C(x, y)',
              React.createElement('br', null),
              '\u5982: 50px 100px'
            ) },
          React.createElement(
            SelectInput,
            {
              style: { width: '100%' },
              value: value.position || '',
              size: 'small',
              onChange: function onChange(e) {
                _this2.onChange('position', e);
              }
            },
            getOptionArray(this.position)
          )
        ),
        React.createElement(
          RowHelp,
          { title: '\u5C3A\u5BF8', help: React.createElement(
              'div',
              null,
              '\u53EF\u8BBE\u7F6E\u81EA\u5B9A\u4E49\u503C(x, y)',
              React.createElement('br', null),
              '\u5982: 50px 100px'
            ) },
          React.createElement(
            SelectInput,
            {
              style: { width: '100%' },
              value: value.size || '',
              size: 'small',
              onChange: function onChange(e) {
                _this2.onChange('size', e);
              }
            },
            getOptionArray(this.size)
          )
        ),
        React.createElement(
          Row,
          { gutter: 8 },
          React.createElement(
            Col,
            { span: 4 },
            '\u7C7B\u578B'
          ),
          React.createElement(
            Col,
            { span: 20 },
            React.createElement(
              RadioGroup,
              {
                value: value.attachment || 'scroll',
                size: 'small',
                onChange: function onChange(e) {
                  var v = e.target.value;
                  _this2.onChange('attachment', v);
                }
              },
              getRadioButton(this.attachment)
            )
          )
        )
      );
    }
  }]);

  return EditorBg;
}(Component);

EditorBg.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.object
};
EditorBg.defaultProps = {
  className: 'editor-bg',
  header: '背景',
  value: {
    color: null,
    image: '',
    repeat: 'repeat',
    position: 'center',
    size: 'contain',
    attachment: 'scroll'
  },
  onChange: function onChange() {}
};


EditorBg.componentName = 'EditorBackGround';

export default EditorBg;