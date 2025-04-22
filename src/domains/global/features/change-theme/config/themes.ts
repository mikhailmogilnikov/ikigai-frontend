import { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';

import { Theme } from '~/domains/global/entities/theme';

interface ChangeThemeItem {
  id: Theme;
  label: MessageDescriptor;
}

export const CHANGE_THEME_ITEMS: ChangeThemeItem[] = [
  {
    id: 'light',
    label: msg`Светлая`,
  },
  {
    id: 'dark',
    label: msg`Темная`,
  },
  {
    id: 'system',
    label: msg`Системная`,
  },
];
