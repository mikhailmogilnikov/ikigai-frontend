import { VariantProps } from 'tailwind-variants';

import { tv } from '~/shared/lib/utils';

export const buttonTV = tv({
  base: 'inline-flex gap-2 items-center justify-center font-medium transition-[scale,color,background,filter,opacity] cursor-pointer active:scale-95 shadow-sm',
  variants: {
    variant: {
      default: 'bg-default text-default-foreground',
      bordered: 'border',
      ghost: '',
    },
    color: {
      default: 'bg-default text-default-foreground',
      inverse: 'bg-foreground text-background',
      primary: 'bg-primary text-primary-foreground',
      success: 'bg-success text-success-foreground',
      danger: 'bg-danger text-danger-foreground',
    },
    size: {
      sm: 'px-2 h-8 text-sm rounded-md',
      md: 'px-3 h-10 text-base rounded-lg',
      lg: 'px-4 h-12 text-lg rounded-lg',
    },
    isLoading: {
      true: 'opacity-50 pointer-events-none active:scale-100 cursor-default',
    },
    isDisabled: {
      true: 'opacity-50 pointer-events-none active:scale-100 cursor-default',
    },
  },
  compoundVariants: [
    {
      variant: 'ghost',
      color: 'default',
      className: 'bg-transparent hover:bg-default-100 shadow-none',
    },
    {
      variant: 'bordered',
      color: 'default',
      className: 'border-default',
    },
  ],
  defaultVariants: {
    color: 'default',
    size: 'md',
  },
});

export type ButtonTvProps = VariantProps<typeof buttonTV>;
