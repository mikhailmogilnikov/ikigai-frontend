import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import { cn } from '~/shared/lib/utils';

import { useVideo } from './use-video';

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
  className?: string;
}

export function VideoPlayer({ src, poster, title, autoPlay = false, chapters, className }: VideoPlayerProps) {
  const { translations, playerRef, chaptersUrl } = useVideo({ chapters });

  return (
    <MediaPlayer
      className={cn('aspect-video w-full', className)}
      viewType='video'
      streamType='unknown'
      logLevel='silent'
      load='play'
      storage='video-player'
      preload='metadata'
      title={title}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      ref={playerRef}
    >
      <MediaProvider>
        <Poster className='vds-poster' />
        {chaptersUrl && <Track src={chaptersUrl} kind='chapters' default />}
      </MediaProvider>
      <DefaultVideoLayout translations={translations} icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}
