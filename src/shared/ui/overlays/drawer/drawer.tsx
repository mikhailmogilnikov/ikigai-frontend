import { Drawer as VaulDrawer, DialogProps } from 'vaul';
import { PiXBold } from 'react-icons/pi';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { DialogTitleProps } from '@radix-ui/react-dialog';

import { ScrollArea } from '../../primitives/scrollarea';
import { ScrollAreaProps } from '../../primitives/scrollarea';

export type DrawerProps = DialogProps & {
  hideThumb?: boolean;
  hideClose?: boolean;
};

export const Drawer = (props: DrawerProps) => {
  const { hideThumb = false, hideClose = false, open, onOpenChange, children, ...rest } = props;

  // useUpdateThemeColor({ isOpen: open ?? false });

  return (
    <VaulDrawer.Root
      open={open}
      repositionInputs={false}
      shouldScaleBackground={false}
      onOpenChange={onOpenChange}
      {...rest}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className='z-8900 fixed inset-0 bg-black/60' />

        <VaulDrawer.Content className='bg-default-50 z-9000 fixed bottom-0 left-0 right-0 h-fit max-h-[95svh] rounded-t-lg outline-none'>
          <div className='z-10 overflow-hidden'>
            {!hideThumb && (
              <div className='fixed left-0 right-0 top-0 flex h-6 items-center justify-center' id='drawer-header'>
                <div
                  aria-hidden
                  className='bg-default-200 mx-auto mt-4 h-1.5 w-10 flex-shrink-0 rounded-full'
                  id='drawer-thumb'
                />
              </div>
            )}
            {!hideClose && (
              <VaulDrawer.Close className='bg-default-100 absolute right-4 top-4 z-10 rounded-full p-1'>
                <PiXBold className='h-4.5 w-4.5 opacity-30' />
              </VaulDrawer.Close>
            )}
            <div className='z-0 flex max-h-[95svh] flex-col gap-4 overflow-y-auto pb-6'>{children}</div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
};

export interface DrawerHeaderProps extends DialogTitleProps {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  restContent?: React.ReactNode;
}

export function DrawerHeader(props: DrawerHeaderProps) {
  const { wrapperProps, restContent, ...rest } = props;

  return (
    <div className='flex shrink-0 flex-col gap-4 p-4' {...wrapperProps}>
      <VaulDrawer.Title {...rest} className='shrink-0 text-2xl font-semibold' />
      <VisuallyHidden asChild>
        <VaulDrawer.Description />
      </VisuallyHidden>
      {restContent}
    </div>
  );
}

export type DrawerContentProps = ScrollAreaProps;

export function DrawerContent(props: DrawerContentProps) {
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
      <div className='flex flex-col gap-4'>{children}</div>
    </ScrollArea>
  );
}

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  cancelButton?: boolean;
}

export function DrawerFooter(props: DrawerFooterProps) {
  const { cancelButton = false, children, ...rest } = props;

  return (
    <div className='flex shrink-0 gap-4 px-4' {...rest}>
      {cancelButton && (
        <VaulDrawer.Close asChild>
          <button className='bg-default w-full cursor-pointer rounded-xl px-4 py-2 font-medium shadow'>Отмена</button>
        </VaulDrawer.Close>
      )}
      {children}
    </div>
  );
}
