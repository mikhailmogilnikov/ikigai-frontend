/**
 * Форматирует дату в строку с учетом указанной локали и опций.
 * @param date - Объект Date для форматирования.
 * @param locale - Строка локали (например, 'ru-RU', 'en-US').
 * @param options - Опции форматирования Intl.DateTimeFormatOptions.
 * @returns Локализованная строка даты.
 */
export function formatLocaleDate(
  date: Date | string,
  locale = 'default', // Используем 'default' для системной локали
  options?: Intl.DateTimeFormatOptions,
): string {
  try {
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error formatting date for locale "${locale}":`, error);

    // Возвращаем стандартный формат в случае ошибки
    return new Date(date).toLocaleDateString();
  }
}

/**
 * Пытается распарсить строку в объект Date.
 * @param dateString - Строка для парсинга.
 * @returns Объект Date или null, если парсинг не удался.
 */
export function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);

  // Проверяем, является ли результат валидной датой
  if (!isNaN(date.getTime())) {
    return date;
  }

  return null;
}
