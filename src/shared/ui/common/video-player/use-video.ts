import { useLingui } from '@lingui/react/macro';
import { MediaPlayerInstance } from '@vidstack/react';
import { DefaultLayoutTranslations } from '@vidstack/react/types/vidstack.js';
import { useEffect, useMemo, useRef } from 'react';

import { Chapter } from './video-player';

export const useVideo = ({ chapters }: { chapters?: Chapter[] }) => {
  const { t } = useLingui();
  const playerRef = useRef<MediaPlayerInstance>(null);

  const translations: DefaultLayoutTranslations = useMemo(
    () => ({
      'Caption Styles': t`Стили субтитров`,
      'Captions look like this': t`Субтитры выглядят так`,
      'Closed-Captions Off': t`Субтитры выключены`,
      'Closed-Captions On': t`Субтитры включены`,
      'Display Background': t`Отображать фон`,
      'Enter Fullscreen': t`Войти в полноэкранный режим`,
      'Enter PiP': t`Войти в режим Картинка-в-Картинке`,
      'Exit Fullscreen': t`Выйти из полноэкранного режима`,
      'Exit PiP': t`Выйти из режима Картинка-в-Картинке`,
      'Google Cast': t`Google Cast`,
      'Keyboard Animations': t`Анимации клавиатуры`,
      'Seek Backward': t`Перемотать назад`,
      'Seek Forward': t`Перемотать вперед`,
      'Skip To Live': t`Переход к Live-трансляциям`,
      'Text Background': t`Фон текста`,
      Accessibility: t`Доступность`,
      AirPlay: t`AirPlay`,
      Announcements: t`Объявления`,
      Audio: t`Настройки звука`,
      Auto: t`Авто`,
      Boost: t`Усиление`,
      Captions: t`Субтитры`,
      Chapters: t`Главы`,
      Color: t`Цвет`,
      Connected: t`Подключено`,
      Connecting: t`Подключение`,
      Continue: t`Продолжить`,
      Default: t`По умолчанию`,
      Disabled: t`Отключено`,
      Disconnected: t`Отключено`,
      Download: t`Скачать`,
      Family: t`Семья`,
      Font: t`Шрифт`,
      Fullscreen: t`Полноэкранный режим`,
      LIVE: t`Live-трансляция`,
      Loop: t`Зациклить видео`,
      Mute: t`Выключить звук`,
      Normal: t`Обычная`,
      Off: t`Выключено`,
      Opacity: t`Непрозрачность`,
      Pause: t`Пауза`,
      PiP: t`Картинка-в-Картинке`,
      Play: t`Воспроизвести`,
      Playback: t`Воспроизведение`,
      Quality: t`Качество`,
      Replay: t`Повторить`,
      Reset: t`Сбросить`,
      Seek: t`Поиск`,
      Settings: t`Настройки`,
      Shadow: t`Тень`,
      Size: t`Размер`,
      Speed: t`Скорость`,
      Text: t`Текст`,
      Track: t`Дорожка`,
      Unmute: t`Включить звук`,
      Volume: t`Громкость`,
    }),
    [t],
  );

  const chaptersUrl = useMemo(
    () =>
      chapters
        ? URL.createObjectURL(
            new Blob(
              [
                'WEBVTT\n\n' +
                  chapters
                    .map(
                      (chapter) =>
                        `${formatTime(chapter.startTime)} --> ${formatTime(chapter.endTime)}\n${chapter.text}`,
                    )
                    .join('\n\n'),
              ],
              { type: 'text/vtt' },
            ),
          )
        : undefined,
    [chapters],
  );

  useEffect(() => {
    if (!playerRef.current) return;

    playerRef.current.addEventListener('abort', () => {
      playerRef.current?.destroy();
    });

    // Отключаем контекстное меню
    const handleContextMenu = (e: Event) => {
      e.preventDefault();

      return false;
    };

    // Отключаем возможность перетаскивания видео
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();

      return false;
    };

    const playerElement = playerRef.current.el;

    if (!playerElement) return;

    const videoElements = playerElement.querySelectorAll('video');

    videoElements.forEach((video) => {
      // Отключаем контекстное меню на видео
      video.addEventListener('contextmenu', handleContextMenu);
      // Отключаем перетаскивание видео
      video.addEventListener('dragstart', handleDragStart);
      // Добавляем атрибут для отключения загрузки и других действий
      video.setAttribute('controlsList', 'nodownload');
    });

    playerElement.addEventListener('contextmenu', handleContextMenu);

    return () => {
      playerElement.removeEventListener('contextmenu', handleContextMenu);

      videoElements.forEach((video) => {
        video.removeEventListener('contextmenu', handleContextMenu);
        video.removeEventListener('dragstart', handleDragStart);
      });
    };
  }, [playerRef.current]);

  return { playerRef, translations, chaptersUrl };
};

// Вспомогательная функция для форматирования времени в формат WebVTT (00:00:00.000)
function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds - Math.floor(seconds)) * 1000);

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}
