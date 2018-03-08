import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/es/collapse';
import Font from './components/Font';
import BackGround from './components/BackGround';
import Border from './components/Border';
import Interface from './components/Interface';
import Margin from './components/Margin';
import Shadow from './components/Shadow';
import Css from './components/Css';
import Transition from './components/Transition';
import State from './components/State';
import ClassName from './components/ClassName';
import { styleInUse, toArrayChildren, convertData, convertDefaultData, convertBorderData, convertShadowData, toCss, getRandomKey, removeMultiEmpty, removeEditClassName, getDomCssRule, getParentClassName, mobileTitle } from './utils';

var stateSort = { 'default': 0, hover: 1, focus: 2, active: 3 };

var EditorList = function (_Component) {
  _inherits(EditorList, _Component);

  function EditorList(props) {
    _classCallCheck(this, EditorList);

    var _this = _possibleConstructorReturn(this, (EditorList.__proto__ || Object.getPrototypeOf(EditorList)).call(this, props));

    _initialiseProps.call(_this);

    _this.select = {};
    _this.defaultDataStyle = {};
    _this.defaultData = {};
    _this.cssString = '';
    _this.state = _this.setDefaultState(props.editorElem, props);
    _this.setEditorElemClassName();
    return _this;
  }

  _createClass(EditorList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (this.props.editorElem !== nextProps.editorElem) {
        this.defaultDataStyle = {};
        this.defaultData = {};
        this.setState(this.setDefaultState(nextProps.editorElem, nextProps), function () {
          _this2.setEditorElemClassName();
        });
      }
      if (this.props.isMobile !== nextProps.isMobile) {
        var domStyle = this.getDefaultValue(nextProps.editorElem, nextProps.isMobile);
        this.defaultDataStyle = domStyle;
        var value = this.getDefaultData(domStyle[this.state.classState]);
        this.defaultData = value;
        this.setState({ value: value });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = _objectWithoutProperties(this.props, []);

      ['useClassName', 'editorElem', 'onChange'].map(function (key) {
        return delete props[key];
      });
      return React.createElement(
        Collapse,
        _extends({ bordered: false }, props),
        this.getChildren(props)
      );
    }
  }]);

  return EditorList;
}(Component);

