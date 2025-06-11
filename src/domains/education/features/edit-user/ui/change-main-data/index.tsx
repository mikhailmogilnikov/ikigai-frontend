import { Trans } from '@lingui/react/macro';
import { PiUserCircleBold } from 'react-icons/pi';
import { useState } from 'react';

import { Option } from '~/shared/ui/primitives/option';
import { OptionListItem } from '~/shared/ui/primitives/option-list';

import { ChangeMainDataModal } from './modal';

interface ChangeMainDataOptionProps {
  firstName: string;
  lastName: string;
}

export function ChangeMainDataOption({ firstName, lastName }: ChangeMainDataOptionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OptionListItem
        pressable
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Option icon={<PiUserCircleBold className='opacity-50' />}>
          <Trans>Редактировать основные данные</Trans>
        </Option>
      </OptionListItem>
      <ChangeMainDataModal
        firstName={firstName}
        lastName={lastName}
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
        }}
      />
    </>
  );
}
