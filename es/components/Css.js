import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/es/collapse';
import 'codemirror/mode/css/css.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import CodeMirror from './common/CodeMirror';

var Panel = Collapse.Panel;

var EditorCss = function (_Component) {
  _inherits(EditorCss, _Component);

  function EditorCss() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditorCss);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorCss.__proto__ || Object.getPrototypeOf(EditorCss)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (value) {
      _this.props.onChange(value.replace(/{\n|\n}|{|}/g, ''));
    }, _this.onKeyUp = function (cm, event) {
      if (!cm.state.completionActive && (event.key.match(/[a-z]/ig) && event.key.length === 1 || event.keyCode === 32)) {
        cm.showHint();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditorCss, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = _objectWithoutProperties(this.props, []);

      var value = props.value;

      ['defaultData', 'onChange'].map(function (key) {
        return delete props[key];
      });
      var newValue = '{\n' + value + '\n}';
      return React.createElement(
        Panel,
        props,
        React.createElement(CodeMirror, {
          value: newValue,
          options: {
            mode: { name: 'css', globalVars: true },
            theme: 'ambiance'
          },
          onKeyUp: this.onKeyUp,
          onChange: function onChange(e, metadata, v) {
            if (v.replace(/\s+/g, '') !== newValue.replace(/\s+/g, '')) {
              _this2.onChange(v);
            }
          }
        })
      );
    }
  }]);

  return EditorCss;
}(Component);

EditorCss.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  cssName: PropTypes.string,
  header: PropTypes.string
};
EditorCss.defaultProps = {
  header: '样式代码编辑',
  value: '',
  onChange: function onChange() {}
};
export default EditorCss;


EditorCss.componentName = 'EditorCss';