import { VariantProps } from 'tailwind-variants';

import { tv } from '~/shared/lib/utils';

export const avatarTV = tv({
  base: 'rounded-full bg-default-50 border border-divider dark:border-divider-100 overflow-hidden flex items-center justify-center shrink-0',
});

export type AvatarTvProps = VariantProps<typeof avatarTV>;
