import { Spinner as SpinnerComponent, SpinnerProps } from '@blur-ui/spinner';

import { cn } from '~/shared/lib/utils';

export function Spinner(props: SpinnerProps) {
  const { className, segmentClassName, ...rest } = props;

  const rootClassName = cn('size-6', className);
  const segmClassName = cn('bg-foreground', segmentClassName);

  return <SpinnerComponent {...rest} className={rootClassName} segmentClassName={segmClassName} />;
}
