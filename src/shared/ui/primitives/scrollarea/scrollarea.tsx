import {
  ScrollAreaClassNames,
  ScrollArea as ScrollAreaComponent,
  ScrollAreaProps as ScrollAreaPropsComponent,
} from '@blur-ui/scroll-area';

import { scrollAreaTV, ScrollAreaVariants } from './classnames';

export type ScrollAreaProps = ScrollAreaPropsComponent & ScrollAreaVariants;

export function ScrollArea(props: ScrollAreaProps) {
  const { classNames, children, ...rest } = props;

  const { root, scrollbar, verticalScrollbar, horizontalScrollbar, thumb } = scrollAreaTV({});

  const componentClassNames: ScrollAreaClassNames = {
    root: root({ className: classNames?.root }),
    scrollbar: scrollbar({ className: classNames?.scrollbar }),
    verticalScrollbar: verticalScrollbar({ className: classNames?.verticalScrollbar }),
    horizontalScrollbar: horizontalScrollbar({ className: classNames?.horizontalScrollbar }),
    thumb: thumb({ className: classNames?.thumb }),
  };

  return (
    <ScrollAreaComponent type='always' classNames={componentClassNames} {...rest}>
      {children}
    </ScrollAreaComponent>
  );
}
