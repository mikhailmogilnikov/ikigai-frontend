import { Trans } from '@lingui/react/macro';

import { AdaptiveModal, AdaptiveModalContent, AdaptiveModalFooter, AdaptiveModalHeader } from '../adaptive-modal';
import { Typo } from '../../primitives/typo';
import { Button } from '../../primitives/button/button';

interface AlertModalProps {
  open: boolean;
  onOpenChange: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'success' | 'primary' | 'danger';
  isConfirmLoading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function AlertModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText,
  confirmColor,
  isConfirmLoading,
  onConfirm,
  onCancel,
}: AlertModalProps) {
  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange}>
      <AdaptiveModalHeader>{title ?? <Trans>Подтвердите действие</Trans>}</AdaptiveModalHeader>
      {description && (
        <AdaptiveModalContent>
          <Typo className='my-2 opacity-50'>{description}</Typo>
        </AdaptiveModalContent>
      )}
      <AdaptiveModalFooter>
        <Button className='w-full' onClick={onCancel ?? onOpenChange}>
          {cancelText ?? <Trans>Отмена</Trans>}
        </Button>
        <Button className='w-full' onClick={onConfirm} color={confirmColor ?? 'success'} isLoading={isConfirmLoading}>
          {confirmText ?? <Trans>Подтвердить</Trans>}
        </Button>
      </AdaptiveModalFooter>
    </AdaptiveModal>
  );
}
