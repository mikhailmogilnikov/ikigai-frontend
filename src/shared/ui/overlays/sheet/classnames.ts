import { VariantProps } from 'tailwind-variants';

import { tv } from '~/shared/lib/utils';

export const sheetTV = tv({
  slots: {
    overlay:
      'data-[state=closed]:motion-opacity-out data-[state=open]:motion-opacity-in fixed inset-0 z-50 bg-black/50',
    content:
      'bg-default-50 border-divider-100 motion-ease-spring-smooth motion-duration-300 fixed top-2 z-50 flex h-[calc(100dvh-4*var(--spacing))] w-[calc(100dvw-4*var(--spacing))] flex-col overflow-hidden rounded-2xl dark:border',
    close: 'bg-default absolute right-4 top-4 z-30 flex size-8 items-center justify-center rounded-full shadow',
    closeIcon: 'size-5 opacity-60',
  },
  variants: {
    align: {
      left: {
        content: 'left-2 data-[state=open]:-motion-translate-x-in-100 data-[state=closed]:-motion-translate-x-out-150',
      },
      right: {
        content: 'right-2 data-[state=open]:motion-translate-x-in-100 data-[state=closed]:motion-translate-x-out-150',
      },
    },
    size: {
      default: {
        content: 'md:w-3/4 xl:w-1/2',
      },
      fullscreen: {
        content: '',
      },
    },
  },
  defaultVariants: {
    align: 'right',
    size: 'default',
  },
});

export type SheetVariants = VariantProps<typeof sheetTV>;
