import React from 'react';
import type { CollapseProps } from 'antd/lib/collapse';

export interface EditorListChangeState {
  /**
   * parent selectors
   */
  parentClassName: string;

  /**
   * edit css value
   */
  cssValue: any;

  /**
   * edit className
   */
  cssName: string;

  /**
   * Selectors replace(/[^a-z]/ig, ''), render style id
   */
  id: string;

  /**
   * edit random id
   */
  editClassName: string;

  /**
   * all css string, including events and terminals
   */
  allCssString: string;

  /**
   * current css string
   */
  currentEditCssString: string;

  /**
   * Is the color or slider changed by dragging
   */
  isDrag: boolean;
}

export interface EditorListProps extends Omit<CollapseProps, 'onChange'> {
  /**
   * editor dom
   */
  editorElem: HTMLElement;

  /**
   * change callback(e: changeCallBack)
   */
  onChange?: (state: EditorListChangeState) => void;

  /**
   * use className or style
   */
  useClassName?: boolean;

  /**
   * edit mobile style
   */
  isMobile?: boolean;

  /**
   * default editor class name, Cannot with current className
   */
  editorDefaultClassName?: string;

  /**
   * parent can use tag name
   */
  parentClassNameCanUseTagName?: boolean;

  /**
   * parent class name length
   */
  parentClassNameLength?: number;

  /**
   * root class name
   */
  rootSelector?: string;

  /**
   * insert css into dom
   */
  cssToDom?: boolean;
}

/**
 * React EditorList Component
 */
export default class EditorList extends React.Component<EditorListProps> {}
