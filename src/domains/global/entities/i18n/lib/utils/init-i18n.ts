/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { i18n } from '@lingui/core';

import { Locale } from '~/domains/global/entities/i18n';
import { CONFIG } from '~/shared/config';
import { LocalStorageService } from '~/shared/lib/services/storage';

export async function dynamicActivate(locale: `${Locale}` = CONFIG.DEFAULT_LOCALE) {
  const { messages } = await import(`../../locales/${locale}/messages.po`);

  LocalStorageService.setItem('locale', locale);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
