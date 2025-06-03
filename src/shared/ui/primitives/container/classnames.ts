import { VariantProps } from 'tailwind-variants';

import { tv } from '~/shared/lib/utils';

export const containerTV = tv({
  base: 'mx-auto w-full',
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export type ContainerTvProps = VariantProps<typeof containerTV>;
