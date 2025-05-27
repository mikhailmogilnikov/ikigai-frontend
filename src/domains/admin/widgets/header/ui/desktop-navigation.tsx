import { Trans } from '@lingui/react';
import { useMediaQuery } from 'usehooks-ts';
import { useLocation } from '@tanstack/react-router';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';

import { BREAKPOINT_MOBILE } from '~/shared/config/constants';
import { Divider } from '~/shared/ui/primitives/divider';
import { Flex } from '~/shared/ui/primitives/flex';
import { cn } from '~/shared/lib/utils';
import { LinkButton } from '~/shared/ui/primitives/link-button';

const navigationItems = [
  {
    id: 'courses',
    path: '/admin/courses',
    label: msg`Курсы`,
  },
  {
    id: 'users',
    path: '/admin/users',
    label: msg`Пользователи`,
  },
  {
    id: 'transactions',
    path: '/admin/transactions',
    label: msg`Транзакции`,
  },
] as const;

export function HeaderDesktopNavigationAdmin() {
  const { i18n } = useLingui();
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  if (isMobile) return null;

  return (
    <>
      <Divider vertical className='bg-divider h-5' />
      <Flex gap='sm'>
        {navigationItems.map((item) => (
          <LinkButton
            key={item.path}
            to={item.path}
            variant='ghost'
            size='sm'
            className={cn(
              'hover:bg-default-50 dark:hover:bg-default-100',
              isActive(item.path) ? 'bg-default-50 dark:bg-default-100 opacity-100' : 'opacity-75',
            )}
          >
            <Trans id={`navigation.${item.id}`} message={i18n._(item.label)} />
          </LinkButton>
        ))}
      </Flex>
    </>
  );
}
