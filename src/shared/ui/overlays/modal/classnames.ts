import { VariantProps } from 'tailwind-variants';

import { tv } from '~/shared/lib/utils';

export const modalTV = tv({
  slots: {
    overlay:
      'data-[state=closed]:motion-opacity-out data-[state=open]:motion-opacity-in fixed inset-0 z-50 bg-black/50',
    content:
      'bg-default-50 border-divider-100 dark:border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full  rounded-xl z-50 data-[state=closed]:motion-scale-out-98 data-[state=closed]:motion-opacity-out data-[state=open]:motion-scale-in-98 flex flex-col data-[state=open]:motion-opacity-in min-h-16 h-fit',
    close: 'bg-default absolute right-4 top-4 z-30 flex size-8 items-center justify-center rounded-full shadow',
    closeIcon: 'size-5 opacity-60',
  },
  variants: {
    width: {
      md: { content: 'max-w-md' },
      lg: { content: 'max-w-lg' },
      xl: { content: 'max-w-xl' },
      '2xl': { content: 'max-w-2xl' },
      '3xl': { content: 'max-w-3xl' },
      '4xl': { content: 'max-w-4xl' },
      '5xl': { content: 'max-w-5xl' },
      full: { content: 'w-[calc(100vw-2rem)]' },
    },
    height: {
      xs: { content: 'max-h-[60%]' },
      sm: { content: 'max-h-[70%]' },
      md: { content: 'max-h-[80%]' },
      lg: { content: 'max-h-[90%]' },
      full: { content: 'max-h-[calc(100vh-2rem)]' },
    },
  },
  defaultVariants: {
    width: 'md',
    height: 'md',
  },
});

export type ModalVariants = VariantProps<typeof modalTV>;
