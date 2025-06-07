import { useState } from 'react';
import { useLingui } from '@lingui/react/macro';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';

import { Input, InputProps } from './input';

export function InputPassword({ ...props }: InputProps) {
  const { t } = useLingui();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <div className='relative'>
      <Input placeholder={t`Пароль`} type={isVisible ? 'text' : 'password'} {...props} />
      <button
        className='text-default-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none transition-[color,box-shadow] focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
        type='button'
        onClick={toggleVisibility}
        aria-label={isVisible ? t`Скрыть пароль` : t`Показать пароль`}
        aria-pressed={isVisible}
        aria-controls='password'
      >
        {isVisible ? <PiEyeClosedBold size={16} aria-hidden='true' /> : <PiEyeBold size={16} aria-hidden='true' />}
      </button>
    </div>
  );
}
