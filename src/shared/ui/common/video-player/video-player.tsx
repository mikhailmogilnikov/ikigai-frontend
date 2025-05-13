import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

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
}

export function VideoPlayer({ src, poster, title, autoPlay = false, chapters }: VideoPlayerProps) {
  const { translations, playerRef, chaptersUrl } = useVideo({ chapters });

  return (
    <MediaPlayer
      viewType='video'
      streamType='on-demand'
      logLevel='silent'
      storage='video-player'
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
