import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '~/shared/lib/utils';

import { Label } from '../label';

const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext>
  );
};

const useFormField = () => {
  const fieldContext = React.use(FormFieldContext);
  const itemContext = React.use(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const id = React.useId();

  return (
    <FormItemContext value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext>
  );
};

FormItem.displayName = 'FormItem';

const FormLabel = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof LabelPrimitive.Root> | null>;
}) => {
  const { error, formItemId } = useFormField();

  return <Label ref={ref} className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...props} />;
};

FormLabel.displayName = 'FormLabel';

const FormControl = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof Slot> & { ref?: React.RefObject<React.ComponentRef<typeof Slot> | null> }) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
};

FormControl.displayName = 'FormControl';

const FormDescription = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.RefObject<HTMLParagraphElement | null> }) => {
  const { formDescriptionId } = useFormField();

  return <p ref={ref} id={formDescriptionId} className={cn('text-muted-foreground text-sm', className)} {...props} />;
};

FormDescription.displayName = 'FormDescription';

const FormMessage = ({
  ref,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.RefObject<HTMLParagraphElement | null> }) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message ?? '') : children;

  if (!body) {
    return null;
  }

  return (
    <p ref={ref} id={formMessageId} className={cn('text-danger text-sm font-medium', className)} {...props}>
      {body}
    </p>
  );
};

FormMessage.displayName = 'FormMessage';

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
