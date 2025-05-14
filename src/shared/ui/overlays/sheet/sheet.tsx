import * as Dialog from '@radix-ui/react-dialog';
import { PiXBold } from 'react-icons/pi';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ScrollAreaProps } from '@blur-ui/scroll-area';

import { ScrollArea } from '~/shared/ui/primitives/scrollarea';

import { sheetTV, SheetVariants } from './classnames';

interface SheetProps extends Dialog.DialogProps, SheetVariants {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  overlayProps?: Dialog.DialogOverlayProps;
  contentProps?: Dialog.DialogContentProps;
  closeProps?: Dialog.DialogCloseProps;
  hideClose?: boolean;
  classNames?: {
    overlay?: string;
    content?: string;
    close?: string;
    closeIcon?: string;
  };
}

export function Sheet(props: SheetProps) {
  const { overlayProps, contentProps, closeProps, children, hideClose, align, size, classNames, ...rest } = props;

  const { content, overlay, close, closeIcon } = sheetTV({ align, size });

  return (
    <Dialog.Root {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay {...overlayProps} className={overlay({ className: classNames?.overlay })} />
        <Dialog.Content
          onPointerDownOutside={(e) => {
            if (e.target instanceof Element && e.target.closest('[data-sonner-toast]')) {
              e.preventDefault();
            }
          }}
          {...contentProps}
          className={content({ className: classNames?.content })}
        >
          {!hideClose && (
            <Dialog.Close {...closeProps} className={close({ className: classNames?.close })}>
              <PiXBold className={closeIcon({ className: classNames?.closeIcon })} />
            </Dialog.Close>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface SheetHeaderProps extends Dialog.DialogTitleProps {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  restContent?: React.ReactNode;
}

export function SheetHeader(props: SheetHeaderProps) {
  const { wrapperProps, restContent, ...rest } = props;

  return (
    <div className='flex flex-col gap-4 p-4 md:gap-6 md:p-6' {...wrapperProps}>
      <Dialog.Title {...rest} className='text-xl font-semibold md:text-2xl' />
      <VisuallyHidden asChild>
        <Dialog.Description />
      </VisuallyHidden>
      {restContent}
    </div>
  );
}

export function SheetContent(props: ScrollAreaProps) {
  const { children, ...rest } = props;

  return (
    <ScrollArea
      className='shrink-1 mb-4 flex h-full flex-col gap-4 overflow-y-auto px-4 md:mb-6 md:gap-6 md:px-6'
      classNames={{
        verticalScrollbar: 'w-2',
        horizontalScrollbar: 'h-2',
      }}
      {...rest}
    >
      <div className='flex flex-col gap-4'>{children}</div>
    </ScrollArea>
  );
}

interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  showCancel?: boolean;
}

export function SheetFooter(props: SheetFooterProps) {
  const { showCancel = false, children, ...rest } = props;

  return (
    <div className='flex shrink-0 gap-6 px-4 pb-4 md:px-6 md:pb-6' {...rest}>
      {showCancel && (
        <Dialog.Close asChild>
          <button className='bg-default w-full cursor-pointer rounded-xl px-4 py-2.5 font-medium shadow'>Отмена</button>
        </Dialog.Close>
      )}
      {children}
    </div>
  );
}
