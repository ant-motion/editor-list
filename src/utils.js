import React from 'react';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import ToStyle from 'to-style';

const toStyleString = ToStyle.string;

const Option = Select.Option;

const RadioButton = Radio.Button;

const colorExp = /(#[\d\w]+|\w+\((?:\d+%?(?:,\s)*){3}(?:\d*\.?\d+)?\))/ig;

const sort = { top: 0, right: 1, bottom: 2, left: 3 };

export function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

export const alphaBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4' +
  'T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==';

export function isColor(v) {
  return v.charAt(0) === '#' || v.match(/rgb+(?:a)?\((.*)\)/) || v.charAt(3) === 'hsl';
}

export function firstUpperCase(str) {
  return `${str.charAt(0).toLocaleUpperCase()}${str.slice(1)}`;
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
      }
    }
    return {
      [`borderTop${key}`]: d.top,
      [`borderRight${key}`]: d.right,
      [`borderBottom${key}`]: d.bottom,
      [`borderLeft${key}`]: d.left,
    }
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
  )))
}

export function getComputedStyle(target) {
  return document.defaultView ? document.defaultView.getComputedStyle(target) : {};
}

export function convertData(d) {
  if (!d || d.indexOf('none') >= 0 || d === '0px' || d.indexOf('normal') >= 0) {
    return null
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

export function convertBorderData(d, width) {
  const isColor = d.match(colorExp);
  const dArray = isColor ? isColor : d.split(' ');
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
    return { top, right, bottom, left, };
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

function toStyleUpperCase(d) {
  return d.replace(/-(.?)/, ($1) => ($1.replace('-', '').toLocaleUpperCase()))
}

function fontToCss(d) {
  return Object.keys(d).map(key => {
    const data = d[key];
    if (!data) {
      return
    } else if (key === 'letterSpacing' || key === 'lineHeight' || key === 'color') {
      return `${toCssLowerCase(key)}: ${data};`;
    } else if (key === 'align') {
      return `text-${key}: ${data};`
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
  return array
}

/*
 function borderToCss(d) {
 return Object.keys(d).map(key => {
 const data = d[key];
 if (!data) {
 return;
 }
 if (typeof data === 'string') {
 return `border-${key}: ${data};`;
 }
 return Object.keys(data).map(cKey => {
 const cData = data[cKey];
 if (!cData) {
 return;
 }
 return `border-${cKey}-${key}: ${cData};`
 }).filter(item => item).join('\n');
 }).filter(item => item).join('\n');
 }
 */

function borderToCss(d) {
  let border = {};
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
  return Object.keys(border).map(key => {
    if (key === 'style') {
      return `border: ${border[key].trim()};`
    }
    return `border-${key}: ${border[key].trim()};`
  }).join('\n');
}

function marginToCss(d) {
  // 合并 margin padding, 用一个样式。。toStyleString 样式太多;
  return Object.keys(d).map(key => {
    let style = `${key}: `;
    const data = d[key];
    if (!data) {
      return;
    } else if (typeof data === 'string') {
      return `${style}${data};`;
    }
    const str = cssUnique(Object.keys(data).map(cKey => (data[cKey]))).join(' ');
    return `${style}${str};`;
  }).filter(item => item).join('\n');
}

function shadowToCss(d) {
  return Object.keys(d).map(key => {
    const data = d[key];
    if (!data || !Object.keys(data).length) {
      return;
    }
    return `${toCssLowerCase(key)}: ${data.x} ${data.y} ${data.blur} ${data.spread || ''} ${data.color} ${data.inset || ''}`
      .replace(/\s+/g, ' ').trim();
  }).filter(item => item).join('\n');
}

export function toCss(d) {
  let css = '';
  Object.keys(d).forEach(key => {
    let addCss;
    switch (key) {
      case 'font':
        addCss = fontToCss(d[key]);
        break;
      case 'interface':
        addCss = `${toStyleString(d[key])};`.replace(/;\s+/g, ';\n');
        break;
      case 'background':
        addCss = `${toStyleString({ [key]: d[key] })};`.replace(/;\s+/g, ';\n');
        break;
      case 'border':
        addCss = borderToCss(d[key]);
        break;
      case 'margin':
        addCss = marginToCss(d[key]);
        break;
      case 'shadow':
        addCss = shadowToCss(d[key]);
        break;
      default:
        break;
    }
    if (addCss && addCss !== ';') {
      css = css && addCss ? `${css}
${addCss}` : addCss;
    }
  });
  return css
}
