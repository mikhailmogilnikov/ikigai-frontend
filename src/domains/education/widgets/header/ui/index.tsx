import { Link } from '@tanstack/react-router';

import { useTheme } from '~/domains/global/entities/theme';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

export function EducationHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Flex>
        <Link to='/'>
          <Typo as='h1' weight='bold' size='xl'>
            IKIGAI
          </Typo>
        </Link>
      </Flex>
      <Flex>
        <button
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </Flex>
    </>
  );
}
