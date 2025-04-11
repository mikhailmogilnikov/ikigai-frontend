import clsx from 'clsx';

import { Spinner } from '../../primitives/spinner';

interface PageLoaderProps {
  type: 'fullscreen' | 'layout';
}

export function PageLoader({ type }: PageLoaderProps) {
  const wrapperClassName = clsx('z-50 flex items-center justify-center', {
    'fixed inset-0': type === 'fullscreen',
    'h-[calc(100vh-calc(var(--spacing)*26))] w-full': type === 'layout',
  });

  return (
    <div className={wrapperClassName}>
      <Spinner />
    </div>
  );
}
