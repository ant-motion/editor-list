import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import { Icon } from '@ant-design/compatible';
import Popover from 'antd/lib/popover';
import classnames from 'classnames';
import { SketchPicker } from 'react-color';
import { alphaBg, isColor, getParentNode } from '../../utils';

class Color extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.any,
    color: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    span: PropTypes.array,
    gutter: PropTypes.number,
  };

  static defaultProps = {
    title: '颜色',
    onChange: () => { },
    span: [3, 9, 12],
    gutter: 8,
  };
  static getDerivedStateFromProps(props, { prevProps }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && prevProps.color !== props.color) {
      nextState.color = props.color;
    }
    return nextState;
  }

  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      color: props.color,
    };
  }
  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = (e) => {
    // 渐变条没有样式，取上级样式，有个预览小块，用 style 判断；
    const isWhite = getParentNode(e.target, ['saturation-white', 'flexbox-fix', ''], true);
    if (isWhite) {
      this.isColorDown = true;
    }
  }

  onMouseUp = (e) => {
    if (this.isColorDown) {
      const domStyle = e.target.style;
      // react-color 里的预览小块，无法判断，用 style 判断;
      const noPreviewDom = !(domStyle.background &&
        domStyle.right === '0px' &&
        domStyle.top === '0px' &&
        domStyle.left === '0px' &&
        domStyle.bottom === '0px' &&
        domStyle.borderRadius === '2px' &&
        domStyle.position === 'absolute' &&
        domStyle.boxShadow);
      this.isColorDown = false;
      if (noPreviewDom) {
        this.props.onChange(this.state.color);
      }
    }
  }

  getColorPicker = () => {
    const { color } = this.state;
    // react-color 没有 mouseup 事件，加在外层；
    return (
      <div key="picker"
        onMouseDown={this.onMouseDown}
      >
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
            // '#5a5a5a',
            '#919191',
            '#bfbfbf',
            '#d9d9d9',
            '#e9e9e9',
            // '#f5f5f5',
            // '#f7f7f7',
            '#fbfbfb',
            'transparent',
          ]}
          onChange={this.colorHandleChange}
        />
      </div>);
  }

  colorHandleChange = (value) => {
    const rgb = value.rgb;
    const color = rgb.a === 1 ? value.hex : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    this.setState({
      color,
    }, () => {
      if (!this.isColorDown) {
        this.props.onChange(color);
      } else {
        this.props.onChange(color, true);
      }
    });
  }

  closeColorPicker = () => {
    this.setState({
      showPicker: false,
    });
  };

  handleVisibleChange = showPicker => {
    this.setState({ showPicker });
  };

  inputBlur = (e) => {
    const target = e.target;
    if (this.props.color !== target.value) {
      this.props.onChange(target.value);
    }
  };

  inputChange = (e) => {
    const target = e.target;
    this.setState({
      color: target.value,
    });
  };

  removeColor = () => {
    if (this.props.color !== 'initial') {
      this.props.onChange('initial');
    }
  }

  render() {
    const { title, onChange, type, span, ...props } = this.props;
    const { color } = this.state;
    const className = classnames({
      'editor-color': true,
      active: this.state.showPicker,
    });
    const children = (
      <Popover
        title={false}
        content={this.getColorPicker()}
        trigger="click"
        visible={this.state.showPicker}
        onVisibleChange={this.handleVisibleChange}
        overlayClassName="editor-list-popover"
      >
        <a
          className={className}
          style={{ background: `#fff url(${alphaBg})` }}
        >
          <i
            style={{ background: color }}
            className={`${!color || color === 'initial' ? 'no-color' : ''}`}
          >
            {(!color || color === 'initial') && (<svg width="100%" height="100%" viewBox="0 0 60 20" id="no-color" preserveAspectRatio="none">
              <g id="Page-1">
                <path d="M0.5,19.5 L59.5,0.5" id="Line" stroke="#FF0000" />
              </g>
            </svg>)}
          </i>
        </a>
      </Popover>
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
      </div>);
    }

    return (
      <Row {...props} className={classNameWrapper}>
        <Col span={span[0]}>
          {this.props.title}
        </Col>
        <Col span={span[1]} style={{ position: 'relative' }}>
          {children}
        </Col>
        <Col span={span[2]}>
          <Input
            value={color}
            onBlur={this.inputBlur}
            onPressEnter={this.inputBlur}
            onChange={this.inputChange}
            size="small"
            placeholder="Add color"
          />
        </Col>
      </Row>
    );
  }
}

export default Color;
