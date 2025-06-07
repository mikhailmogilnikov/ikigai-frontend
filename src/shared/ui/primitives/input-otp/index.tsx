import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { PiMinusBold } from 'react-icons/pi';

import { cn } from '~/shared/lib/utils';

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot='input-otp'
      containerClassName={cn('has-disabled:opacity-50 flex items-center gap-2', containerClassName)}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='input-otp-group' className={cn('flex items-center', className)} {...props} />;
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number;
}) {
  const inputOTPContext = React.use(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      data-slot='input-otp-slot'
      data-active={isActive}
      className={cn(
        'data-[active=true]:border-focus data-[active=true]:ring-focus/50 data-[active=true]:aria-invalid:ring-danger/20 dark:data-[active=true]:aria-invalid:ring-danger/40 aria-invalid:border-danger data-[active=true]:aria-invalid:border-danger dark:bg-default/30 border-divider shadow-xs relative flex size-9 items-center justify-center border-y border-r text-sm outline-none transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px] md:size-11',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='bg-foreground h-4 w-px animate-pulse' />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot='input-otp-separator' role='separator' {...props}>
      <PiMinusBold />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
