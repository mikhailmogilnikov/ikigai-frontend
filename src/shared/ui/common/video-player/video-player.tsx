import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import { useVideoTranslations } from './use-video-translations';

export interface Chapter {
  startTime: number;
  endTime: number;
  text: string;
}

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  chapters?: Chapter[];
}

export function VideoPlayer({ src, poster, title, autoPlay = false, chapters }: VideoPlayerProps) {
  const chaptersUrl = chapters
    ? URL.createObjectURL(
        new Blob(
          [
            'WEBVTT\n\n' +
              chapters
                .map(
                  (chapter) => `${formatTime(chapter.startTime)} --> ${formatTime(chapter.endTime)}\n${chapter.text}`,
                )
                .join('\n\n'),
          ],
          { type: 'text/vtt' },
        ),
      )
    : undefined;

  const { translations } = useVideoTranslations();

  return (
    <MediaPlayer
      viewType='video'
      streamType='on-demand'
      logLevel='warn'
      storage='video-player'
      title={title}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
    >
      <MediaProvider>
        <Poster className='vds-poster' />
        {chaptersUrl && <Track src={chaptersUrl} kind='chapters' default />}
      </MediaProvider>
      <DefaultVideoLayout translations={translations} icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}

// Вспомогательная функция для форматирования времени в формат WebVTT (00:00:00.000)
function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds - Math.floor(seconds)) * 1000);

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}
