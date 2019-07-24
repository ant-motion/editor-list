export default {
  EditorClassName: {
    header: 'ClassName Select',
    exclusive: 'Exclusive style',
    common: 'Other style editing on the label',
  },
  EditorState: {
    header: 'Status',
    cursor: 'Mouse cursor status',
    cursor_select: {
      auto: 'auto',
      pointer: 'pointer',
      crosshair: 'crosshair',
      move: 'move',
      text: 'text',
      wait: 'wait',
      help: 'help',
    },
    style: 'Style status',
    style_select: {
      default: 'default',
      hover: 'hover',
      active: 'active',
      focus: 'focus',
    },
  },
  EditorLayout: {
    header: 'Layout',
    name: 'Current display',
    displaySelect: {
      block: 'Displays an element as a block element.',
      flex: 'Displays an element as a block-level flex container.',
      'inline-block': 'Displays an element as an inline-level block container.',
      inline: 'plays an element as an inline element.',
      none: 'The element is completely removed.',
    },
    flexName: {
      alignItems: {
        name: 'Vertical',
        icon: 'column-height',
      },
      justifyContent: {
        name: 'Horizontal',
        icon: 'column-width',
      },
    },
    flexSelect: {
      alignItems: {
        stretch: 'Element are stretched to fit the container.',
        'flex-start': 'Element are positioned at the beginning of the container.',
        center: 'Element are positioned at the center of the container.',
        'flex-end': 'Element are positioned at the end of the container.',
        baseline: 'Element are positioned at the baseline of the container.',
      },
      justifyContent: {
        'flex-start': 'Element are positioned at the beginning of the container.',
        center: 'Element are positioned at the center of the container.',
        'flex-end': 'Element are positioned at the end of the container.',
        'space-between': 'Element are positioned with space between the lines.',
        'space-around': 'Element are positioned with space before, between, and after the lines.',
      },
    },
  },
  EditorFont: {
    header: 'Font',
    font: 'Font family',
    size: 'Size',
    bold: 'Bold',
    lineHeight: 'Line height',
    letterSpacing: 'Letter spacing',
    color: 'Color',
    placeholder: 'Please input',
  },
  EditorInterface: {
    header: 'Interface',
    overflow: 'Overflow',
    overflow_select: {
      visible: 'visible',
      hidden: 'hidden',
      scroll: 'scroll',
      auto: 'auto',
    },
    width: 'Width',
    height: 'Height',
    position: 'Position',
    position_select: {
      static: 'static',
      absolute: 'absolute',
      relative: 'relative',
      fixed: 'fixed',
    },
    position_help: 'Please select the current corresponding positioning. ' +
      'If it is absolute positioning, please turn on the relative positioning of the parent, ' +
      'otherwise it will be positioned with the top level with relative positioning.',
  },
  EditorBackGround: {
    header: 'Background',
    image: 'Image url',
    color: 'Color',
    repeat: 'Repeat',
    position: 'Position',
    position_help: 'Custom values (x, y) can be set, such as: 50px 100px',
    size: 'Size',
    size_help: 'Custom values (width, height) can be set, such as: 50px 100px',
    attachment: 'Attachment',
    repeat_select: {
      repeat: 'repeat',
      'repeat-x': 'repeat-x',
      'repeat-y': 'repeat-y',
      'no-repeat': 'no-repeat',
    },
  },
  EditorBorder: {
    header: 'Border',
    tags: {
      width: 'width',
      color: 'color',
      style: 'style',
      radius: 'radius',
    },
  },
  EditorMargin: {
    header: 'Margin',
    tags: {
      margin: 'margin',
      padding: 'padding',
    },
  },
  EditorShadow: {
    header: 'Shadow',
    tags: {
      boxShadow: 'boxShadow',
      textShadow: 'textShadow',
    },
    switch: 'Switch',
    inner: 'Inner',
    offset: 'Offset',
    blur: 'Blur',
    offset_help: 'The x-axis on the left and the y-axis on the right',
    spread: 'Spread',
    color: 'Color',
  },
  EditorTransition: {
    header: 'Transition',
    name: 'Name',
    time: 'Time',
    ease: 'Ease',
    delay: 'Delay',
  },
  EditorCss: {
    header: 'Code edit',
  },
};
