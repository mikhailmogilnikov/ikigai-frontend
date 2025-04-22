import { ChangeThemeMenuButton } from '~/domains/global/features/change-theme';
import { OptionList } from '~/shared/ui/primitives/option-list';

export function MenuSettings() {
  return (
    <OptionList title='Настройки'>
      <ChangeThemeMenuButton />
    </OptionList>
  );
}
