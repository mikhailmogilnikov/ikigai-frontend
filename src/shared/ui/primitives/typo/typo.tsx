import { Ref } from 'react';

import { PolymorphicComponentProps } from '~/shared/lib/types';

import { typoTV, TypoTvProps } from './classnames';

type TypoBaseProps = TypoTvProps;

type TypoAttributes = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

export type TypoProps<C extends TypoAttributes> = PolymorphicComponentProps<C, TypoBaseProps>;

export const Typo = <T extends TypoAttributes = 'p'>(props: TypoProps<T>) => {
  const { children, as: Component = 'p', className, ref, size, weight, ...rest } = props;

  const domRef = ref as Ref<HTMLParagraphElement>;

  const TypoClassName = typoTV({
    size,
    weight,
    className,
  });

  return (
    <Component ref={domRef} className={TypoClassName} {...rest}>
      {children}
    </Component>
  );
};
