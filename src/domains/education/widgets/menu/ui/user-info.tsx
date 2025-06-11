import { cn } from '~/shared/lib/utils';
import { Avatar } from '~/shared/ui/primitives/avatar';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

interface UserInfoProps {
  name: string;
  email: string;
  image_url?: string;
  size?: 'sm' | 'md';
}

export function UserInfo({ name, email, image_url, size = 'sm' }: UserInfoProps) {
  return (
    <Flex className='items-center gap-4'>
      <Avatar src={image_url ?? undefined} alt='avatar' className={cn('size-24', size === 'sm' && 'size-16')} />

      <Flex col className='gap-0.5'>
        <Typo weight='semibold' size='lg'>
          {name}
        </Typo>
        <Typo size='sm' className='opacity-50'>
          {email}
        </Typo>
      </Flex>
    </Flex>
  );
}
