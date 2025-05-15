import { useLingui } from '@lingui/react/macro';

import { ChangeLanguageMenuButton } from '~/domains/global/features/change-language';
import { ChangeThemeMenuButton } from '~/domains/global/features/change-theme';
import { OptionList } from '~/shared/ui/primitives/option-list';

export function MenuSettings() {
  const { t } = useLingui();

  return (
    <OptionList title={t`Настройки`}>
      <ChangeThemeMenuButton />
      <ChangeLanguageMenuButton />
    </OptionList>
  );
}
