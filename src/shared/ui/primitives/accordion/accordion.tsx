import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { PiCaretDown } from 'react-icons/pi';

import { cn } from '~/shared/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
  ref?: React.RefObject<React.ComponentRef<typeof AccordionPrimitive.Item> | null>;
}) => <AccordionPrimitive.Item ref={ref} className={cn('', className)} {...props} />;

AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  ref?: React.RefObject<React.ComponentRef<typeof AccordionPrimitive.Trigger> | null>;
}) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between text-start text-base transition-all [&[data-state=open]>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <PiCaretDown className='h-4 w-4 shrink-0 opacity-50 transition-transform duration-200' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof AccordionPrimitive.Content> | null>;
}) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all'
    {...props}
  >
    <div className={cn('', className)}>{children}</div>
  </AccordionPrimitive.Content>
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
