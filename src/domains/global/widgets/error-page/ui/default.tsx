import { Trans } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';

interface ErrorPageProps {
  error: unknown;
  reset: VoidFunction;
}

export function DefaultErrorPage({ error, reset }: ErrorPageProps) {
  const errorMessage = error instanceof Error ? error.message : undefined;

  return (
    <div className='bg-danger-100 border-danger-200 flex flex-col items-center justify-center gap-4 rounded-lg border p-4'>
      <h1 className='text-danger text-xl font-bold'>
        <Trans>Произошла неизвестная ошибка</Trans>
      </h1>
      {errorMessage && <p>Ошибка: {errorMessage}</p>}
      <p className='text-base font-semibold'>
        <Trans>
          <span className='opacity-50'>Попробуйте</span>{' '}
          <button type='button' onClick={reset} className='underline'>
            обновить страницу
          </button>{' '}
          <span className='opacity-70'>или</span>{' '}
          <Link to='/' className='underline'>
            вернуться на главную
          </Link>
        </Trans>
      </p>
    </div>
  );
}
