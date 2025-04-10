import { VariantProps } from 'tailwind-variants';

import { tv } from '~/shared/lib/utils';

export const flexTV = tv({
  base: '',
  variants: {
    justify: {
      center: 'justify-center',
      start: 'justify-start',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      center: 'items-center',
      start: 'items-start',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    inline: {
      false: 'flex',
      true: 'inline-flex',
    },
    col: {
      true: 'flex-col',
    },
    wrap: {
      true: 'flex-wrap',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-10',
      '3xl': 'gap-12',
      '4xl': 'gap-14',
    },
  },
  defaultVariants: {
    gap: 'md',
    inline: false,
  },
});

export type FlexTvProps = VariantProps<typeof flexTV>;
