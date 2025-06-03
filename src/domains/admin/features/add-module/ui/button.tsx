import { Trans } from '@lingui/react/macro';
import { useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';

import { Button } from '~/shared/ui/primitives/button/button';

import { AddModuleModal } from './modal';

export function AddModuleButton() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button size='sm' className='h-9 w-auto text-nowrap' onClick={handleOpenChange}>
        <PiPlusBold />
        <Trans>Добавить модуль</Trans>
      </Button>
      <AddModuleModal open={open} onOpenChange={setOpen} />
    </>
  );
}
