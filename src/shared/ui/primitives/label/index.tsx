import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { VariantProps } from 'tailwind-variants';

import { cn, tv } from '~/shared/lib/utils';

const labelVariants = tv({
  base: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
});

export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants> & {
    ref?: React.RefObject<React.ComponentRef<typeof LabelPrimitive.Root> | null>;
  };

const Label = ({ ref, className, ...props }: LabelProps) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
