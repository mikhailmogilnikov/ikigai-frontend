import { cn } from '~/shared/lib/utils';

import { Flex } from '../flex';
import { Typo } from '../typo';

interface OptionListProps {
  children: React.ReactNode;
  title?: string;
}

export function OptionList(props: OptionListProps) {
  const { children, title } = props;

  return (
    <Flex col className='gap-1'>
      {title && <Typo className='text-sm opacity-50'>{title}</Typo>}
      <Flex as='ul' gap='none' col className='bg-default overflow-hidden rounded-lg'>
        {children}
      </Flex>
    </Flex>
  );
}

interface OptionListItemProps {
  children: React.ReactNode;
  pressable?: boolean;
}

export function OptionListItem(props: OptionListItemProps) {
  const { children, pressable } = props;

  return (
    <Flex as='li' className={cn('w-full p-4', pressable && 'cursor-pointer')}>
      {children}
    </Flex>
  );
}
