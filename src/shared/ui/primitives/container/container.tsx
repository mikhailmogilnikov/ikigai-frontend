import { ElementType } from 'react';

import { Flex, FlexProps } from '../flex';

import { containerTV, ContainerTvProps } from './classnames';

export function Container<T extends ElementType = 'div'>(props: FlexProps<T> & ContainerTvProps) {
  const { size, className } = props;

  const ContainerClassName = containerTV({ size, className });

  return <Flex col className={ContainerClassName} {...props} />;
}
