import { cn } from '~/shared/lib/utils';

import { Flex } from '../../primitives/flex';
import { Typo } from '../../primitives/typo';

interface PlaceholderProps {
  icon: React.ReactNode;
  text: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export function Placeholder({ icon, text, description, children, className }: PlaceholderProps) {
  return (
    <Flex col className={cn('mx-auto w-full max-w-96 items-center gap-4', className)}>
      {icon}
      <Flex col className='items-center gap-1 text-center'>
        <Typo size='lg' weight='semibold'>
          {text}
        </Typo>
        <Typo className='opacity-50'>{description}</Typo>
      </Flex>
      {children}
    </Flex>
  );
}
