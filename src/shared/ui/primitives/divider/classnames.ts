import { VariantProps } from 'tailwind-variants';

import { tv } from '~/shared/lib/utils';

export const dividerTV = tv({
  base: 'bg-divider border-0',
  variants: {
    vertical: {
      false: 'w-full h-px',
      true: 'w-px h-full',
    },
  },
  defaultVariants: {
    vertical: false,
  },
});

export type DividerTvProps = VariantProps<typeof dividerTV>;
