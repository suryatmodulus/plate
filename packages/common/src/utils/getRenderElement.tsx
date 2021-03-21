import * as React from 'react';
import {
  RenderNodeOptions,
  TRenderElementProps,
} from '@udecode/slate-plugins-core';
import { castArray } from 'lodash';
import { DefaultElement } from 'slate-react';
import { getSlateClass } from './getSlateClass';

/**
 * Get a `renderElement` handler for a list of types.
 * If the given `type` is equals to the slate element type, render the given `component`.
 */
export const getRenderElement = (
  options: RenderNodeOptions | RenderNodeOptions[]
) => ({ attributes, element, children }: TRenderElementProps) => {
  const _options = castArray<RenderNodeOptions>(options);

  for (const option of _options) {
    const { type, component: Element = DefaultElement, getNodeProps } = option;

    if (element.type === type) {
      const nodeProps =
        getNodeProps?.({ attributes, element, children }) ??
        element.attributes ??
        {};

      return (
        <Element
          className={getSlateClass(type)}
          attributes={attributes}
          element={element}
          nodeProps={nodeProps}
        >
          {children}
        </Element>
      );
    }
  }
};