EditorList.propTypes = {
  className: PropTypes.string,
  defaultActiveKey: PropTypes.any,
  editorElem: PropTypes.any,
  onChange: PropTypes.func,
  useClassName: PropTypes.bool,
  isMobile: PropTypes.bool,
  parentClassNameCanUseTagName: PropTypes.bool,
  parentClassNameLength: PropTypes.number,
  editorDefaultClassName: PropTypes.string
};
EditorList.defaultProps = {
  className: 'editor-list',
  defaultActiveKey: ['EditorClassName'],
  useClassName: true,
  onChange: function onChange() {},
  isMobile: false,
  parentClassNameCanUseTagName: true,
  parentClassNameLength: 2,
  editorDefaultClassName: 'editor_css'
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onStateChange = function (key, data) {
    if (key === 'cursor') {
      var value = {
        cursor: data === 'auto' ? null : data
      };
      _this3.onChange('state', value);
    } else {
      _this3.onChangeCssState(data);
    }
  };

  this.onChangeCssState = function (classState) {
    var _props = _this3.props,
        editorDefaultClassName = _props.editorDefaultClassName,
        editorElem = _props.editorElem,
        isMobile = _props.isMobile,
        onChange = _props.onChange;

    var domStyle = _this3.getDefaultValue(editorElem, isMobile);
    var value = _this3.getDefaultData(domStyle[classState]);
    _this3.defaultData = _this3.getDefaultData(_this3.defaultDataStyle[classState]);
    _this3.setState({
      value: value,
      classState: classState
    });
    var _state = _this3.state,
        cssName = _state.cssName,
        css = _state.css,
        mobileCss = _state.mobileCss;

    onChange({
      className: _this3.parentClassName + ' .' + cssName,
      parentClassName: _this3.parentClassName,
      cssName: cssName,
      value: value,
      css: css,
      mobileCss: mobileCss,
      cssString: _this3.cssString,
      classNameInDefault: !!_this3.classNameInDefaultDomClass(cssName, editorDefaultClassName)
    });
  };

  this.onClassNameChange = function (cssName) {
    var _props2 = _this3.props,
        editorElem = _props2.editorElem,
        editorDefaultClassName = _props2.editorDefaultClassName;

    editorElem.className = removeEditClassName(editorElem.className, editorDefaultClassName);
    var rand = editorElem.getAttribute('data-editor_css_rand');
    var name = cssName || rand;
    editorElem.setAttribute('data-editor_css_name', name);
    _this3.setState({
      cssName: name
    }, _this3.setCssToDom);
  };

  this.onCssChange = function (cssValue) {
    var _props3 = _this3.props,
        editorElem = _props3.editorElem,
        isMobile = _props3.isMobile;
    var _state2 = _this3.state,
        css = _state2.css,
        classState = _state2.classState,
        mobileCss = _state2.mobileCss;

    var myCss = isMobile ? mobileCss : css;
    _this3.setState(_defineProperty({}, isMobile ? 'mobileCss' : 'css', _extends({}, myCss, _defineProperty({}, classState, cssValue))), function () {
      _this3.setCssToDom();
            var domStyle = _this3.getDefaultValue(editorElem, isMobile);
      var value = _this3.getDefaultData(domStyle[classState]);
      _this3.setState({
        value: value
      });
    });
  };

  this.onChange = function (key, data) {
    var _state3 = _this3.state,
        value = _state3.value,
        classState = _state3.classState,
        css = _state3.css,
        mobileCss = _state3.mobileCss;

    var myCss = _this3.props.isMobile ? mobileCss : css;
    var v = _extends({}, value, _defineProperty({}, key, data));
    var newCss = '  ' + toCss(v, _this3.defaultData).replace(/\n/g, '\n  ');
    var currentCss = newCss.split('\n').filter(function (c) {
      return c;
    }).map(function (c) {
      return c.trim();
    });
    var stateCss = myCss[classState];
    if (stateCss) {
      var stateCssArray = stateCss.split('\n').map(function (c) {
        return c.trim();
      }).filter(function (c) {
        return c;
      });
      var currentCssName = currentCss.map(function (str) {
        return str.split(':')[0].trim();
      });
      var stateNewCss = stateCssArray.map(function (str) {
        var cssName = str.split(':')[0].trim();
        return currentCssName.indexOf(cssName) >= 0 || styleInUse[cssName] ? null : str;
      }).filter(function (c) {
        return c;
      });
      newCss = '  ' + (currentCss.join('\n  ') + '\n  ' + stateNewCss.join('\n  ')).trim();
    }
    var state = _defineProperty({
      value: v
    }, _this3.props.isMobile ? 'mobileCss' : 'css', _extends({}, myCss, _defineProperty({}, classState, newCss)));
    _this3.setState(state, _this3.setCssToDom);
  };

  this.getDefaultValue = function (dom, isMobile) {
    var domStyle = {};
    Object.keys(stateSort).forEach(function (key) {
      domStyle[key] = getDomCssRule(dom, isMobile, key === 'default' ? null : key);
    });
    return domStyle;
  };

  this.setCssToDom = function () {
    var _state5 = _this3.state,
        css = _state5.css,
        cssName = _state5.cssName,
        value = _state5.value,
        mobileCss = _state5.mobileCss;
    var _props4 = _this3.props,
        editorElem = _props4.editorElem,
        onChange = _props4.onChange,
        editorDefaultClassName = _props4.editorDefaultClassName;

    if (cssName) {
      _this3.setClassToDom();
      _this3.setEditorElemClassName();
    } else {
      var str = css['default'];
      editorElem.style.cssText = str.substring(str.indexOf('{') + 1, str.indexOf('}'));
    }
    onChange({
      className: _this3.parentClassName + ' .' + cssName,
      parentClassName: _this3.parentClassName,
      cssName: cssName,
      value: value,
      css: css,
      mobileCss: mobileCss,
      cssString: _this3.cssString,
      classNameInDefault: !!_this3.classNameInDefaultDomClass(cssName, editorDefaultClassName)
    });
  };

  this.setClassToDom = function () {
    var editorDefaultClassName = _this3.props.editorDefaultClassName;
    var _state6 = _this3.state,
        css = _state6.css,
        mobileCss = _state6.mobileCss,
        cssName = _state6.cssName;

    var cssStr = _this3.cssObjectToString(css, cssName);
    cssStr += '\n' + mobileTitle + '\n';
    cssStr += _this3.cssObjectToString(mobileCss, cssName);
    cssStr += '\n}';
    _this3.cssString = cssStr;
        var noDefault = !_this3.classNameInDefaultDomClass(cssName, editorDefaultClassName);
    var style = _this3.ownerDocument.querySelector('#' + _this3.dataId);
        if (style) {
      style.remove();
    }
    style = _this3.createStyle(noDefault);
    style.innerHTML = cssStr;
  };

  this.setEditorElemClassName = function () {
    var _props5 = _this3.props,
        editorElem = _props5.editorElem,
        editorDefaultClassName = _props5.editorDefaultClassName;
    var cssName = _this3.state.cssName;


    if (!_this3.classNameInDefaultDomClass(cssName, editorDefaultClassName)) {
      editorElem.className = removeMultiEmpty(_this3.defaultDomClass + ' ' + cssName + '-' + editorDefaultClassName).trim();
    }
  };

  this.setDefaultState = function (dom, props) {
    _this3.ownerDocument = dom.ownerDocument;
    var classState = 'default';
    var domStyle = _this3.getDefaultValue(dom, props.isMobile);
    var value = _this3.getDefaultData(domStyle[classState]);
    var cssName = _this3.getClassName(props);
    var style = _this3.ownerDocument.querySelector('#' + _this3.dataId);
    if (dom.getAttribute('data-editor_css_id') && style) {
      var prev = style.previousElementSibling;
      style.remove();
      var defaultStyle = _this3.getDefaultValue(dom, props.isMobile);
      _this3.defaultDataStyle = defaultStyle;
      _this3.defaultData = _this3.getDefaultData(defaultStyle[classState]);
      var noDefault = !_this3.classNameInDefaultDomClass(cssName, props.editorDefaultClassName);
      _this3.ownerDocument[noDefault ? 'body' : 'head'].insertBefore(style, prev.nextSibling);
    } else {
      _this3.defaultDataStyle = domStyle;
      _this3.defaultData = value;
    }
    _this3.defaultDomClass = props.editorElem.className ? removeEditClassName(props.editorElem.className, props.editorDefaultClassName) : '';
    var css = _this3.getDefaultCssData(cssName);
    return {
      value: value,
      css: css.css,
      mobileCss: css.mobileCss,
      cssName: cssName,
      classState: classState
    };
  };

  this.getClassName = function (props) {
    var editorElem = props.editorElem,
        parentClassNameCanUseTagName = props.parentClassNameCanUseTagName,
        parentClassNameLength = props.parentClassNameLength,
        editorDefaultClassName = props.editorDefaultClassName;

    var random = editorElem.getAttribute('data-editor_css_rand') || getRandomKey();
    _this3.dataId = editorElem.getAttribute('data-editor_css_id') || editorDefaultClassName + '-' + random;
    editorElem.setAttribute('data-editor_css_id', _this3.dataId);
    editorElem.setAttribute('data-editor_css_rand', random);
    var className = editorElem.getAttribute('data-editor_css_name') || '' + random;
    editorElem.setAttribute('data-editor_css_name', className);

    _this3.parentClassName = getParentClassName(editorElem, parentClassNameCanUseTagName, parentClassNameLength);
    return _this3.props.useClassName ? className : '';
  };

  this.getDefaultCssData = function () {
    var css = {
      css: {
        'default': '',
        hover: '',
        active: '',
        focus: ''
      },
      mobileCss: {
        'default': '',
        active: '',
        focus: ''
      }
    };
    if (_this3.props.useClassName) {
      var setCssDataToDefault = function setCssDataToDefault(content, currentCss) {
        content.split('}').filter(function (c) {
          return c.trim();
        }).forEach(function (c) {
          var cssContentArray = c.split('{');
          var state = cssContentArray[0].split(':')[1];
          var key = state ? state.trim() : 'default';
          var cssContent = cssContentArray[1].trim();
          if (cssContent) {
            currentCss[key] = '  ' + cssContent.split(';').filter(function (b) {
              return b;
            }).map(function (d) {
              return d.trim() + ';';
            }).join('\n  ').trim();
          }
        });
      };
      var defaultClass = _this3.ownerDocument.querySelector('#' + _this3.dataId);
      if (defaultClass && defaultClass.tagName === 'STYLE') {
        var content = defaultClass.innerText;
        content.split(mobileTitle).forEach(function (item, i) {
          setCssDataToDefault(item, css[i ? 'mobileCss' : 'css']);
        });
      }
    }
    return css;
  };

  this.getDefaultData = function (style) {
    var borderBool = style.borderStyle !== 'none' && style.borderColor !== '0px';
    return {
      state: {
        cursor: style.cursor
      },
      font: {
        family: style.fontFamily,
        size: style.fontSize,
        weight: convertData(style.fontWeight),
        lineHeight: convertData(style.lineHeight),
        color: convertDefaultData(style.color),
        letterSpacing: convertData(style.letterSpacing),
        align: convertDefaultData(style.textAlign),
        decoration: convertData(style.textDecoration)
      },
      'interface': {
        overflow: convertDefaultData(style.overflow),
        width: convertData(style.width),
        maxWidth: convertData(style.maxWidth),
        minWidth: convertData(style.minWidth),
        height: convertData(style.height),
        maxHeight: convertData(style.maxHeight),
        minHeight: convertData(style.minHeight),
        position: convertDefaultData(style.position),
        top: convertDefaultData(convertData(style.top, true)),
        right: convertDefaultData(convertData(style.right, true)),
        bottom: convertDefaultData(convertData(style.bottom, true)),
        left: convertDefaultData(convertData(style.left, true))
      },
      background: {
        color: convertDefaultData(style.backgroundColor),
        image: (convertData(style.backgroundImage) || '').replace(/^url\(|\"|\)?/ig, ''),
        repeat: convertDefaultData(style.backgroundRepeat),
        position: convertDefaultData(style.backgroundPosition),
        size: convertDefaultData(style.backgroundSize),
        attachment: convertDefaultData(style.backgroundAttachment)
      },
      border: {
        style: convertBorderData(style.borderStyle, style.borderWidth),
        color: borderBool && convertBorderData(style.borderColor, style.borderWidth) || null,
        width: convertBorderData(style.borderWidth),
        radius: convertBorderData(style.borderRadius, null, true)
      },
      margin: {
        margin: convertBorderData(style.margin),
        padding: convertBorderData(style.padding)
      },
      shadow: {
        boxShadow: convertShadowData(style.boxShadow),
        textShadow: convertShadowData(style.textShadow)
      },
      transition: style.transition
    };
  };

  this.getChildren = function (props) {
    var _state7 = _this3.state,
        value = _state7.value,
        css = _state7.css,
        mobileCss = _state7.mobileCss,
        cssName = _state7.cssName,
        classState = _state7.classState;

    var myCss = props.isMobile ? mobileCss : css;
    var stateValue = { cursor: value.state.cursor, classState: classState };
    var classNameArray = _this3.defaultDomClass.split(' ');
    if (props.children) {
      _this3.select = {};
      return toArrayChildren(props.children).map(function (item) {
        var itemProps = _objectWithoutProperties(item.props, []);

        var key = item.type.componentName;
        if (_this3.select[key]) {
          return console.warn('child(' + key + ') component is repeat.');
        }
        _this3.select[key] = true;
        itemProps.key = itemProps.key || key;
        if (key === 'EditorCss') {
          if (!_this3.props.useClassName) {
            return null;
          }
          itemProps.value = myCss[classState];
          itemProps.cssName = cssName;
          itemProps.onChange = _this3.onCssChange;
        } else if (key === 'EditorState') {
          itemProps.showClassState = _this3.props.useClassName;
          itemProps.value = stateValue;
          itemProps.onChange = _this3.onStateChange;
          itemProps.isMobile = _this3.props.isMobile;
        } else if (key === 'EditorClassName') {
          if (!_this3.props.useClassName) {
            return null;
          }
          itemProps.value = cssName;
          itemProps.placeholder = _this3.props.editorDefaultClassName;
          item.classNameArray = classNameArray;
        } else {
          itemProps.onChange = _this3.onChange;
          itemProps.value = value[key.toLocaleLowerCase().replace('editor', '')];
        }
        return cloneElement(item, itemProps);
      }).filter(function (c) {
        return c;
      });
    }
    return [_this3.props.useClassName && React.createElement(ClassName, {
      onChange: _this3.onClassNameChange,
      value: cssName,
      classNameArray: classNameArray,
      placeholder: _this3.props.editorDefaultClassName,
      key: 'EditorClassName'
    }), React.createElement(State, {
      onChange: _this3.onStateChange,
      key: 'EditorState',
      showClassState: _this3.props.useClassName,
      value: stateValue,
      isMobile: _this3.props.isMobile
    }), React.createElement(Font, { onChange: _this3.onChange, key: 'EditorFont', value: value.font }), React.createElement(Interface, { onChange: _this3.onChange, key: 'EditorInterface', value: value['interface'] }), React.createElement(BackGround, { onChange: _this3.onChange, key: 'EditorBackGround', value: value.background }), React.createElement(Border, { onChange: _this3.onChange, key: 'EditorBorder', value: value.border }), React.createElement(Margin, { onChange: _this3.onChange, key: 'EditorMargin', value: value.margin }), React.createElement(Shadow, { onChange: _this3.onChange, key: 'EditorShadow', value: value.shadow }), React.createElement(Transition, { onChange: _this3.onChange, key: 'EditorTransition', value: value.transition }), _this3.props.useClassName && React.createElement(Css, {
      onChange: _this3.onCssChange,
      key: 'EditorCss',
      value: myCss[classState],
      cssName: cssName
    })];
  };

  this.cssObjectToString = function (css, name) {
    var cssName = !_this3.classNameInDefaultDomClass(name, _this3.props.editorDefaultClassName) ? name + '-' + _this3.props.editorDefaultClassName : name;
    return Object.keys(css).sort(function (a, b) {
      return stateSort[a] > stateSort[b];
    }).map(function (key) {
      switch (key) {
        case 'default':
          return _this3.parentClassName + ' .' + cssName + ' {\n' + css[key] + '\n}';
        default:
          return _this3.parentClassName + ' .' + cssName + ':' + key + ' {\n' + css[key] + '\n}';
      }
    }).join('\n');
  };

  this.createStyle = function (n) {
    var style = _this3.ownerDocument.createElement('style');
    style.id = _this3.dataId;
    _this3.ownerDocument[n ? 'body' : 'head'].appendChild(style);
    return style;
  };

  this.classNameInDefaultDomClass = function (name, editorDefaultClass) {
    return _this3.defaultDomClass.split(' ').filter(function (key) {
      return key === name || key === name + '-' + editorDefaultClass;
    }).length;
  };
};

EditorList.State = State;
EditorList.Font = Font;
EditorList.BackGround = BackGround;
EditorList.Border = Border;
EditorList.Interface = Interface;
EditorList.Margin = Margin;
EditorList.Shadow = Shadow;
EditorList.Css = Css;
EditorList.Transition = Transition;
export default EditorList;