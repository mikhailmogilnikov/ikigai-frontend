'use client';

import { ElementType, HTMLAttributes } from 'react';

import { Skeleton } from '../skeleton';

import { useImage } from './use-image';

type NativeImageProps = HTMLAttributes<HTMLImageElement>;

export type ImageProps<C extends ElementType = 'img'> = NativeImageProps & {
  as?: C;
  alt?: string;
  ref?: React.Ref<HTMLImageElement>;
  src?: string;
  width?: number;
  height?: number;
  classNames?: {
    wrapper?: string;
    image?: string;
  };
  fill?: 'true' | 'false';
  loading?: 'eager' | 'lazy';
};

export const Image = <C extends ElementType = 'img'>(props: ImageProps<C>) => {
  const { Component, buildImageProps, buildWrapperProps, isLoaded } = useImage(props);

  return (
    <div {...buildWrapperProps()}>
      <Component {...buildImageProps()} />
      <Skeleton
        className='z-1 absolute inset-0 transition-opacity ease-linear data-[loaded=false]:opacity-100 data-[loaded=true]:opacity-0'
        data-loaded={isLoaded}
      />
    </div>
  );
};
