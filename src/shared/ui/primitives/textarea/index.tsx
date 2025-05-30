import * as React from 'react';
import { RefCallBack } from 'react-hook-form';

import { cn } from '~/shared/lib/utils';

const Textarea = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'textarea'> & {
  ref?: React.RefObject<HTMLTextAreaElement | null> | RefCallBack;
}) => {
  return (
    <textarea
      className={cn(
        'border-divider bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-focus flex min-h-[80px] w-full rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
};

Textarea.displayName = 'Textarea';

export { Textarea };
