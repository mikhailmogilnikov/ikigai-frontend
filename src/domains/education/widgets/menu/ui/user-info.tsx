import { Avatar } from '~/shared/ui/primitives/avatar';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

export function UserInfo() {
  return (
    <Flex className='items-center gap-4'>
      <Avatar src='https://i.pravatar.cc/300' alt='avatar' className='size-16' />

      <Flex col className='gap-0.5'>
        <Typo weight='semibold' size='lg'>
          Михаил Могильников
        </Typo>
        <Typo size='sm' className='opacity-50'>
          +7 (999) 999-99-99
        </Typo>
      </Flex>
    </Flex>
  );
}
