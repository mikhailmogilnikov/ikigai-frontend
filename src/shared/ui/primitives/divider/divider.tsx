import { HTMLAttributes } from 'react';

import { dividerTV, DividerTvProps } from './classnames';

export type DividerProps = HTMLAttributes<HTMLHRElement> & DividerTvProps;

export const Divider = (props: DividerProps) => {
  const { className, vertical, ...rest } = props;

  const dividerClass = dividerTV({ vertical, className });

  return <hr className={dividerClass} {...rest} />;
};

Divider.displayName = 'Divider';
