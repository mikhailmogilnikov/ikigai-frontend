import * as Dialog from '@radix-ui/react-dialog';
import { PiXBold } from 'react-icons/pi';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { ScrollArea, ScrollAreaProps } from '~/shared/ui/primitives/scrollarea';

import { modalTV, ModalVariants } from './classnames';

export interface ModalProps extends Dialog.DialogProps, ModalVariants {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * ClassNames for modal
   */
  classNames?: {
    overlay?: string;
    content?: string;
    close?: string;
    closeIcon?: string;
  };
  /**
   * Hide close button
   */
  hideClose?: boolean;
  /**
   * Modal width
   */
  width?: ModalVariants['width'];
  /**
   * Modal height
   */
  height?: ModalVariants['height'];
}

export function Modal(props: ModalProps) {
  const { children, hideClose, classNames, width, height, ...rest } = props;

  const { content, overlay, close, closeIcon } = modalTV({ width, height });

  return (
    <Dialog.Root {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlay({ className: classNames?.overlay })} />
        <Dialog.Content
          onPointerDownOutside={(e) => {
            if (e.target instanceof Element && e.target.closest('[data-sonner-toast]')) {
              e.preventDefault();
            }
          }}
          className={content({ className: classNames?.content })}
        >
          {!hideClose && (
            <Dialog.Close className={close({ className: classNames?.close })}>
              <PiXBold className={closeIcon({ className: classNames?.closeIcon })} />
            </Dialog.Close>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export interface ModalHeaderProps extends Dialog.DialogTitleProps {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  restContent?: React.ReactNode;
}

export function ModalHeader(props: ModalHeaderProps) {
  const { wrapperProps, restContent, ...rest } = props;

  return (
    <div className='pr-13 flex shrink-0 flex-col gap-4 p-4 px-5' {...wrapperProps}>
      <Dialog.Title {...rest} className='shrink-0 text-2xl font-semibold' />
      <VisuallyHidden asChild>
        <Dialog.Description />
      </VisuallyHidden>
      {restContent}
    </div>
  );
}

export type ModalContentProps = ScrollAreaProps;

export function ModalContent(props: ModalContentProps) {
  const { children, ...rest } = props;

  return (
    <ScrollArea
      className='shrink-1 mb-4 flex h-full flex-col gap-4 overflow-y-auto px-4'
      classNames={{
        scrollbar: 'px-1',
        verticalScrollbar: 'w-3.5',
        horizontalScrollbar: 'h-3.5',
      }}
      {...rest}
    >
      <div className='flex flex-col gap-4 px-1'>{children}</div>
    </ScrollArea>
  );
}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  cancelButton?: boolean;
}

export function ModalFooter(props: ModalFooterProps) {
  const { cancelButton = false, children, ...rest } = props;

  return (
    <div className='flex shrink-0 items-center gap-4 px-5 pb-5' {...rest}>
      {cancelButton && (
        <Dialog.Close asChild>
          <button className='bg-default w-full cursor-pointer rounded-xl px-4 py-2 font-medium shadow'>Отмена</button>
        </Dialog.Close>
      )}
      {children}
    </div>
  );
}
