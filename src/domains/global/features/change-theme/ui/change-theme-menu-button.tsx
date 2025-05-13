import { Trans, useLingui } from '@lingui/react/macro';
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
import { OptionListItem } from '~/shared/ui/primitives/option-list';
import { Typo } from '~/shared/ui/primitives/typo';

import { CHANGE_THEME_ITEMS } from '../config/themes';

export function ChangeThemeMenuButton() {
  const { theme, setTheme } = useTheme();
  const { i18n } = useLingui();

  const checkMatchTheme = (incomingTheme: Theme) => {
    return incomingTheme === theme;
  };

  const handleSetTheme = (incomingTheme: Theme) => () => {
    setTheme(incomingTheme);
  };

  const getThemeLabel = (theme: Theme) => {
    const themeItem = CHANGE_THEME_ITEMS.find((item) => item.id === theme);
    const systemTheme = CHANGE_THEME_ITEMS.find((item) => item.id === 'system');
    const firstTheme = CHANGE_THEME_ITEMS[0];

    return themeItem?.label ?? systemTheme?.label ?? firstTheme.label;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <OptionListItem pressable>
          <Option
            icon={<PiMoonStarsBold className='size-4 opacity-50' />}
            endContent={
              <Flex gap='sm' className='items-center'>
                {i18n._(getThemeLabel(theme))} <PiCaretUpDownBold className='size-4 opacity-50' />
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
        {CHANGE_THEME_ITEMS.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.id}
            checked={checkMatchTheme(item.id)}
            onCheckedChange={handleSetTheme(item.id)}
          >
            {i18n._(item.label)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
