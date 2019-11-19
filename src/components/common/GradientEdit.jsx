import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';
import { polyfill } from 'react-lifecycles-compat';
import Icon from './Icon';
import Color from './Color';

import RowHelp from './RowHelp';
import SelectInput from './SelectInput';

import { alphaBg, unitToPercent, colorLookup, colorExp, linearGradientToDeg, getRadioButton, getOptionArray, getOption } from '../../utils';

const { Option } = Select;
const InputGroup = Input.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class GradientEdit extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    locale: PropTypes.object,
    value: PropTypes.any,
    onChange: PropTypes.func,
    num: PropTypes.number,
    type: PropTypes.string,
  };

  static defaultProps = {
    className: 'editor-gradient',
  }

  static getDerivedStateFromProps(props, { prevProps, $self }) {
    let nextState = {
      prevProps: props,
    };
    if (prevProps && prevProps.type !== props.type) {
      $self.percentRef.state.value = 0;
      nextState = {
        ...nextState,
        ...$self.getGradientData(props),
        active: 0,
      }
    }
    return nextState;
  }

  constructor(props) {
    super(props);
    this.pos = {};

    this.shape = ['circle', 'ellipse'];

    this.extent = ['farthest-corner', 'farthest-side', 'closest-corner', 'closest-side'];

    this.position = ['center', 'center left', 'center right', 'top', 'top left',
      'top right', 'bottom', 'bottom left', 'bottom right'];
    this.state = {
      ...this.getGradientData(props),
      active: 0,
      $self: this,
    };
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.onPointMove);
    window.addEventListener('mouseup', this.onPointUp);

  }

  onBarClick = (e) => {
    const { gradient } = this.state;
    const rect = this.bar.getBoundingClientRect();
    const x = e.clientX || e.pageX;
    const currentPercent = (((x - rect.x) / rect.width) * 100).toFixed(2);
    const current = ['black', `${currentPercent}%`];
    // const index = gradient.filter(c => (parseFloat(c[1])) < currentPercent).length - 1;
    // gradient.splice(index, 0, current);
    gradient.push(current);
    gradient.sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]));
    this.setState({
      gradient,
      active: gradient.findIndex((c) => c === current),
    }, this.onChange);
  }

  onPointClick = (e, i) => {
    this.setState({
      active: i
    });
    const { gradient } = this.state;
    this.isDrag = true;
    this.current = gradient[i][1];
    this.pos = {
      x: e.clientX || e.pageX,
      y: e.clientY || e.pageY,
    };
    this.barRect = this.bar.getBoundingClientRect();
    this.percentRef.state.value = parseFloat(this.current) || (i ? 100 : 0);
  }

  onPointUp = (e) => {
    if (this.isDrag) {
      const { active, gradient } = this.state;
      const y = e.clientY || e.pageY;
      const differ = Math.abs(y - this.pos.y);
      if (differ > 40 && gradient.length > 2) {
        gradient.splice(active, 1);
        this.setState({
          active: 0,
          gradient,
        }, this.onChange);
      }
      this.isDrag = false;
      this.pos = {};
      this.onChange();
    }
  }

  onPointMove = (e) => {
    if (this.isDrag) {
      const { active: i, gradient: g } = this.state;
      const gradient = [...g];
      const x = e.clientX || e.pageX;
      const rect = this.barRect;// this.bar.getBoundingClientRect();
      const w = rect.width - 8;
      // 只支持百分比，不对 px 做处理；
      let p = this.current ? parseFloat(this.current) / 100 : 0;
      p = p > 1 ? 1 : p;
      p = p < 0 ? 0 : p;
      let differ = x - this.pos.x + (p * w);
      differ = differ / w * 100;

      differ = differ > 100 ? 100 : differ;
      differ = differ < 0 ? 0 : differ;
      const str = i ? '100%' : '0%'
      gradient[i][1] = differ ? `${differ}%` : str;
      const gradientCurrent = gradient[i];
      gradient.sort((a, b) => {
        return (parseFloat(a[1]) - parseFloat(b[1]))
      });
      const active = gradient.findIndex((t) => t === gradientCurrent);
      // 控制 ref 里的 state，在下一次 render 时更新 defaultValue 的值；
      this.percentRef.state.value = differ || parseFloat(str);
      this.active = active;
      this.setState({
        gradient,
        active
      }, () => {
        this.onChange(true);
      });
    }
  }

  onPercentChange = () => {
    this.isPressEnter = false;
  }

  onPercentBlur = (e) => {
    if (!this.isPressEnter) {
      const v = e.target.value.replace(/[^0-9.-]/g, '');
      const { active, gradient } = this.state;

      gradient[active][1] = `${v || 0}%`;
      this.percentRef.state.value = v || 0;
      this.setState({
        gradient,
      }, this.onChange);
    }
  }
  onPercentPressEnter = (e) => {
    this.onPercentBlur(e);
    this.isPressEnter = true;
  }

  onColorChange = (e, isDrag) => {
    const { active, gradient } = this.state;
    gradient[active][0] = e;
    this.setState({
      gradient,
    }, () => {
      this.onChange(isDrag);
    });
  }

  onRepeatChange = (e) => {
    this.setState({
      repeat: e.target.checked,
    }, this.onChange);
  }

  onChangeType = (key, v) => {
    let { type: contentType } = this.state;
    const { type } = this.props;
    if (type === 'linear') {
      let { value, uint } = this.getLinearFeat(contentType);
      switch (key) {
        case 'deg':
          value = linearGradientToDeg[v] || linearGradientToDeg[v] === 0 ? linearGradientToDeg[v] : v || 0;
          break;
        case 'uint':
          uint = v || 'deg';
          break;
        default:
          break;
      }
      contentType = `${value}${value || value === 0 ? uint || 'deg' : ''}`.trim();
    } else {
      let { shape, extent, position } = this.getRadialFeat(contentType);
      switch (key) {
        case 'shape':
          shape = v === this.shape[0] ? '' : v;
          break;
        case 'extent':
          extent = v === this.extent[0] ? '' : v;
          break;
        case 'position':
          position = v === 'center' ? '' : v;
          break;
        default:
          break;
      }
      contentType = `${shape} ${extent} ${position ? 'at' : ''} ${position}`.trim();
    }
    this.setState({
      type: contentType,
    }, this.onChange);
  }

  onChange = (isDrag) => {
    const { type, value, num, onChange } = this.props;
    const { type: contentType, gradient, repeat } = this.state;
    const name = `${repeat ? 'repeating-' : ''}${type}-gradient`;
    const gradientStr = `${name}(${contentType ? `${contentType}, ` : ''}${gradient.map(c => c.join(' ')).join(',')})`;
    value.image[num] = gradientStr;
    if (onChange) {
      onChange(value, isDrag);
    }
  }

  getGradientData = (props) => {
    const { value, num } = props;
    const gradientArray = this.getGradientArray(props);
    const isRadial = gradientArray[0].match(/at|circle|ellipse/);
    const isLinear = gradientArray[0].match(/deg|turn|rad|grad|to\s+[a-z]/g);
    const type = isRadial || isLinear ? gradientArray.shift() : '';
    const gradient = gradientArray.map((str, i) => {
      const $str = str.replace(colorExp, (e) => e.replace(/\s+/g, ''));
      const item = $str.split(' ');
      if (!item[1]) {
        if (!i) {
          item[1] = '0%';
        } else if (i === gradientArray.length - 1) {
          item[1] = '100%';
        } else {
          console.error(`gradient error: ${props.value.image[props.num]}`)
        }
      }
      const uint = item[1].replace(/[\d+.-]/g, '');
      if (uint !== '%') {
        item[1] = unitToPercent(props.editorElem, item[1], uint);
      }
      return item;
    });
    return {
      type,
      gradient,
      repeat: !!value.image[num].match(/^repeating/),
    }
  }

  getRadialFeat = (contentType) => {
    const typeArray = contentType.split(' at ');
    const shapeOrExtent = typeArray[0].split(' ');
    const shape = this.shape.indexOf(shapeOrExtent[0]) >= 0 ? shapeOrExtent[0] : '';
    let extent = shapeOrExtent[1] && this.extent.indexOf(shapeOrExtent[1]) >= 0 ? shapeOrExtent[1] : '';
    extent = shapeOrExtent[0] && this.extent.indexOf(shapeOrExtent[0]) >= 0 ? shapeOrExtent[0] : extent;
    const position = typeArray[1] || '';
    return {
      shape,
      extent,
      position,
    };
  }

  getLinearFeat = (contentType) => {
    const str = contentType.match(/deg|turn|rad|grad/) ? contentType : linearGradientToDeg[contentType] || '';
    const value = parseFloat(str) || parseFloat(str) === 0 ? parseFloat(str) : '';
    let uint = str.toString().replace(/[^a-z]/ig, '');
    if (uint === 'turn') {
      console.warn('不支持 turn 为单位，自动转换为 deg');
      uint = 'deg';
    }
    return {
      value,
      uint,
    };
  }

  getGradientArray = ({ value, num }) =>
    value.image[num].replace(/.*gradient\((.*)\)/, '$1').split(/,\s?(?=[a-z#])/g);


  getFeatChildToRender = () => {
    /**
     * 圆形渐变
     * (shape extent-keyword at position, color)
     * 线性渐变
     * (side-or-corner || angle, color position) // 颜色后面只支持一个位置百分比; 只支持渐变的效果，画栅格可以加点。
     */
    const { type, className, locale } = this.props;
    const { type: contentType } = this.state;
    if (type === 'linear') {
      const { uint, value } = this.getLinearFeat(contentType);
      return (
        <div className={`${className}-feat`}>
          <RowHelp
            title={
              <Icon type="reload" prompt={locale.angle} />
            }
            help={locale.angleHelp}
          >
            <InputGroup compact>
              <SelectInput
                style={{ width: 'calc(100% - 60px)' }}
                value={value.toString()}
                size="small"
                onChange={(e) => {
                  this.onChangeType('deg', e);
                }}
              >
                {getOption(linearGradientToDeg)}
              </SelectInput>
              <Select
                size="small"
                value={uint || 'deg'}
                style={{ width: 60 }}
                onChange={(e) => {
                  this.onChangeType('uint', e);
                }}
              >
                <Option value="deg">deg</Option>
                <Option value="rad">rad</Option>
                <Option value="grad">grad</Option>
              </Select>
            </InputGroup>
          </RowHelp>
        </div>
      );
    }
    const { shape, extent, position } = this.getRadialFeat(contentType);
    return (
      <div className={`${className}-feat`}>
        <Row gutter={8}>
          <Col span={3}><Icon type="shape" prompt={locale.shape} /></Col>
          <Col span={21}>
            <RadioGroup
              value={shape || this.shape[0]}
              size="small"
              onChange={(e) => {
                const v = e.target.value;
                this.onChangeType('shape', v);
              }}
            >
              {getRadioButton(this.shape)}
            </RadioGroup>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={3}><Icon type="extent" prompt={locale.extent} /></Col>
          <Col span={21}>
            <RadioGroup
              value={extent || this.extent[0]}
              size="small"
              onChange={(e) => {
                const v = e.target.value;
                this.onChangeType('extent', v);
              }}
            >
              {Object.keys(locale.extentSelect).map(key => (
                <RadioButton value={key} key={key}>
                  <Icon type={key} prompt={locale.extentSelect[key]} />
                </RadioButton>
              ))}
            </RadioGroup>
          </Col>
        </Row>
        <RowHelp
          title={
            <Icon type="imagePosition" prompt={locale.radialPosition} />
          }
          help={locale.position_help}
        >
          <SelectInput
            style={{ width: '100%' }}
            value={position || 'center'}
            size="small"
            onChange={(e) => {
              this.onChangeType('position', e);
            }}
          >
            {getOptionArray(this.position)}
          </SelectInput>
        </RowHelp>
      </div>
    )

  }

  render() {
    const { className, locale } = this.props;
    const { active, gradient, repeat } = this.state;

    const point = gradient.map((item, i) => {
      let left = item[1];
      left = parseFloat(left) > 100 ? '100%' : left;
      left = parseFloat(left) < 0 ? '0%' : left;
      const classNames = classnames(`${className}-point`, {
        active: active === i,
      });
      const style = {
        left,
      };
      if (active === i) {
        style.backgroundColor = item[0]
      }
      return (
        <div
          className={classNames}
          style={style}
          key={i.toString()}
          onClick={(e) => {
            if (e.stopPropagation) {
              e.stopPropagation();
            } else {
              e.cancelBubble = true;
            }
          }}
          onMouseDown={(e) => {
            this.onPointClick(e, i);
          }}
          onMouseUp={this.onPointUp}
          onContextMenu={this.onPointUp}
        />
      )
    });
    const value = gradient[active];
    const featChild = this.getFeatChildToRender();
    return (
      <div className={className}>
        <Row gutter={8} key="repeat" className={`${className}-color`}>
          <Col span={21}>
            <Checkbox onChange={this.onRepeatChange} checked={repeat}>{locale.repeatGradient}</Checkbox>
          </Col>
          <Col span={3}>
            <Icon type="question-circle" prompt={locale.barHelp} />
          </Col>
        </Row>
        <div
          className={`${className}-bar`}
          style={{
            backgroundImage: `linear-gradient(to right, ${
              gradient.map(item => item.join(' ')).join(',')}), url(${alphaBg})`
          }}
          onClick={this.onBarClick}
          ref={(c) => {
            this.bar = c;
          }}
        >
          <div className={`${className}-bar-item`}>
            {point}
          </div>
        </div>
        <Row gutter={8} key="color" className={`${className}-color`}>
          <Col span={16} gutter={0}>
            <Color
              span={[5, 7, 12]}
              title={<Icon type="bg-colors" prompt={locale.color} />}
              color={colorLookup[value[0]] || value[0]}
              onChange={(e, isDrag) => {
                this.onColorChange(e, isDrag);
              }}
            />
          </Col>
          <Col span={8}>
            <Input
              defaultValue={parseFloat(value[1] || '')}
              ref={(c) => { this.percentRef = c; }}
              size="small"
              addonAfter="%"
              onChange={this.onPercentChange}
              onBlur={this.onPercentBlur}
              onPressEnter={this.onPercentPressEnter}
            />
          </Col>
        </Row>
        {featChild}
      </div>
    );
  }
}

export default polyfill(GradientEdit);
