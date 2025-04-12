import { ElementType, HTMLAttributes } from 'react';

import { PolymorphicComponentProps } from '~/shared/lib/types';

import { Spinner } from '../spinner';

import { buttonTV, ButtonTvProps } from './classnames';

type ButtonBaseProps = HTMLAttributes<HTMLButtonElement> & ButtonTvProps;

export type ButtonProps<C extends ElementType> = PolymorphicComponentProps<C, ButtonBaseProps>;

export function Button<T extends ElementType = 'button'>(props: ButtonProps<T>) {
  const { className, as: Component = 'button', isLoading, isDisabled, color, size, children, variant, ...rest } = props;

  const ButtonClassName = buttonTV({
    className,
    isLoading,
    isDisabled,
    color,
    size,
    variant,
  });

  return (
    <Component className={ButtonClassName} {...rest}>
      {isLoading ? <Spinner className='size-5' color={color} /> : children}
    </Component>
  );
}
