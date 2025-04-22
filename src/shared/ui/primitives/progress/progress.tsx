import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '~/shared/lib/utils';

const Progress = ({
  ref,
  className,
  trackClassName,
  value,
  ...props
}: React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof ProgressPrimitive.Root> | null>;
  trackClassName?: string;
}) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('bg-foreground/10 relative h-4 w-full overflow-hidden rounded-full', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn('bg-primary h-full w-full flex-1 transition-all', trackClassName)}
      style={{ transform: `translateX(-${String(100 - (value ?? 0))}%)` }}
    />
  </ProgressPrimitive.Root>
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
