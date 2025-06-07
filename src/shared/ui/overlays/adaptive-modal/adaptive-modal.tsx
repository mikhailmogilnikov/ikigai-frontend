import { useMediaQuery } from 'usehooks-ts';

import { BREAKPOINT_MOBILE } from '~/shared/config/constants';

import {
  Drawer,
  DrawerContent,
  DrawerContentProps,
  DrawerFooter,
  DrawerFooterProps,
  DrawerHeader,
  DrawerHeaderProps,
  DrawerProps,
} from '../drawer';
import {
  Modal,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  ModalProps,
} from '../modal';

export interface AdaptiveModalProps {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: () => void;
  modalProps?: ModalProps;
  drawerProps?: DrawerProps;
}

export const AdaptiveModal = ({ children, open, onOpenChange, modalProps, drawerProps }: AdaptiveModalProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE);

  return isMobile ? (
    <Drawer open={open} onOpenChange={onOpenChange} {...drawerProps}>
      {children}
    </Drawer>
  ) : (
    <Modal open={open} onOpenChange={onOpenChange} {...modalProps}>
      {children}
    </Modal>
  );
};

interface AdaptiveModalHeaderProps {
  children?: React.ReactNode;
  drawerProps?: DrawerHeaderProps;
  modalProps?: ModalHeaderProps;
}

export const AdaptiveModalHeader = ({ children, drawerProps, modalProps, ...props }: AdaptiveModalHeaderProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE);

  return isMobile ? (
    <DrawerHeader {...drawerProps} {...props}>
      {children}
    </DrawerHeader>
  ) : (
    <ModalHeader {...modalProps} {...props}>
      {children}
    </ModalHeader>
  );
};

interface AdaptiveModalContentProps {
  children?: React.ReactNode;
  drawerProps?: DrawerContentProps;
  modalProps?: ModalContentProps;
}

export const AdaptiveModalContent = ({ children, ...props }: AdaptiveModalContentProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE);

  return isMobile ? (
    <DrawerContent {...props}>{children}</DrawerContent>
  ) : (
    <ModalContent {...props}>{children}</ModalContent>
  );
};

interface AdaptiveModalFooterProps {
  children?: React.ReactNode;
  drawerProps?: DrawerFooterProps;
  modalProps?: ModalFooterProps;
}

export const AdaptiveModalFooter = ({ children, ...props }: AdaptiveModalFooterProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE);

  return isMobile ? (
    <DrawerFooter {...props}>{children}</DrawerFooter>
  ) : (
    <ModalFooter {...props}>{children}</ModalFooter>
  );
};
