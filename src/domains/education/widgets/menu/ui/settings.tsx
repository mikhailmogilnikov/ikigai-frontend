import { Trans } from '@lingui/react/macro';
import { PiCaretUpDownBold, PiMoonStarsBold } from 'react-icons/pi';

import { Flex } from '~/shared/ui/primitives/flex';
import { Option } from '~/shared/ui/primitives/option';
import { OptionList, OptionListItem } from '~/shared/ui/primitives/option-list';
import { Typo } from '~/shared/ui/primitives/typo';

export function MenuSettings() {
  return (
    <OptionList title='Настройки'>
      <OptionListItem pressable>
        <Option
          icon={<PiMoonStarsBold className='size-4 opacity-50' />}
          endContent={
            <Flex gap='sm' className='items-center'>
              Светлая <PiCaretUpDownBold className='size-4 opacity-50' />
            </Flex>
          }
        >
          <Typo>
            <Trans>Тема оформления</Trans>
          </Typo>
        </Option>
      </OptionListItem>
    </OptionList>
  );
}
