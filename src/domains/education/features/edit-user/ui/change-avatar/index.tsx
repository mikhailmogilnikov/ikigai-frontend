import { Trans } from '@lingui/react/macro';
import { PiImageBold } from 'react-icons/pi';
import { useState } from 'react';

import { Option } from '~/shared/ui/primitives/option';
import { OptionListItem } from '~/shared/ui/primitives/option-list';

import { ChangeAvatarModal } from './modal';

export function ChangeAvatarOption() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OptionListItem
        pressable
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Option icon={<PiImageBold className='opacity-50' />}>
          <Trans>Изменить аватар</Trans>
        </Option>
      </OptionListItem>
      <ChangeAvatarModal
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
        }}
      />
    </>
  );
}
