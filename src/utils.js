/* eslint-disable no-useless-escape */
import React from 'react';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import specificity from 'specificity';

const Option = Select.Option;

const RadioButton = Radio.Button;

export const colorExp = /^rgba?\(((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?)\)$|(#[\d\w]+|\w+\((?:\d+%?(?:,\s)*){3}(?:\d*\.?\d+)?\))|^hsla?\(((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*(\d+(?:\.\d+)?))?)\)$/ig;// eslint-disable-line max-len

export const colorLookup = {
  aqua: 'rgb(0, 255, 255)',
  lime: 'rgb(0, 255, 0)',
  silver: 'rgb(192, 192, 192)',
  black: 'rgb(0, 0, 0)',
  maroon: 'rgb(128, 0, 0)',
  teal: 'rgb(0, 128, 128)',
  blue: 'rgb(0, 0, 255)',
  navy: 'rgb(0, 0, 128)',
  white: 'rgb(255, 255, 255)',
  fuchsia: 'rgb(255, 0, 255)',
  olive: 'rgb(128, 128, 0)',
  yellow: 'rgb(255, 255, 0)',
  orange: 'rgb(255, 165, 0)',
  gray: 'rgb(128, 128, 128)',
  purple: 'rgb(128, 0, 128)',
  green: 'rgb(0, 128, 0)',
  red: 'rgb(255, 0, 0)',
  pink: 'rgb(255, 192, 203)',
  cyan: 'rgb(0, 255, 255)',
  transparent: 'rgba(255, 255, 255, 0)',
};

const classInherited = [
  'azimuth',
  'border-collapse',
  'border-spacing',
  'caption-side',
  'color',
  'cursor',
  'direction',
  'elevation',
  'empty-cells',
  'font-family',
  'font-size',
  'font-style',
  'font-variant',
  'font-weight',
  'font',
  'letter-spacing',
  'line-height',
  'list-style-image',
  'list-style-position',
  'list-style-type',
  'list-style',
  'orphans',
  'pitch-range',
  'pitch',
  'quotes',
  'richness',
  'speak-header',
  'speak-numeral',
  'speak-punctuation',
  'speak',
  'speech-rate',
  'stress',
  'text-align',
  'text-indent',
  'text-transform',
  'text-decoration',
  'visibility',
  'voice-family',
  'volume',
  'white-space',
  'widows',
  'word-spacing',
];

export const mobileTitle = '@media screen and (max-width: 767px) {';

export const getBgImageUrl = (image) => image.replace(/url\((('|"|&quot;)?)([^\s]+)\2\)/ig, '$3');

export const getBgImageType = (url) => {
  let type = url && url.match(/^(repeating-)?linear-gradient\(/i) ? 'linear' : 'img';
  type = url && url.match(/^(repeating-)?radial-gradient\(/i) ? 'radial' : type;
  return type;
}

// 当跟默认值相同时，用于清除样式;
export const styleInUse = {
  'background-attachment': 1,
  'background-color': 1,
  'background-image': 1,
  'background-repeat': 1,
  'background-position': 1,
  'background-size': 1,
  'background-blend-mode': 1,
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
  transition: 1,
  display: 1,
  'align-items': 1,
  'justify-content': 1,
  'z-index': 1,
  float: 1,
  clear: 1,
  opacity: 1,
};
export const alphaBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/' +
  '9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0p' +
  'gAAAABJRU5ErkJggg==';

function toCssLowerCase(d) {
  return d.replace(/[A-Z]/, ($1) => (`-${$1.toLocaleLowerCase()}`));
}

function toStyleUpperCase(d) {
  return d.replace(/-(.?)/g, ($1) => ($1.replace('-', '').toLocaleUpperCase()));
}

export function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

export function isColor(v) {
  return v.match(colorExp) || colorLookup[v];
}

export function getRandomKey() {
  return (Date.now() + Math.random()).toString(36).replace('.', '');
}

export function firstUpperCase(str) {
  return `${str.charAt(0).toLocaleUpperCase()}${str.slice(1)}`;
}

export function removeMultiEmpty(str) {
  return str.replace(/\s+/g, ' ');
}
export const removeEditClassName = (t, reClass) => (
  t.split(' ').filter(name => name.indexOf(reClass) === -1).join(' ')
);

export function getBorderDataToStyle(name, d) {
  const key = firstUpperCase(name);
  if (d && typeof d === 'object') {
    if (key === 'radius') {
      return {
        [`borderTopLeft${key}`]: d.topLeft,
        [`borderTopRight${key}`]: d.topRight,
        [`borderBottomRight${key}`]: d.bottomRight,
        [`borderBottomLeft${key}`]: d.bottomLeft,
      };
    }
    return {
      [`borderTop${key}`]: d.top,
      [`borderRight${key}`]: d.right,
      [`borderBottom${key}`]: d.bottom,
      [`borderLeft${key}`]: d.left,
    };
  }
  return { [`border${key}`]: d };
}

export function getOption(value, noKey) {
  return Object.keys(value).map(key => (
    <Option key={key} value={key}>{noKey ? value[key] : `${value[key]} - ${key}`}</Option>
  ));
}

export function getOptionArray(array) {
  return array.map(key => (
    <Option key={key} value={key}>
      {key}
    </Option>
  ));
}

export function getRadioButton(array) {
  return (array.map(key => (
    <RadioButton value={key} key={key} className="ant-radio-button-auto-width">
      {key}
    </RadioButton>
  )));
}

export function getComputedStyle(target) {
  return document.defaultView ? document.defaultView.getComputedStyle(target) : {};
}

export function convertData(d, b) {
  const c = b ? (!d && typeof d !== 'number') || d.indexOf('none') >= 0
    || d.indexOf('normal') >= 0 :
    !d || d === '0px' || d.indexOf('normal') >= 0;
  if (c) {
    return null;
  }
  return d;
}

export function convertDefaultData(d) {
  if (!d ||
    d === 'repeat' || d === '0% 0%' ||
    d === 'auto' || d === 'scroll' ||
    d === 'start' || d === 'visible'
  ) {
    return null;
  }
  return d;
}

export const linearGradientToDeg = {
  'to top': 0,
  'to right': 90,
  'to bottom': 180,
  'to left': 270,
  'to top right': 45,
  'to bottom right': 135,
  'to bottom left': 225,
  'to top left': 315,
  'to right top': 45,
  'to right bottom': 135,
  'to left top': 315,
  'to left bottom': 225,
};

export const defaultBgImageOrGradient = {
  img: 'url("https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg")',
  linear: 'linear-gradient(to bottom, black 0%, white 100%)',
  radial: 'radial-gradient(circle at center, black 0%, white 100%)',
}

export const defaultBgImageValue = {
  image: defaultBgImageOrGradient.img,
  attachment: 'scroll',
  blendMode: 'normal',
  position: '0% 0%',
  repeat: 'repeat',
  size: 'auto',
  clip: 'padding-box',
}

export function getBgDefaultData(style) {
  const data = {};
  Object.keys(defaultBgImageValue).forEach($key => {
    const key = `background-${toCssLowerCase($key)}`;
    const item = style[key];
    if (item && style.backgroundImage && style.backgroundImage !== 'none') {
      data[$key] = $key === 'image' ? item.replace(/\),(\s?)(?=(url|linear|radial|repeating))/, ')&EditorListUrlPlaceholder&')
        .split('&EditorListUrlPlaceholder&') : item.split(',');
    } else {
      data[$key] = [];
    }
  });
  const length = Object.keys(data).map(item => data[item].length).sort((a, b) => a - b > 0)[0];
  (new Array(length)).fill(1).forEach((_, i) => {
    Object.keys(data).forEach(key => {
      let item = data[key][i];
      if (!item) {
        item = data[key][0] || defaultBgImageValue[key];
        data[key][i] = item;
      }
      if (item.trim() === 'initial') {
        data[key][i] = defaultBgImageValue[key];
      }
    });
  });
  return data;
}

export function convertBorderData(d, width, isRadius) {
  if (!d) {
    return '';
  }
  if (typeof d === 'object') {
    return d;
  }
  const dataIsColor = isColor(d);
  const dArray = dataIsColor || d.split(' ');
  if (dArray.length > 1) {
    let top = convertData(dArray[0]);
    let right = convertData(dArray[1]);
    let bottom = convertData(dArray[2] || dArray[0]);
    let left = convertData(dArray[3] || dArray[1]);
    if (width) {
      const wArray = width.split(' ');
      wArray[1] = wArray[1] || wArray[0];
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
    return { top, right, bottom, left };
  }
  return convertData(d);
}

export function convertShadowData(d) {
  if (!convertData(d)) {
    return {};
  }
  const dataArray = d.replace(/\,\s+/g, ',').split(/\s+/);
  let color;
  const noColor = dataArray.map(c => {
    if (isColor(c) || colorLookup[c]) {
      color = c;
      return null;
    }
    return c;
  }).filter(item => item);
  const keys = ['x', 'y', 'blur', 'spread', 'inset'];
  const value = { color };
  noColor.forEach((data, i) => {
    value[keys[i]] = i === 3 ? convertData(data) : data;
  });
  return value;
}

function fontToCss(d, current) {
  return Object.keys(d).map(key => {
    const data = d[key];
    if (!data ||
      data === current[key]
    ) {
      return null;
    } else if (key === 'letterSpacing' || key === 'lineHeight' || key === 'color') {
      return `${toCssLowerCase(key)}: ${data};`;
    } else if (key === 'align' || key === 'decoration') {
      return `text-${key}: ${data};`;
    }
    return `font-${key}: ${data};`;
  }).filter(item => item).join('\n');
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
  return Object.keys(d).map(key => {
    const data = d[key];
    if (!data || current[key] === data) {
      return null;
    }
    if (typeof data === 'string') {
      return `border-${key}: ${data};`;
    }
    return Object.keys(data).map(cKey => {
      const cData = data[cKey];
      const currentData = current[key] && current[key][cKey];
      if (!cData || cData === 'none' || currentData === cData) {
        return null;
      }
      return `border-${cKey}-${key}: ${cData};`;
    }).filter(item => item).join('\n');
  }).filter(item => item).join('\n');
}

function marginToCss(d, current) {
  // 合并 margin padding, 用一个样式。。toStyleString 样式太多;
  function getMargin(obj) {
    return cssUnique(Object.keys(obj).map(key => (key === 'center' ? null : obj[key] || 0)))
      .join(' ');
  }

  return Object.keys(d).map(key => {
    const style = `${key}: `;
    const data = d[key];
    if (!data || current[key] === data) {
      return null;
    } else if (typeof data === 'string') {
      return `${style}${data};`;
    }
    const str = getMargin(data);
    const currentStr = current[key] && getMargin(current[key]);
    if (str === currentStr) {
      return null;
    }
    return `${style}${str};`;
  }).filter(item => item).join('\n');
}

function shadowToCss(d, current) {
  return Object.keys(d).map(key => {
    const data = d[key];
    if (typeof data === 'string') {
      return removeMultiEmpty(`${toCssLowerCase(key)}: ${data};`).trim();
    }
    const cData = current[key];
    if (!data || !Object.keys(data).length) {
      return null;
    }
    if (data.x === cData.x && data.y === cData.y &&
      data.blur === cData.blur && data.spread === cData.spread
      && data.color === cData.color && data.inset === cData.inset) {
      return null;
    }
    return removeMultiEmpty(`${toCssLowerCase(key)}: ${data.x || 0} ${data.y || 0} ${
      data.blur || 0} ${data.spread || ''} ${data.color} ${data.inset || ''};`).trim();
  }).filter(item => item).join('\n');
}

function backgroundToCss(d, current) {
  return Object.keys(d).map(key => {
    const data = d[key];
    if (!data || current[key] === data) {
      return null;
    } if (key === 'image') {
      const t = Object.keys(data).map($key => {
        const item = data[$key];
        const currentItem = current[key][$key];
        if (!item || item.join() === currentItem.join()) {
          return null;
        }
        if (item === 'none') {
          return `background-${toCssLowerCase($key)}: none;`;
        }
        return `background-${toCssLowerCase($key)}: ${item.join(',')};`
      }).filter(c => c);
      return t.join('\n')
    }
    return `background-${key}: ${data};`;
  }).filter(item => item).join('\n');
}

function defaultToCss(d, current) {
  return Object.keys(d).map(key => {
    const data = d[key];
    if (!data && data !== 0 || current[key] === data) {
      return null;
    }
    return `${toCssLowerCase(key)}: ${data};`;
  }).filter(item => item).join('\n');
}

export function toCss(newData, currentData) {
  let css = '';
  Object.keys(newData).forEach(key => {
    let addCss;
    switch (key) {
      case 'state':
        addCss = newData[key] && newData[key].cursor !== currentData[key].cursor ?
          `cursor: ${newData[key].cursor};` : '';
        break;
      case 'layout':
        addCss = defaultToCss(newData[key], currentData[key]);

        break;
      case 'font':
        addCss = fontToCss(newData[key], currentData[key]);
        break;
      case 'interface':
        addCss = defaultToCss(newData[key], currentData[key]);
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
        addCss = newData[key] && currentData[key] !== newData[key]
          && newData[key] !== 'all 0s ease 0s' ? `transition: ${newData[key]}` : '';
        break;
      default:
        break;
    }
    if (addCss && addCss !== ';') {
      css = css && addCss ? `${css}
${addCss}` : addCss;
    }
  });
  return css;
}
// chrome state;
const styleState = ['hover', 'focus', 'active', 'visited', 'focus-within'];
function contrastParent(node, d) {
  if (node === d) {
    return true;
  } else if (!node) {
    return false;
  }
  return contrastParent(node.parentNode, d);
}

function cssRulesForEach(item, i, newStyleState, styleObj,
  dom, ownerDocument, isMobile, state, className, onlyMobile, media, cj) {
  const rep = new RegExp(`\:${state}$`);
  // state === 'active' ? `(\:${state}|\:hover)$` : 
  // `\\.${className}(:(hover|focus|active))?\s*(?=(,|$))`
  const repClassName = className || dom.className.split(' ').join('|');
  const classRep = new RegExp(`\\.${state ?
    `(${className || repClassName}):${state}` : `(${repClassName})`}?\s*(?=(,|$))`);
  item.forEach((cssStyle, j) => {
    if (cssStyle.conditionText &&
      cssStyle.media &&
      cssStyle.cssRules &&
      isMobile) {
      return cssRulesForEach(Array.prototype.slice.call(cssStyle.cssRules || []), i,
        newStyleState, styleObj, dom, ownerDocument, isMobile, state,
        className, onlyMobile, 'moblie', j);
    }
    if (onlyMobile && !media) {
      return null;
    }
    const select = cssStyle.selectorText;
    // 删除内建样式, https://github.com/ant-design/ant-design-landing/issues/42;
    if (!select || !select.split(',').filter(c => c).some(str => !(str.trim().match(/^(\[[a-z]+=".*"\]|\:\:-.*)/g)))) {
      return null;
    }
    // 去除所有不是状态的
    let childrenArray = [];
    let isParent;
    // className 为 null
    if (!className) {
      childrenArray = Array.prototype.slice.call(ownerDocument.querySelectorAll(
        select.trim().replace(state ? rep : '', ''))
      );
      isParent = childrenArray.some(d => contrastParent(dom, d));
    }
    if (select.match(classRep) || isParent) {
      let cssText = cssStyle.style.cssText;
      const currentDomStr = select.split(',').filter(str => {
        if (className && !str.match(classRep)) {
          return false;
        }
        const surplus = state ? !str.match(rep)
          : newStyleState.map(key => {
            const newKey = `:${key}`;
            return str.indexOf(newKey) >= 0;
          }).some(c => c);
        if (surplus) {
          return false;
        }
        if (className) {
          return str.match(classRep) && str;
        }
        // 判断是不是状态样式
        childrenArray.forEach(d => {
          const isDom = contrastParent(dom, d);
          if (isDom && d !== dom) {
            // 获取继承的样式
            cssText = `${cssText.split(';').filter(css => {
              const cssName = css.split(':')[0].trim();
              return classInherited.indexOf(cssName) >= 0;
            }).join(';')}`;
            cssText = cssText ? `${cssText};` : '';
          }
        });
        // some attached value: Unexpected assignment within ConditionalExpression;
        return isParent ? str : null;
      })[0];
      if (currentDomStr) {
        const newSelectName = `${currentDomStr}~${i}${cj ?
          `~${cj}` : ''}~${j}${media ? `~${media}` : ''}`;
        styleObj[newSelectName] = cssText;
      }
    }
    return null;
  });
}

function getCssPropertyForRuleToCss({
  dom, ownerDocument,
  isMobile, state, className, onlyMobile,
}) {
  let style = '';
  const styleObj = {};
  const newStyleState = styleState.map(key =>
    (state === 'active' ? key !== state || key !== 'hover' : key !== state)
    && key
  ).filter(c => c);
  Array.prototype.slice.call(ownerDocument.styleSheets || []).forEach((item, i) => {
    if (item.href) {
      const host = item.href.match(/(:\/\/)(.+?)\//i)[2];
      if (host !== ownerDocument.location.host) {
        return;
      }
    }
    try {
      if (!item.cssRules) {
        return;
      }
    } catch (e) {
      if (e.name !== 'SecurityError') {
        throw e;
      }
      return;
    }
    cssRulesForEach(Array.prototype.slice.call(item.cssRules), i,
      newStyleState, styleObj, dom, ownerDocument, isMobile, state, className, onlyMobile);
  });
  Object.keys(styleObj).sort((a, b) => {
    const aArray = a.split('~');
    const bArray = b.split('~');
    return specificity.compare(aArray[0], bArray[0]) ||
      parseFloat(aArray[1]) - parseFloat(bArray[1]) ||
      parseFloat(aArray[2]) - parseFloat(bArray[2]) ||
      aArray.length - bArray.length ||
      parseFloat(aArray[3]) - parseFloat(bArray[3]);
  }).forEach(key => {
    style += styleObj[key];
  });
  return style;
}

const removeEmptyStyle = (s) => {
  const style = {};
  Array(s.length).fill(1).forEach((k, i) => {
    const key = s[i];
    const value = s[key];
    if (value && value !== 'initial' && value !== 'normal') {
      if (key.indexOf('background-repeat') >= 0) {
        style['background-repeat'] = s['background-repeat'];
        style.backgroundRepeat = s.backgroundRepeat;
      }
      if (key.indexOf('background-position') >= 0) {
        style['background-position'] = s['background-position'];
        style.backgroundPosition = s.backgroundPosition;
      }
      style[key] = s[key];
      style[toStyleUpperCase(key)] = s[key];
      if (key.indexOf('transition') >= 0) {
        style.transition = s.transition;
      }
    }
  });
  return style;
};

export function getDomCssRule({ dom, isMobile, state, onlyMobile }) {
  const ownerDocument = dom.ownerDocument;
  const div = ownerDocument.createElement(dom.tagName.toLocaleLowerCase());
  dom.parentNode.appendChild(div);
  // 有 vh 的情况下，computedStyle 会把 vh 转化成 px，用遍历样式找出全部样式
  const style = `${getCssPropertyForRuleToCss({
    dom, ownerDocument,
    isMobile, state, onlyMobile,
  })}`;
  // 给 style 去重;
  div.style = `${style}${dom.style.cssText}`;
  if (!div.style.display) {
    div.style.display = getComputedStyle(div).display;
  }
  // 获取当前 div 带 vh 的样式；
  const styleObject = removeEmptyStyle(div.style);
  div.remove();
  return styleObject;
}

export function getClassNameCssRule({ dom, className, isMobile, onlyMobile, state, getObject }) {
  const ownerDocument = dom.ownerDocument;
  const div = ownerDocument.createElement('div');
  const style = getCssPropertyForRuleToCss({
    dom, ownerDocument,
    isMobile, state, className, onlyMobile,
  });
  div.style = style;
  const styleData = getObject ? removeEmptyStyle(div.style) : div.style.cssText;
  div.remove();
  return styleData;
}

export function getParentClassName(dom, rootSelector, useTagName = true, length = 50) {
  let className = '';
  let i = 0;
  const rootDom = dom.ownerDocument.querySelectorAll(rootSelector)[0];
  function getParentClass(d) {
    let p = d.className;
    if (d === rootDom) {
      return;
    }
    const tagName = useTagName ? d.tagName.toLocaleLowerCase() : null;
    p = p ? `.${p.split(/\s+/g)[0]}` : tagName;
    className = p ? `${p} > ${className}`.trim() : className;
    if (useTagName || (!useTagName && d.className)) {
      i += 1;
    }
    if (i >= length) {
      return;
    }
    if (d.parentNode.tagName.toLocaleLowerCase() !== 'html') {
      getParentClass(d.parentNode);
    }
  }
  if (rootDom !== dom) {
    getParentClass(dom.parentNode);
  }
  return rootSelector ? `${rootSelector} ${className}`.trim() : className;
}

export function currentScrollTop() {
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
}

export function getParentNode(node, className) {
  const parent = node.parentNode;
  const classNameArray = (parent.className || '').split(' ').some(name => name === className);
  if (classNameArray || parent.tagName.toLocaleLowerCase() === 'body') {
    return parent;
  }
  return getParentNode(parent, className);
}

export function getCssStr(cssString, className) {
  const reStr = `\.${className}[\\s\\n?]*\\{\\n?([^\\}]+?)\\n?\\}`;
  const re = new RegExp(reStr, "gi");
  const css = cssString.match(re);
  let str = '';
  if (css) {
    css.forEach(string => {
      const reg = new RegExp(reStr, 'gm');
      str += string.replace(reg, '$1');
    })
  }
  return str;
}

export function unitToPercent(dom, value, unit) {
  if (unit === '%') {
    return value;
  }
  let pix = parseFloat(value);
  let computedStyle;
  switch (unit) {
    case 'em':
      computedStyle = getComputedStyle(dom);
      pix *= parseFloat(computedStyle.fontSize);
      break;
    case 'rem':
      computedStyle = getComputedStyle(document.getElementsByTagName('html')[0]);
      pix *= parseFloat(computedStyle.fontSize);
      break;
    case 'vw':
      pix = pix * document.body.clientWidth / 100;
      break;
    case 'vh':
      pix = pix * document.body.clientHeight / 100;
      break;
    default:
      break;
  }
  const rect = dom.getBoundingClientRect();
  pix = pix / rect.width * 100;
  return `${pix}%`;
}