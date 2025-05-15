import { Trans, useLingui } from '@lingui/react/macro';
import { PiCaretUpDownBold, PiTranslateBold } from 'react-icons/pi';

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
import { dynamicActivate } from '~/domains/global/entities/i18n';

import { LANGUAGES } from '../config/languages';

export function ChangeLanguageMenuButton() {
  const { i18n } = useLingui();

  const handleChangeLanguage = (language: string) => {
    void dynamicActivate(language);
  };

  const getLanguageLabel = (language: string) => {
    const languageItem = LANGUAGES.find((item) => item.id === language);

    return languageItem?.label;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <OptionListItem pressable>
          <Option
            icon={<PiTranslateBold className='size-4 opacity-50' />}
            endContent={
              <Flex gap='sm' className='items-center'>
                {getLanguageLabel(i18n.locale)}
                <PiCaretUpDownBold className='size-4 opacity-50' />
              </Flex>
            }
          >
            <Typo>
              <Trans>Язык интерфейса</Trans>
            </Typo>
          </Option>
        </OptionListItem>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40'>
        <DropdownMenuLabel>
          <Trans>Язык интерфейса</Trans>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.id}
            checked={i18n.locale === item.id}
            onCheckedChange={() => {
              handleChangeLanguage(item.id);
            }}
          >
            {i18n._(item.label)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
