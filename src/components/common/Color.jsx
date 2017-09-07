import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import TweenOne from 'rc-tween-one';
import classnames from 'classnames';
import { SketchPicker } from 'react-color';
import { alphaBg, isColor } from '../../utils';

const TweenOneGroup = TweenOne.TweenOneGroup;

class Color extends React.Component {
  static propsTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
  };

  static defaultProps = {
    title: '颜色',
  };

  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
      showPicker: false,
    };
  }

  componentDidMount() {
    this.container = this.defaultGetContainer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color !== this.state.color) {
      this.setState({
        color: nextProps.color,
      });
    }
  }

  componentDidUpdate() {
    const colorRect = this.colorDom.getBoundingClientRect();
    const windowRect = {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight,
      scrollTop: document.body.scrollTop,
    };
    this.renderPickerComponent({ windowRect, colorRect });
  }

  componentWillUnmount() {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }

  defaultGetContainer = () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
  };

  getStyle = (rect) => {
    const r = {
      w: 220,
      h: 309,
    };
    const w = rect.windowRect;
    const c = rect.colorRect;
    let top = w.scrollTop + c.top + 20;
    let left = c.left - r.w / 2 + c.width / 2;
    let transformOrigin = '50% 0';
    left = left < 10 ? 10 : left;
    if (c.top + r.h > w.height) {
      top = c.top - r.h - 10;
      transformOrigin = '50% 100%';
    }
    if (left + r.w > w.width) {
      left = w.width - r.w - 10;
    }
    return {
      top,
      left,
      transformOrigin
    };
  };

  getColorPicker = (rect) => {
    const { color } = this.state;
    const className = classnames({
      'editor-color-picker-wrapper': true,
      'editor-color-picker-show': this.state.showPicker,
    });
    const style = this.getStyle(rect);
    const pos = {
      top: style.top,
      left: style.left
    };
    const origin = style.transformOrigin;
    const rotateX = origin === '50% 100%' ? 45 : -45;
    return (
      <div className={className}>
        <div className="editor-color-mask" onClick={this.closeColorPicker} />
        <TweenOneGroup
          className="editor-color-picker"
          enter={{ rotateX, opacity: 0, type: 'from', duration: 300, ease: 'easeOutCirc' }}
          leave={{ rotateX, opacity: 0, duration: 300, ease: 'easeInOutCirc' }}
          style={pos}
        >
          {this.state.showPicker &&
          <div style={{ transformOrigin: origin }} key="picker">
            <SketchPicker
              color={color && isColor(color) ? color : 'rgba(0,0,0,0)'}
              presetColors={[
                '#f04134',
                '#00a854',
                '#108ee9',
                '#f5317f',
                '#f56a00',
                '#7265e6',
                '#ffbf00',
                '#00a2ae',
                '#222222',
                '#404040',
                //'#5a5a5a',
                '#919191',
                '#bfbfbf',
                '#d9d9d9',
                '#e9e9e9',
                //'#f5f5f5',
                // '#f7f7f7',
                '#fbfbfb',
                'transparent',
              ]}
              onChange={this.colorHandleChange}
            />
          </div>}
        </TweenOneGroup>
      </div>);
  }

  renderPickerComponent = (rect) => {
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getColorPicker(rect), this.container);
  }

  colorHandleChange = (value) => {
    const rgb = value.rgb;
    const color = rgb.a === 1 ? value.hex : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    this.setState({
      color,
    });

    this.props.onChange && this.props.onChange(color);
  };

  closeColorPicker = () => {
    this.setState({
      showPicker: false,
    });
  };

  colorClick = () => {
    this.setState({
      showPicker: true,
    });
  };

  inputChange = (e) => {
    const target = e.target;
    this.setState({
      color: target.value,
    });
    this.props.onChange && this.props.onChange(target.value);
  };

  removeColor = () => {
    this.setState({
      color: null,
    });
    this.props.onChange && this.props.onChange();
  }

  render() {
    const { ...props } = this.props;
    ['title', 'color', 'onChange', 'type'].map(key => delete props[key]);

    const { color } = this.state;
    const className = classnames({
      'editor-color': true,
      'active': this.state.showPicker,
    });
    const children = (<a
        className={className}
        style={{ background: `#fff url(${alphaBg})` }}
        onClick={this.colorClick}
        ref={c => {
          this.colorDom = c
        }}
      >
        <i style={{ background: color }}
          className={`${!color ? 'no-color' : ''}`}
        >
          {!color && (<svg width="100%" height="100%" viewBox="0 0 60 20" id="no-color">
            <g id="Page-1">
              <path d="M0.5,19.5 L59.5,0.5" id="Line" stroke="#FF0000" />
            </g>
          </svg>)}
        </i>

      </a>
    );
    const classNameWrapper = classnames({
      'editor-color-wrapper': true,
      [props.className]: true,
    });
    if (this.props.type === 'cut') {
      return (<div {...props} className={classNameWrapper}>
        {children}
        <span className="color-close" onClick={this.removeColor}>
          <Icon type="close" />
        </span>
      </div>)
    }

    return (
      <Row {...props} className={classNameWrapper} gutter={8}>
        <Col span={4}>
          {this.props.title}
        </Col>
        <Col span={8} style={{ position: 'relative' }}>
          {children}
        </Col>
        <Col span={12}>
          <Input value={color} onChange={this.inputChange} size="small" placeholder="添加颜色" />
        </Col>
      </Row>
    );
  }
}

export default Color;