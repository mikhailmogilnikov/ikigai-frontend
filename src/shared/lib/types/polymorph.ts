import { ComponentProps, ElementType } from 'react';

interface AsProp<C extends ElementType> {
  as?: C;
}

export type PolymorphicComponentProps<C extends ElementType, Props = object> = Props &
  AsProp<C> &
  Omit<ComponentProps<C>, keyof Props | 'as'>;
