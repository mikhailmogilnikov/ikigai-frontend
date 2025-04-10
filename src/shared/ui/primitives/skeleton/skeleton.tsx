import { Skeleton as SkeletonComponent, SkeletonProps } from '@blur-ui/skeleton';

import { cn } from '~/shared/lib/utils';
export function Skeleton(props: SkeletonProps) {
  const { className, shadowClassName, ...rest } = props;

  const rootCN = cn('bg-default-100', className);
  const shadowCN = cn('bg-default-300', shadowClassName);

  return <SkeletonComponent {...rest} className={rootCN} shadowClassName={shadowCN} />;
}
