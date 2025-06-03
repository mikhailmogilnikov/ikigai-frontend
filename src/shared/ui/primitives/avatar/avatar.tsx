import { HTMLAttributes, useState } from 'react';
import { PiUserBold } from 'react-icons/pi';

import { Image } from '../image';

import { avatarTV, AvatarTvProps } from './classnames';

interface AvatarProps extends AvatarTvProps, HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
}

export function Avatar(props: AvatarProps) {
  const { className, src, alt, ...rest } = props;

  const [isError, setIsError] = useState(false);

  const avatarClassName = avatarTV({
    className,
  });

  const handleLoad = () => {
    setIsError(true);
  };

  return (
    <div className={avatarClassName} {...rest}>
      {isError || !src ? (
        <PiUserBold className='size-1/2 opacity-50' />
      ) : (
        <Image src={src} alt={alt} onError={handleLoad} className='h-full w-full' />
      )}
    </div>
  );
}
