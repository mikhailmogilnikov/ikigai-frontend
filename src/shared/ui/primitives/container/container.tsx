import { ElementType } from 'react';

import { Flex, FlexProps } from '../flex';
import { Typo } from '../typo';

import { containerTV, ContainerTvProps } from './classnames';

interface ContainerProps extends ContainerTvProps {
  title?: string;
}

export function Container<T extends ElementType = 'div'>(props: FlexProps<T> & ContainerProps) {
  const { size, className, children, title, ...flexProps } = props;

  const ContainerClassName = containerTV({ size, className });

  return (
    // @ts-expect-error complex type logic
    <Flex col className={ContainerClassName} {...flexProps}>
      {title && (
        <Typo as='h2' size='2xl' weight='semibold'>
          {title}
        </Typo>
      )}
      {children}
    </Flex>
  );
}
