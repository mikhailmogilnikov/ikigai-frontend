import { Trans } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';

export function NotFoundPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-2'>
      <h1 className='text-2xl font-bold'>404</h1>
      <p className='text-base'>
        <Trans>Страница не найдена</Trans>
      </p>
      <Link to='/' className='mt-2 text-sm underline'>
        <Trans>Вернуться на главную</Trans>
      </Link>
    </div>
  );
}
