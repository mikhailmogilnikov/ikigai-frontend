import * as React from 'react';

import { cn } from '~/shared/lib/utils';

const Input = ({
  ref,
  className,
  type,
  ...props
}: React.ComponentProps<'input'> & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  return (
    <input
      type={type}
      className={cn(
        'border-divider bg-background ring-offset-background file:text-foreground placeholder:text-foreground/50 focus-visible:ring-focus flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
};

Input.displayName = 'Input';

export { Input };
