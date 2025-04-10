import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

export function EducationHeader() {
  return (
    <Flex>
      <Typo as='h1' weight='bold' size='xl'>
        IKIGAI
      </Typo>
    </Flex>
  );
}
