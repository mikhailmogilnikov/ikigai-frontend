import { PiCaretRightBold } from 'react-icons/pi';

import { Flex } from '~/shared/ui/primitives/flex';

interface OptionProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  endContent?: React.ReactNode;
}

export function Option(props: OptionProps) {
  const { icon, children, endContent } = props;

  const endIcon = endContent ?? <PiCaretRightBold className='size-4 opacity-50' />;

  return (
    <Flex align='center' justify='between' className='w-full'>
      <Flex align='center' className='gap-3'>
        {icon && icon}
        <Flex col>{children}</Flex>
      </Flex>

      <Flex>{endIcon}</Flex>
    </Flex>
  );
}
