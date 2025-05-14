import { VariantProps } from 'tailwind-variants';

import { tv } from '~/shared/lib/utils';

export const scrollAreaTV = tv({
  slots: {
    root: '',
    scrollbar:
      'p-[1px] data-[state=visible]:motion-opacity-in-0 data-[state=hidden]:motion-opacity-out-0 user-select-none pointer-events-auto',
    verticalScrollbar: 'w-2',
    horizontalScrollbar: 'h-2',
    thumb: 'bg-foreground/20 hover:bg-foreground/40 transition-colors rounded-full',
  },
});

export type ScrollAreaVariants = VariantProps<typeof scrollAreaTV>;
