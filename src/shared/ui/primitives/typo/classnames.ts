import { VariantProps } from 'tailwind-variants';

import { tv } from '~/shared/lib/utils';

export const typoTV = tv({
  base: '',
  variants: {
    size: {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },
    weight: {
      thin: 'font-thin',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      black: 'font-black',
      extraBold: 'font-extrabold',
      extraBlack: 'font-extrablack',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
  },
});

export type TypoTvProps = VariantProps<typeof typoTV>;
