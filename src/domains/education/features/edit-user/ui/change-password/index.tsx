import { Trans } from '@lingui/react/macro';
import { PiLockBold } from 'react-icons/pi';
import { useState } from 'react';

import { Option } from '~/shared/ui/primitives/option';
import { OptionListItem } from '~/shared/ui/primitives/option-list';

import { ChangePasswordModal } from './modal';

export function ChangePasswordOption() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OptionListItem
        pressable
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Option icon={<PiLockBold className='opacity-50' />}>
          <Trans>Сменить пароль</Trans>
        </Option>
      </OptionListItem>
      <ChangePasswordModal
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
        }}
      />
    </>
  );
}
