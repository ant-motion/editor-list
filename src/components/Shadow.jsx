import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Radio from 'antd/lib/radio';
import Switch from 'antd/lib/switch';
import Tooltip from 'antd/lib/tooltip';
import AntIcon from 'antd/lib/icon';
import { polyfill } from 'react-lifecycles-compat';
import Icon from './common/Icon';
import AutoComplete from './common/AutoComplete';
import Color from './common/Color';

const Panel = Collapse.Panel;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class EditorShadow extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    header: PropTypes.string,
    locale: PropTypes.object,
  };

  static defaultProps = {
    value: {
      boxShadow: {},
      textShadow: {},
    },
    onChange: () => {
    },
  };

  static getDerivedStateFromProps(props, { prevProps }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && prevProps.value !== props.value) {
      const boxShadow = props.value.boxShadow !== 'none' &&
        !!Object.keys(props.value.boxShadow).length;
      const textShadow = props.value.textShadow !== 'none' &&
        !!Object.keys(props.value.textShadow).length;
      nextState.open = {
        boxShadow,
        textShadow,
      };
    }
    return nextState;
  }

  constructor(props) {
    super(props);
    this.defaultShadow = {
      x: '5px',
      y: '5px',
      blur: '5px',
      color: 'rgba(0,0,0,0.35)',
    };
    this.state = {
      key: 'boxShadow',
      open: {
        boxShadow: !!Object.keys(props.value.boxShadow).length,
        textShadow: !!Object.keys(props.value.textShadow).length,
      },
    };
  }

  onChange = (key, v, isDrag) => {
    const keyValue = {
      ...this.defaultShadow,
      [key]: v,
    };
    const { value } = this.props;
    const mValue = { ...value };
    mValue[this.state.key][key] = v;
    Object.keys(keyValue).forEach($key => {
      if (!mValue[this.state.key][$key]) {
        mValue[this.state.key][$key] = keyValue[$key];
      }
    });
    this.props.onChange('shadow', mValue, isDrag);
    this.setState({
      open: {
        ...this.state.open,
        [this.state.key]: true,
      },
    });
  };

  getTabs = () => (
    <RadioGroup value={this.state.key} onChange={this.radioChange} size="small">
      {Object.keys(this.props.locale.tags).map(key => (
        <RadioButton value={key} key={key} className="ant-radio-button-auto-width">
          {this.props.locale.tags[key]}
        </RadioButton>
      ))}
    </RadioGroup>
  );

  openChange = (e) => {
    const { open, key } = this.state;
    const value = {
      ...this.props.value,
      [key]: e ? { ...this.defaultShadow } : 'none',
    };
    this.props.onChange('shadow', value);
    this.setState({
      open: {
        ...open,
        [key]: e,
      },
    });
  }

  radioChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  render() {
    const { value, locale, onChange, ...props } = this.props;
    const { key, open } = this.state;
    return (<Panel {...props} header={props.header || locale.header}>
      {this.getTabs()}
      <div key={key} style={{ marginTop: 10 }}>
        <Row gutter={8}>
          <Col span={6}>
            {locale.switch}
          </Col>
          <Col span={6}>
            <Switch size="small" checked={open[key]} onChange={this.openChange} />
          </Col>
          <Col span={6}>
            {locale.inner}
          </Col>
          <Col span={6}>
            <Switch
              size="small"
              checked={open[key] ? !!value[key].inset : false}
              onChange={(e) => {
                this.onChange('inset', e ? 'inset' : null);
              }}
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={3}>
            <Icon type="offset" prompt={locale.offset} />
          </Col>
          <Col span={9}>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder="offset x"
              value={open[key] ? value[key].x : ''}
              onChange={(e) => {
                this.onChange('x', e);
              }}
            />
          </Col>
          <Col span={9}>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder="offset y"
              value={open[key] ? value[key].y : ''}
              onChange={(e) => {
                this.onChange('y', e);
              }}
            />
          </Col>
          <Col span={3}>
            <Tooltip placement="topRight" arrowPointAtCenter title={locale.offset_help}>
              <AntIcon type="question-circle" />
            </Tooltip>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={3}>
            <Icon type="blur" prompt={locale.blur} />
          </Col>
          <Col span={9}>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder="blur"
              value={open[key] ? value[key].blur : ''}
              onChange={(e) => {
                this.onChange('blur', e);
              }}
            />
          </Col>
          {this.state.key === 'boxShadow' && (
            [
              <Col span={3} key="spread-icon">
                <Icon type="spread" prompt={locale.spread} />
              </Col>,
              <Col span={9} key="1">
                <AutoComplete
                  style={{ width: '100%' }}
                  placeholder="spread"
                  value={open[key] ? value[key].spread : ''}
                  onChange={(e) => {
                    this.onChange('spread', e);
                  }}
                />
              </Col>,
            ]
          )}
        </Row>

        <Color
          color={open[key] ? value[key].color : ''}
          onChange={(e, isDrag) => {
            this.onChange('color', e, isDrag);
          }}
          title={<Icon type="bg-colors" prompt={locale.color} />}
        />
      </div>
    </Panel>);
  }
}

EditorShadow.componentName = 'EditorShadow';

export default polyfill(EditorShadow);
