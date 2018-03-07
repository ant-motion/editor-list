import React from 'react';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';

const Option = Select.Option;

const RadioButton = Radio.Button;

const colorExp = /(#[\d\w]+|\w+\((?:\d+%?(?:,\s)*){3}(?:\d*\.?\d+)?\))/ig;

export const mobileTitle = '@media screen and (max-width: 767px) {';

export const styleInUse = {
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
  transition: 1,
};

export function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

export const alphaBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/' +
  '9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0p' +
  'gAAAABJRU5ErkJggg==';

export function isColor(v) {
  return v.match(colorExp);
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

export function getOption(value) {
  return Object.keys(value).map(key => (
    <Option key={key} value={key}>{`${value[key]} - ${key}`}</Option>
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

export function getComputedStyle() {
  return document.defaultView ? document.defaultView.getComputedStyle(...arguments) : {};
}

export function convertData(d, b) {
  const c = b ? (!d & typeof d !== 'number') || d.indexOf('none') >= 0 || d.indexOf('normal') >= 0 :
    !d || d.indexOf('none') >= 0 || d === '0px' || d.indexOf('normal') >= 0;
  if (c) {
    return null;
  }
  return d;
}

export function convertDefaultData(d) {
  if (!d || d === 'rgba(0, 0, 0, 0)' ||
    d === 'repeat' || d === '0% 0%' ||
    d === 'auto' || d === 'scroll' ||
    d === 'start' || d === 'visible' ||
    d === 'static'
  ) {
    return null;
  }
  return d;
}

export function convertBorderData(d, width, isRadius) {
  const dataIsColor = isColor(d);
  const dArray = !!dataIsColor ? dataIsColor : d.split(' ');
  if (dArray.length > 1) {
    let top = convertData(dArray[0]);
    let right = convertData(dArray[1]);
    let bottom = convertData(dArray[2] || dArray[0]);
    let left = convertData(dArray[3] || dArray[1]);
    if (width) {
      const wArray = width.split(' ');
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
  const dataArray = d.replace(colorExp, '').split(/\s+/).filter(item => item);
  const keys = ['x', 'y', 'blur', 'spread', 'inset'];
  const value = { color: d.match(colorExp)[0] };
  dataArray.forEach((data, i) => {
    value[keys[i]] = i === 3 ? convertData(data) : data;
  });
  return value;
}

function toCssLowerCase(d) {
  return d.replace(/[A-Z]/, ($1) => (`-${$1.toLocaleLowerCase()}`));
}

/*
function toStyleUpperCase(d) {
  return d.replace(/-(.?)/, ($1) => ($1.replace('-', '').toLocaleUpperCase()));
}
*/

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

/*
 function borderToCss(d) {
 let border = {};
 if (!d.style && !d.radius) {
 return
 }
 Object.keys(d).forEach(key => {
 const data = d[key];
 if (!data) {
 return;
 }
 if (key === 'radius') {
 border.radius = typeof data === 'object' ?
 cssUnique(Object.keys(data).sort((a, b) => sort[a] > sort[b]).map(key => data[key]))
 .join(' ')
 : data;
 } else if (typeof data === 'string') {
 border.style = `${border.style || ''}${data} `;
 } else {
 Object.keys(data).forEach(cKey => {
 const cData = data[cKey];
 if (!cData) {
 return;
 }
 border[cKey] = `${border[cKey] || ''}${cData} `;
 })
 }
 });
 const borderArr = Object.keys(border);
 if (borderArr.length > 2 && borderArr.indexOf('style') >= 0) {
 borderArr.splice(borderArr.indexOf('style'), 1);
 const style = border.style;
 borderArr.forEach(key => {
 if (key !== 'radius') {
 border[key] = `${style}${border[key]}`;
 }
 });
 }
 return borderArr.map(key => {
 if (key === 'style') {
 return `border: ${border[key].trim()};`
 }
 return `border-${key}: ${border[key].trim()};`
 }).join('\n');
 }
 */


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
    } else if (key === 'image') {
      return `background-${key}: url(${data});`;
    }
    return `background-${key}: ${data};`;
  }).filter(item => item).join('\n');
}

function interfaceToCss(d, current) {
  return Object.keys(d).map(key => {
    const data = d[key];
    if (!data || current[key] === data) {
      return null;
    }
    return `${key}: ${data};`;
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

function getCssPropertyForRuleToCss(dom, ownerDocument, isMobile, state) {
  let style = '';
  const styleObj = {};
  function cssRulesForEach(item, rule) {
    item.forEach(cssStyle => {
      if (cssStyle.conditionText && mobileTitle.indexOf(cssStyle.conditionText) >= 0 && isMobile) {
        return cssRulesForEach(Array.prototype.slice.call(cssStyle.cssRules || []), rule);
      }
      const select = cssStyle.selectorText;
      if (select && select.match(rule)) {
        const isCurrentDom = select.split(',').filter(str => {
          const doms = Array.prototype.slice.call(ownerDocument.querySelectorAll(str.split(':')[0]))
            .filter(d => d === dom);
          return doms.length;
        }).length;
        if (isCurrentDom) {
          // style += cssStyle.style.cssText;
          styleObj[select] = cssStyle.style.cssText;
        }
      }
    });
  }
  const classNames = dom.className.split(' ');
  classNames.forEach(css => {
    const str = `\\.(${state ? `${css}\\:${state}` : `${css}$|${css},`})`;
    const rule = new RegExp(str, 'g');
    Array.prototype.slice.call(dom.ownerDocument.styleSheets || []).forEach(item => {
      if (item.href) {
        const host = item.href.match(/^(\w+:\/\/)?([^\/]+)/i)[2];
        if (host !== dom.ownerDocument.location.host) {
          return;
        }
      }
      cssRulesForEach(Array.prototype.slice.call(item.cssRules || []), rule);
    });
  });
  const t = Object.keys(styleObj).sort((a, b) => {
    const aa = a.replace(/\>/g, ' ').split(/\s+/).filter(c => c);
    const bb = b.replace(/\>/g, ' ').split(/\s+/).filter(c => c);
    const c = classNames.indexOf(aa[aa.length - 1].replace('.', ''));
    const d = classNames.indexOf(bb[bb.length - 1].replace('.', ''));
    return bb.length - aa.length || d - c;
  }).map(key => (
    styleObj[key].replace(/\s+/g, '').split(';').filter(c => c).map(c => c.split(':'))
  ));
  t.forEach((item, i) => {
    if (!i) {
      style += `${item.map(c => c.join(':')).join(';')};`;
    } else {
      const preItem = [];
      for (let j = 0; j <= i - 1; j++) {
        preItem.push(t[j].map(c => c[0]).join());
      }
      const newItem = item.map((c) => {
        return c[1].indexOf('!important') >= 0 || preItem.indexOf(c[0]) === -1 ? c : null;
      }).filter(c => c);
      style += `${newItem.map(c => c.join(':')).join(';')};`;
    }
  });
  return style;
}

const removeEmptyStyle = (s) => {
  const style = { ...s };
  Object.keys(style).forEach(key => {
    const value = style[key];
    if (parseFloat(key) || parseFloat(key) === 0 ||
      value === 'auto' || value === 'initial' || value === 'normal'
      || !value) {
      delete style[key];
    }
  });
  return style;
};

export function getDomCssRule(dom, isMobile, state) {
  const ownerDocument = dom.ownerDocument;
  const div = ownerDocument.createElement(dom.tagName.toLocaleLowerCase());
  dom.parentNode.appendChild(div);
  // 有 vh 的情况下，computedStyle 会把 vh 转化成 px，用遍历样式找出全部样式
  let style = getCssPropertyForRuleToCss(dom, ownerDocument, isMobile);
  if (state) {
    style += getCssPropertyForRuleToCss(dom, ownerDocument, isMobile, state);
  }
  style += 'display:none;';
  div.style = `${style}${dom.style.cssText}`;
  // 获取当前 div 带 vh 的样式；
  const styleObject = removeEmptyStyle(div.style);
  // 再取 className 样式；
  div.style.cssText = 'display: none';
  div.className = dom.className;
  // 生成 div 所有样样；
  const s = { ...getComputedStyle(div), ...styleObject };
  div.remove();
  return s;
}

export function getParentClassName(dom, useTagName = true, length = 50) {
  let className = '';
  let i = 0;
  function getParentClass(d) {
    let p = d.className;
    const tagName = useTagName ? d.tagName.toLocaleLowerCase() : null;
    p = p ? `.${p.split(' ')[0]}` : tagName;
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
  getParentClass(dom.parentNode);
  return className;
}

export function currentScrollTop() {
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
}
