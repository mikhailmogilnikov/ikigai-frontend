import { I18nProvider as LinguiI18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { useEffect } from 'react';

import { LocalStorageService } from '~/shared/lib/services/storage';
import { CONFIG } from '~/shared/config';

import { dynamicActivate } from '../utils/init-i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedLocale = LocalStorageService.getItem('locale', 'safe');

    void dynamicActivate(savedLocale ?? CONFIG.DEFAULT_LOCALE);
  }, []);

  return <LinguiI18nProvider i18n={i18n}>{children}</LinguiI18nProvider>;
}
