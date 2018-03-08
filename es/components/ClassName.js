import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
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
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import { getParentNode } from '../utils';

var Panel = Collapse.Panel;

var EditorClassName = function (_Component) {
  _inherits(EditorClassName, _Component);

  function EditorClassName() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditorClassName);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorClassName.__proto__ || Object.getPrototypeOf(EditorClassName)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dropdownShow: false
    }, _this.onChange = function (value) {
      _this.props.onChange(value);
    }, _this.onClick = function (_ref2) {
      var key = _ref2.key;

      _this.props.onChange(key);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditorClassName, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = _objectWithoutProperties(this.props, []);

      var value = props.value,
          classNameArray = props.classNameArray,
          placeholder = props.placeholder;

      var menuChild = classNameArray.filter(function (c) {
        return c && c.indexOf('editor_css-') === -1;
      }).map(function (key) {
        return React.createElement(
          Menu.Item,
          { key: key },
          key
        );
      });
      var menu = React.createElement(
        Menu,
        { onClick: this.onClick },
        menuChild
      );
      ['classNameArray', 'value', 'onChange'].map(function (key) {
        return delete props[key];
      });

      return React.createElement(
        Panel,
        props,
        React.createElement(
          Row,
          { gutter: 8 },
          React.createElement(
            Col,
            { span: 4 },
            '\u540D\u79F0'
          ),
          React.createElement(
            Col,
            { span: 17 },
            React.createElement(
              Dropdown,
              {
                overlay: menu,
                overlayClassName: 'editor-list-dropdown',
                getPopupContainer: function getPopupContainer(node) {
                  return getParentNode(node, 'editor-list');
                }
              },
              React.createElement(Input, {
                size: 'small',
                value: value,
                onChange: function onChange(e) {
                  var css = e.target.value;
                  _this2.onChange(css);
                },
                onMouseEnter: this.onHover,
                onMouseLeave: this.onLeave,
                placeholder: placeholder
              })
            )
          ),
          React.createElement(
            Col,
            { span: 3 },
            React.createElement(
              Tooltip,
              {
                placement: 'topRight',
                arrowPointAtCenter: true,
                title: React.createElement(
                  'span',
                  null,
                  '\u81EA\u5B9A\u4E49\u6216\u9009\u62E9\u5F53\u524D\u6837\u5F0F\u7F16\u8F91'
                )
              },
              React.createElement(Icon, { type: 'question-circle' })
            )
          )
        )
      );
    }
  }]);

  return EditorClassName;
}(Component);

EditorClassName.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  classNameArray: PropTypes.array,
  header: PropTypes.string,
  placeholder: PropTypes.string
};
EditorClassName.defaultProps = {
  header: '样式编辑',
  value: '',
  onChange: function onChange() {}
};
export default EditorClassName;


EditorClassName.componentName = 'EditorClassName';