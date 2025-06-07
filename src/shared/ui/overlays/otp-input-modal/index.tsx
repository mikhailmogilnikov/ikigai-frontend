import { Trans } from '@lingui/react/macro';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useEffect, useState } from 'react';

import { AdaptiveModal, AdaptiveModalContent, AdaptiveModalFooter, AdaptiveModalHeader } from '../adaptive-modal';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../../primitives/input-otp';
import { Flex } from '../../primitives/flex';
import { Button } from '../../primitives/button/button';
import { Typo } from '../../primitives/typo';

interface OtpInputModalProps {
  open: boolean;
  onOpenChange: () => void;
  errorsCount?: number;
  onSubmit: (code: string) => void;
  description?: string;
  isLoading?: boolean;
}

export function OtpInputModal({
  open,
  onOpenChange,
  onSubmit,
  errorsCount = 0,
  description,
  isLoading = false,
}: OtpInputModalProps) {
  const [code, setCode] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError && code.length === 1) setIsError(false);
    if (code.length === 6) onSubmit(code);
  }, [code]);

  useEffect(() => {
    if (errorsCount > 0) {
      setCode('');
      setIsError(true);
    }
  }, [errorsCount]);

  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange}>
      <AdaptiveModalHeader drawerProps={{ className: 'mt-8 text-center' }}>
        <Trans>Введите код</Trans>
      </AdaptiveModalHeader>
      <AdaptiveModalContent>
        <Flex className='w-full items-center justify-center py-6'>
          <InputOTP
            autoFocus
            maxLength={6}
            disabled={isLoading}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            className='mx-auto'
            value={code}
            onChange={(value) => {
              setCode(value);
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Flex>
        {isLoading && !isError && (
          <Typo className='animate-pulse text-center'>
            <Trans>Проверяем код...</Trans>
          </Typo>
        )}
        {isError && (
          <Typo className='text-danger text-center'>
            <Trans>Неверный код. Попробуйте еще раз.</Trans>
          </Typo>
        )}
        {description ? (
          <Typo className='text-center opacity-50'>{description}</Typo>
        ) : (
          <Typo className='text-center opacity-50'>
            <Trans>Мы отправили проверочный код на вашу почту. Если код не приходит, проверьте папку "Спам".</Trans>
          </Typo>
        )}
      </AdaptiveModalContent>
      <AdaptiveModalFooter>
        <Button className='w-full' onClick={onOpenChange}>
          <Trans>Отмена</Trans>
        </Button>
      </AdaptiveModalFooter>
    </AdaptiveModal>
  );
}
