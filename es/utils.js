import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _typeof from 'babel-runtime/helpers/typeof';
import React from 'react';
import Select from 'antd/es/select';
import Radio from 'antd/lib/radio';

var Option = Select.Option;

var RadioButton = Radio.Button;

var colorExp = /(#[\d\w]+|\w+\((?:\d+%?(?:,\s)*){3}(?:\d*\.?\d+)?\))/ig;

export var mobileTitle = '@media screen and (max-width: 767px) {';

export var styleInUse = {
  'background-attachment': 1,
  'background-color': 1,
  'background-image': 1,
  'background-repeat': 1,
  'background-position': 1,
  'background-size': 1,
  'border-color': 1,
  'border-radius': 1,
  'border-style': 1,
  'border-width': 1,
  'text-align': 1,
  'text-decoration': 1,
  'letter-spacing': 1,
  'line-height': 1,
  color: 1,
  'font-size': 1,
  'font-family': 1,
  'font-weight': 1,
  bottom: 1,
  left: 1,
  top: 1,
  right: 1,
  position: 1,
  overflow: 1,
  width: 1,
  height: 1,
  'max-height': 1,
  'max-width': 1,
  'min-width': 1,
  'min-height': 1,
  margin: 1,
  padding: 1,
  'box-shadow': 1,
  'text-shadow': 1,
  cursor: 1,
  transition: 1
};

export function toArrayChildren(children) {
  var ret = [];
  React.Children.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
}

export var alphaBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/' + '9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0p' + 'gAAAABJRU5ErkJggg==';

export function isColor(v) {
  return v.match(colorExp);
}

export function getRandomKey() {
  return (Date.now() + Math.random()).toString(36).replace('.', '');
}

export function firstUpperCase(str) {
  return '' + str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

export function removeMultiEmpty(str) {
  return str.replace(/\s+/g, ' ');
}
export var removeEditClassName = function removeEditClassName(t, reClass) {
  return t.split(' ').filter(function (name) {
    return name.indexOf(reClass) === -1;
  }).join(' ');
};

export function getBorderDataToStyle(name, d) {
  var key = firstUpperCase(name);
  if (d && (typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object') {
    var _ref2;

    if (key === 'radius') {
      var _ref;

      return _ref = {}, _defineProperty(_ref, 'borderTopLeft' + key, d.topLeft), _defineProperty(_ref, 'borderTopRight' + key, d.topRight), _defineProperty(_ref, 'borderBottomRight' + key, d.bottomRight), _defineProperty(_ref, 'borderBottomLeft' + key, d.bottomLeft), _ref;
    }
    return _ref2 = {}, _defineProperty(_ref2, 'borderTop' + key, d.top), _defineProperty(_ref2, 'borderRight' + key, d.right), _defineProperty(_ref2, 'borderBottom' + key, d.bottom), _defineProperty(_ref2, 'borderLeft' + key, d.left), _ref2;
  }
  return _defineProperty({}, 'border' + key, d);
}

export function getOption(value) {
  return Object.keys(value).map(function (key) {
    return React.createElement(
      Option,
      { key: key, value: key },
      value[key] + ' - ' + key
    );
  });
}

export function getOptionArray(array) {
  return array.map(function (key) {
    return React.createElement(
      Option,
      { key: key, value: key },
      key
    );
  });
}

export function getRadioButton(array) {
  return array.map(function (key) {
    return React.createElement(
      RadioButton,
      { value: key, key: key, className: 'ant-radio-button-auto-width' },
      key
    );
  });
}

export function getComputedStyle() {
  var _document$defaultView;

  return document.defaultView ? (_document$defaultView = document.defaultView).getComputedStyle.apply(_document$defaultView, arguments) : {};
}

export function convertData(d, b) {
  var c = b ? !d & typeof d !== 'number' || d.indexOf('none') >= 0 || d.indexOf('normal') >= 0 : !d || d.indexOf('none') >= 0 || d === '0px' || d.indexOf('normal') >= 0;
  if (c) {
    return null;
  }
  return d;
}

export function convertDefaultData(d) {
  if (!d || d === 'rgba(0, 0, 0, 0)' || d === 'repeat' || d === '0% 0%' || d === 'auto' || d === 'scroll' || d === 'start' || d === 'visible' || d === 'static') {
    return null;
  }
  return d;
}

export function convertBorderData(d, width, isRadius) {
  var dataIsColor = isColor(d);
  var dArray = !!dataIsColor ? dataIsColor : d.split(' ');
  if (dArray.length > 1) {
    var top = convertData(dArray[0]);
    var right = convertData(dArray[1]);
    var bottom = convertData(dArray[2] || dArray[0]);
    var left = convertData(dArray[3] || dArray[1]);
    if (width) {
      var wArray = width.split(' ');
      wArray[2] = wArray[2] || wArray[0];
      wArray[3] = wArray[3] || wArray[1];
      top = parseFloat(wArray[0]) && top || null;
      right = parseFloat(wArray[1]) && right || null;
      bottom = parseFloat(wArray[2]) && bottom || null;
      left = parseFloat(wArray[3]) && left || null;
    }
    if (isRadius) {
      return { 'top-left': top, 'top-right': right, 'bottom-right': bottom, 'bottom-left': left };
    }
    return { top: top, right: right, bottom: bottom, left: left };
  }
  return convertData(d);
}

export function convertShadowData(d) {
  if (!convertData(d)) {
    return {};
  }
  var dataArray = d.replace(colorExp, '').split(/\s+/).filter(function (item) {
    return item;
  });
  var keys = ['x', 'y', 'blur', 'spread', 'inset'];
  var value = { color: d.match(colorExp)[0] };
  dataArray.forEach(function (data, i) {
    value[keys[i]] = i === 3 ? convertData(data) : data;
  });
  return value;
}

function toCssLowerCase(d) {
  return d.replace(/[A-Z]/, function ($1) {
    return '-' + $1.toLocaleLowerCase();
  });
}



function fontToCss(d, current) {
  return Object.keys(d).map(function (key) {
    var data = d[key];
    if (!data || data === current[key]) {
      return null;
    } else if (key === 'letterSpacing' || key === 'lineHeight' || key === 'color') {
      return toCssLowerCase(key) + ': ' + data + ';';
    } else if (key === 'align' || key === 'decoration') {
      return 'text-' + key + ': ' + data + ';';
    }
    return 'font-' + key + ': ' + data + ';';
  }).filter(function (item) {
    return item;
  }).join('\n');
}

function cssUnique(array) {
  if (array[1] === array[3]) {
    array.splice(3, 1);
    if (array[0] === array[2]) {
      array.splice(2, 1);
    }
  }
  return array;
}

function borderToCss(d, current) {
  if (!d.style && !d.radius) {
    return null;
  }
  return Object.keys(d).map(function (key) {
    var data = d[key];
    if (!data || current[key] === data) {
      return null;
    }
    if (typeof data === 'string') {
      return 'border-' + key + ': ' + data + ';';
    }
    return Object.keys(data).map(function (cKey) {
      var cData = data[cKey];
      var currentData = current[key] && current[key][cKey];
      if (!cData || cData === 'none' || currentData === cData) {
        return null;
      }
      return 'border-' + cKey + '-' + key + ': ' + cData + ';';
    }).filter(function (item) {
      return item;
    }).join('\n');
  }).filter(function (item) {
    return item;
  }).join('\n');
}



function marginToCss(d, current) {
    function getMargin(obj) {
    return cssUnique(Object.keys(obj).map(function (key) {
      return key === 'center' ? null : obj[key] || 0;
    })).join(' ');
  }

  return Object.keys(d).map(function (key) {
    var style = key + ': ';
    var data = d[key];
    if (!data || current[key] === data) {
      return null;
    } else if (typeof data === 'string') {
      return '' + style + data + ';';
    }
    var str = getMargin(data);
    var currentStr = current[key] && getMargin(current[key]);
    if (str === currentStr) {
      return null;
    }
    return '' + style + str + ';';
  }).filter(function (item) {
    return item;
  }).join('\n');
}

function shadowToCss(d, current) {
  return Object.keys(d).map(function (key) {
    var data = d[key];
    var cData = current[key];
    if (!data || !Object.keys(data).length) {
      return null;
    }
    if (data.x === cData.x && data.y === cData.y && data.blur === cData.blur && data.spread === cData.spread && data.color === cData.color && data.inset === cData.inset) {
      return null;
    }
    return removeMultiEmpty(toCssLowerCase(key) + ': ' + (data.x || 0) + ' ' + (data.y || 0) + ' ' + (data.blur || 0) + ' ' + (data.spread || '') + ' ' + data.color + ' ' + (data.inset || '') + ';').trim();
  }).filter(function (item) {
    return item;
  }).join('\n');
}

function backgroundToCss(d, current) {
  return Object.keys(d).map(function (key) {
    var data = d[key];
    if (!data || current[key] === data) {
      return null;
    } else if (key === 'image') {
      return 'background-' + key + ': url(' + data + ');';
    }
    return 'background-' + key + ': ' + data + ';';
  }).filter(function (item) {
    return item;
  }).join('\n');
}

function interfaceToCss(d, current) {
  return Object.keys(d).map(function (key) {
    var data = d[key];
    if (!data || current[key] === data) {
      return null;
    }
    return key + ': ' + data + ';';
  }).filter(function (item) {
    return item;
  }).join('\n');
}

export function toCss(newData, currentData) {
  var css = '';
  Object.keys(newData).forEach(function (key) {
    var addCss = void 0;
    switch (key) {
      case 'state':
        addCss = newData[key] && newData[key].cursor !== currentData[key].cursor ? 'cursor: ' + newData[key].cursor + ';' : '';
        break;
      case 'font':
        addCss = fontToCss(newData[key], currentData[key]);
        break;
      case 'interface':
        addCss = interfaceToCss(newData[key], currentData[key]);
        break;
      case 'background':
        addCss = backgroundToCss(newData[key], currentData[key]);
        break;
      case 'border':
        addCss = borderToCss(newData[key], currentData[key]);
        break;
      case 'margin':
        addCss = marginToCss(newData[key], currentData[key]);
        break;
      case 'shadow':
        addCss = shadowToCss(newData[key], currentData[key]);
        break;
      case 'transition':
        addCss = newData[key] && currentData[key] !== newData[key] && newData[key] !== 'all 0s ease 0s' ? 'transition: ' + newData[key] : '';
        break;
      default:
        break;
    }
    if (addCss && addCss !== ';') {
      css = css && addCss ? css + '\n' + addCss : addCss;
    }
  });
  return css;
}

function getCssPropertyForRuleToCss(dom, ownerDocument, isMobile, state) {
  var style = '';
  var styleObj = {};
  function cssRulesForEach(item, rule) {
    item.forEach(function (cssStyle) {
      if (cssStyle.conditionText && mobileTitle.indexOf(cssStyle.conditionText) >= 0 && isMobile) {
        return cssRulesForEach(Array.prototype.slice.call(cssStyle.cssRules || []), rule);
      }
      var select = cssStyle.selectorText;
      if (select && select.match(rule)) {
        var isCurrentDom = select.split(',').filter(function (str) {
          var doms = Array.prototype.slice.call(ownerDocument.querySelectorAll(str.split(':')[0])).filter(function (d) {
            return d === dom;
          });
          return doms.length;
        }).length;
        if (isCurrentDom) {
                    styleObj[select] = cssStyle.style.cssText;
        }
      }
    });
  }
  var classNames = dom.className.split(' ');
  classNames.forEach(function (css) {
    var str = '\\.(' + (state ? css + '\\:' + state : css + '$|' + css + ',') + ')';
    var rule = new RegExp(str, 'g');
    Array.prototype.slice.call(dom.ownerDocument.styleSheets || []).forEach(function (item) {
      if (item.href) {
        var host = item.href.match(/^(\w+:\/\/)?([^\/]+)/i)[2];
        if (host !== dom.ownerDocument.location.host) {
          return;
        }
      }
      cssRulesForEach(Array.prototype.slice.call(item.cssRules || []), rule);
    });
  });
  var t = Object.keys(styleObj).sort(function (a, b) {
    var aa = a.replace(/\>/g, ' ').split(/\s+/).filter(function (c) {
      return c;
    });
    var bb = b.replace(/\>/g, ' ').split(/\s+/).filter(function (c) {
      return c;
    });
    var c = classNames.indexOf(aa[aa.length - 1].replace('.', ''));
    var d = classNames.indexOf(bb[bb.length - 1].replace('.', ''));
    return bb.length - aa.length || d - c;
  }).map(function (key) {
    return styleObj[key].replace(/\s+/g, '').split(';').filter(function (c) {
      return c;
    }).map(function (c) {
      return c.split(':');
    });
  });
  t.forEach(function (item, i) {
    if (!i) {
      style += item.map(function (c) {
        return c.join(':');
      }).join(';') + ';';
    } else {
      var preItem = [];
      for (var j = 0; j <= i - 1; j++) {
        preItem.push(t[j].map(function (c) {
          return c[0];
        }).join());
      }
      var newItem = item.map(function (c) {
        return c[1].indexOf('!important') >= 0 || preItem.indexOf(c[0]) === -1 ? c : null;
      }).filter(function (c) {
        return c;
      });
      style += newItem.map(function (c) {
        return c.join(':');
      }).join(';') + ';';
    }
  });
  return style;
}

var removeEmptyStyle = function removeEmptyStyle(s) {
  var style = _extends({}, s);
  Object.keys(style).forEach(function (key) {
    var value = style[key];
    if (parseFloat(key) || parseFloat(key) === 0 || value === 'auto' || value === 'initial' || value === 'normal' || !value) {
      delete style[key];
    }
  });
  return style;
};

export function getDomCssRule(dom, isMobile, state) {
  var ownerDocument = dom.ownerDocument;
  var div = ownerDocument.createElement(dom.tagName.toLocaleLowerCase());
  dom.parentNode.appendChild(div);
    var style = getCssPropertyForRuleToCss(dom, ownerDocument, isMobile);
  if (state) {
    style += getCssPropertyForRuleToCss(dom, ownerDocument, isMobile, state);
  }
  style += 'display:none;';
  div.style = '' + style + dom.style.cssText;
    var styleObject = removeEmptyStyle(div.style);
    div.style.cssText = 'display: none';
  div.className = dom.className;
    var s = _extends({}, getComputedStyle(div), styleObject);
  div.remove();
  return s;
}

export function getParentClassName(dom) {
  var useTagName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;

  var className = '';
  var i = 0;
  function getParentClass(d) {
    var p = d.className;
    var tagName = useTagName ? d.tagName.toLocaleLowerCase() : null;
    p = p ? '.' + p.split(' ')[0] : tagName;
    className = p ? (p + ' > ' + className).trim() : className;
    if (useTagName || !useTagName && d.className) {
      i += 1;
    }
    if (i >= length) {
      return;
    }
    if (d.parentNode.tagName.toLocaleLowerCase() !== 'html') {
      getParentClass(d.parentNode);
    }
  }
  getParentClass(dom.parentNode);
  return className;
}

export function currentScrollTop() {
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
}

export function getParentNode(node, className) {
  var parent = node.parentNode;
  var classNameArray = (parent.className || '').split(' ').filter(function (name) {
    return name === className;
  });
  if (classNameArray.length || parent.tagName.toLocaleLowerCase() === 'body') {
    return parent;
  }
  return getParentNode(parent, className);
}