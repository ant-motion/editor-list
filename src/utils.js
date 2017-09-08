import React from 'react';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';

const Option = Select.Option;

const RadioButton = Radio.Button;

const colorExp = /(#[\d\w]+|\w+\((?:\d+%?(?:,\s)*){3}(?:\d*\.?\d+)?\))/ig;


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

export function convertData(d) {
  if (!d || d.indexOf('none') >= 0 || d === '0px' || d.indexOf('normal') >= 0 || d === 'auto') {
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
        addCss = newData[key].cursor ? 'cursor: pointer;' : '';
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

function getCssPropertyForRuleToCss(dom, ownerDocument, state) {
  let style = '';
  dom.className.split(' ').forEach(css => {
    const rule = state ? `\\.${css}:${state}` : new RegExp(`\\.(${css}$|${css},)`, 'g');
    Array.prototype.slice.call(document.styleSheets || []).forEach(item => {
      Array.prototype.slice.call(item.cssRules || []).forEach(cssStyle => {
        const select = cssStyle.selectorText;
        if (select && select.match(rule)) {
          const isCurrentDom = select.split(',').filter(str => {
            return ownerDocument.querySelector(str.split(':')[0]) === dom;
          }).length;
          if (isCurrentDom) {
            style += cssStyle.cssText.match(/{.*}/)[0].replace(/[\{|\}]/g, '');
          }
        }
      });
    });
  });
  style += 'display: none;';
  return style;
}

export function getDomCssRule(dom, state) {
  const ownerDocument = dom.ownerDocument;
  const style = getCssPropertyForRuleToCss(dom, ownerDocument, state);
  const div = ownerDocument.createElement('div');
  div.style = style;
  ownerDocument.body.appendChild(div);
  const s = { ...getComputedStyle(div) };
  div.remove();
  return s;
}
