import { VariantProps } from 'tailwind-variants';

import { tv } from '~/shared/lib/utils';

export const chipTV = tv({
  base: 'inline-flex gap-1 items-center justify-center rounded-full border px-2 py-1',
  variants: {
    variant: {
      default: 'bg-default/50 border-default/50',
      filled: 'border-transparent',
      bordered: 'bg-transparent',
    },
    color: {
      default: 'bg-default/50 border-default/50 text-default-foreground',
      primary: 'bg-primary/20 border-primary/20 text-primary',
      success: 'bg-success/20 border-success/20 text-success',
      warning: 'bg-warning/20 border-warning/20 text-warning',
      error: 'bg-error/20 border-error/20 text-error',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      color: 'default',
      className: 'bg-default text-default-foreground',
    },
    {
      variant: 'filled',
      color: 'primary',
      className: 'bg-primary text-primary-foreground',
    },
    {
      variant: 'filled',
      color: 'success',
      className: 'bg-success text-success-foreground',
    },
    {
      variant: 'filled',
      color: 'warning',
      className: 'bg-warning text-warning-foreground',
    },
    {
      variant: 'filled',
      color: 'error',
      className: 'bg-error text-error-foreground',
    },
    {
      variant: 'bordered',
      color: 'default',
      className: 'border-default text-default-foreground',
    },
    {
      variant: 'bordered',
      color: 'primary',
      className: 'border-primary text-primary',
    },
    {
      variant: 'bordered',
      color: 'success',
      className: 'border-success text-success',
    },
    {
      variant: 'bordered',
      color: 'warning',
      className: 'border-warning text-warning',
    },
    {
      variant: 'bordered',
      color: 'error',
      className: 'border-error text-error',
    },
  ],
  defaultVariants: {
    color: 'default',
    size: 'md',
    variant: 'default',
  },
});

export type ChipTvProps = VariantProps<typeof chipTV>;
