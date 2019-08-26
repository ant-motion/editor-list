import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Radio from 'antd/lib/radio';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';

import Icon from './Icon';
import Gradient from './GradientEdit';

import RowHelp from './RowHelp';
import SelectInput from './SelectInput';
import {
  getBgImageUrl,
  getBgImageType,
  getRadioButton,
  getOption,
  getOptionArray,
  getParentNode,
  defaultBgImageOrGradient,
} from '../../utils';


const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default class BackGroundPop extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    locale: PropTypes.object,
    value: PropTypes.any,
    onChange: PropTypes.func,
    num: PropTypes.number,
    type: PropTypes.string,
  };

  static defaultProps = {
    className: 'editor-bg-image-pop',
  }

  onChange = (k, v) => {
    const { value, num } = this.props;
    Object.keys(value).forEach(key => {
      if (key === k) {
        value[key][num] = v;
      };
    });
    this.props.onChange(value);
  }

  getType = () => {
    const { num, value } = this.props;
    const url = value.image[num];
    return getBgImageType(url);
  }
  getTypeToRender = (type) => {
    const { locale, className } = this.props;
    return (
      <Row gutter={8} className={`${className}-type`}>
        <Col span={3}>
          <Icon type="bg-type" prompt={locale.type} />
        </Col>
        <Col span={21}>
          <RadioGroup
            value={type}
            size="small"
            onChange={(e) => {
              const v = e.target.value;
              this.onChange('image', defaultBgImageOrGradient[v]);
            }}
          >
            {['img', 'linear', 'radial'].map(key => (
              <RadioButton value={key} key={key}>
                <Icon type={key === 'img' ? 'picture' : `bg-type-${key}`} prompt={locale[key]} destroyTooltipOnHide />
              </RadioButton>
            ))}
          </RadioGroup>
        </Col>
      </Row>
    );
  }

  getCommon = () => {
    const { locale, value, num } = this.props;
    return [
      <RowHelp
        title={<Icon type="filter" prompt={locale.blendMode} />}
        help={locale.blendModeHelp}
        key="filter"
      >
        <Select
          style={{ width: '100%' }}
          value={value.blendMode[num]}
          size="small"
          onChange={(e) => {
            this.onChange('blendMode', e);
          }}
          getPopupContainer={node => getParentNode(node, 'editor-list')}
          dropdownMatchSelectWidth={false}
          dropdownClassName="editor-list-dropdown"
        >
          {getOptionArray(this.blendMode)}
        </Select>
      </RowHelp>,
      <RowHelp
        title={<Icon type="clip" prompt={locale.clip} />}
        help={locale.clipHelp}
        key="clip"
      >
        <Select
          style={{ width: '100%' }}
          value={value.clip[num]}
          size="small"
          onChange={(e) => {
            this.onChange('clip', e);
          }}
          getPopupContainer={node => getParentNode(node, 'editor-list')}
          dropdownMatchSelectWidth={false}
          dropdownClassName="editor-list-dropdown"
        >
          {getOption(locale.clipSelect)}
        </Select>
      </RowHelp>,
      <Row gutter={8} key="attachment">
        <Col span={3}>
          <Icon type="attachment" prompt={locale.attachment} />
        </Col>
        <Col span={21}>
          <RadioGroup
            value={value.attachment[num]}
            size="small"
            onChange={(e) => {
              const v = e.target.value;
              this.onChange('attachment', v);
            }}
          >
            {getRadioButton(this.attachment)}
          </RadioGroup>
        </Col>
      </Row>
    ];
  }

  getGradientChild = (type) => {
    const { className, ...props } = this.props;
    return (
      <div>
        <Gradient {...props} type={type} />
        {this.getCommon()}
      </div>
    )
  }

  getImageChild = () => {
    const { locale, value, num } = this.props;
    return (
      <div>
        <Row gutter={8}>
          <Col span={3}>
            <Icon type="picture" prompt={locale.image} />
          </Col>
          <Col span={21}>
            <Input
              value={getBgImageUrl(value.image[num])}
              onChange={(e) => {
                const v = e.target.value;
                this.onChange('image', `url(${v})`);
              }}
              size="small"
              placeholder="Add image url"
            />
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={3}>
            <Icon type="repeat" prompt={locale.repeat} />
          </Col>
          <Col span={21}>
            <Select
              style={{ width: '100%' }}
              value={value.repeat[num]}
              size="small"
              onChange={(e) => {
                this.onChange('repeat', e);
              }}
              getPopupContainer={node => getParentNode(node, 'editor-list')}
              dropdownMatchSelectWidth={false}
              dropdownClassName="editor-list-dropdown"
            >
              {getOption(locale.repeatSelect)}
            </Select>
          </Col>
        </Row>
        <RowHelp
          title={
            <Icon type="imagePosition" prompt={locale.position} />
          }
          help={locale.position_help}
        >
          <SelectInput
            style={{ width: '100%' }}
            value={value.position[num] || ''}
            size="small"
            onChange={(e) => {
              this.onChange('position', e);
            }}
          >
            {getOptionArray(this.position)}
          </SelectInput>
        </RowHelp>
        <RowHelp
          title={<Icon type="size" prompt={locale.size} />}
          help={locale.size_help}
        >
          <SelectInput
            style={{ width: '100%' }}
            value={value.size[num] || ''}
            size="small"
            onChange={(e) => {
              this.onChange('size', e);
            }}
          >
            {getOptionArray(this.size)}
          </SelectInput>
        </RowHelp>
        {this.getCommon()}
      </div>
    );
  }

  getChildToRender = (type) => {
    switch (type) {
      case 'img':
        return this.getImageChild();
      case 'linear':
      case 'radial':
        return this.getGradientChild(type);
      default:
        return null;
    }
  }

  position = ['center', 'center left', 'center right', 'top', 'top left',
    'top right', 'bottom', 'bottom left', 'bottom right'];

  size = ['100%', '100% 50%', 'auto', 'contain', 'cover'];

  attachment = ['scroll', 'local', 'fixed'];

  blendMode = ['normal', 'multiply', 'screen', 'overlay', 'darken',
    'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light',
    'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

  clip = ['border-box', 'padding-box', 'content-box'];

  render() {
    const { className } = this.props;
    const type = this.getType();
    const typeToRender = this.getTypeToRender(type);
    const childToRender = this.getChildToRender(type);
    return (
      <div className={className}>
        {typeToRender}
        {childToRender}
      </div>
    );
  }
}