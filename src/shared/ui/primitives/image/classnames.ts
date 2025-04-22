import { VariantProps } from 'tailwind-variants';

import { tv } from '~/shared/lib/utils';

export const imageTV = tv({
  slots: {
    wrapper: 'relative w-fit h-auto max-w-screen shrink-0',
    image: 'w-full h-full object-cover',
  },
});

export type ImageClassNames = VariantProps<typeof imageTV>;
