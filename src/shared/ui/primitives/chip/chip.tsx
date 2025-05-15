import { ElementType, HTMLAttributes } from 'react';

import { PolymorphicComponentProps } from '~/shared/lib/types';

import { chipTV, ChipTvProps } from './classnames';

type ChipBaseProps = HTMLAttributes<HTMLDivElement> & ChipTvProps;

export type ChipProps<C extends ElementType> = PolymorphicComponentProps<C, ChipBaseProps>;

export function Chip<T extends ElementType = 'div'>(props: ChipProps<T>) {
  const { className, as: Component = 'div', color, size, children, variant, ...rest } = props;

  const ChipClassName = chipTV({
    className,
    color,
    size,
    variant,
  });

  return (
    <Component className={ChipClassName} {...rest}>
      {children}
    </Component>
  );
}
