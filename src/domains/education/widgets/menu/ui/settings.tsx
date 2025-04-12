import { Trans } from '@lingui/react/macro';
import { PiCaretUpDownBold, PiMoonStarsBold } from 'react-icons/pi';

import { Theme, useTheme } from '~/domains/global/entities/theme';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/shared/ui/primitives/dropdown';
import { Flex } from '~/shared/ui/primitives/flex';
import { Option } from '~/shared/ui/primitives/option';
import { OptionList, OptionListItem } from '~/shared/ui/primitives/option-list';
import { Typo } from '~/shared/ui/primitives/typo';

export function MenuSettings() {
  const { theme, setTheme } = useTheme();

  const checkMatchTheme = (incomingTheme: Theme) => {
    return incomingTheme === theme;
  };

  const handleSetTheme = (incomingTheme: Theme) => () => {
    setTheme(incomingTheme);
  };

  return (
    <OptionList title='Настройки'>
      <DropdownMenu>
        <DropdownMenuTrigger>
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
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40'>
          <DropdownMenuLabel>
            <Trans>Тема оформления</Trans>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={checkMatchTheme('light')} onCheckedChange={handleSetTheme('light')}>
            <Trans>Светлая</Trans>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={checkMatchTheme('dark')} onCheckedChange={handleSetTheme('dark')}>
            <Trans>Темная</Trans>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={checkMatchTheme('system')} onCheckedChange={handleSetTheme('system')}>
            <Trans>Системная</Trans>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </OptionList>
  );
}
