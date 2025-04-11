import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Link } from '@tanstack/react-router';

import { useTheme } from '~/domains/global/entities/theme';
import { LogoIcon } from '~/shared/assets/svg/logo';
import { Flex } from '~/shared/ui/primitives/flex';

export function EducationHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Flex>
        <Link to='/'>
          <VisuallyHidden>
            <h1 id='logo'>IKIGAI</h1>
          </VisuallyHidden>
          <LogoIcon className='h-6' aria-labelledby='logo' />
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
