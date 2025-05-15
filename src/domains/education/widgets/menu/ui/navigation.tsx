import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';
import { PiBookBold, PiCreditCardBold, PiShoppingCartBold, PiUserBold } from 'react-icons/pi';

import { Option } from '~/shared/ui/primitives/option';
import { OptionList, OptionListItem } from '~/shared/ui/primitives/option-list';
import { Typo } from '~/shared/ui/primitives/typo';

const navigationItems = [
  {
    icon: PiBookBold,
    label: msg`Мои курсы`,
    to: '/',
  },
  {
    icon: PiShoppingCartBold,
    label: msg`Магазин курсов`,
    to: '/shop',
  },
  {
    icon: PiUserBold,
    label: msg`Профиль`,
    to: '/profile',
  },
  {
    icon: PiCreditCardBold,
    label: msg`История транзакций`,
    to: '/transactions',
  },
];

interface MenuNavigationProps {
  closeMenu: () => void;
}

export function MenuNavigation(props: MenuNavigationProps) {
  const { closeMenu } = props;

  const { i18n, t } = useLingui();

  return (
    <OptionList title={t`Навигация`}>
      {navigationItems.map((item) => (
        <Link
          to={item.to}
          key={item.to}
          className='focus-visible:-outline-offset-6 w-full rounded-lg'
          onClick={closeMenu}
        >
          <OptionListItem pressable>
            <Option icon={<item.icon className='size-4 opacity-50' />}>
              <Typo>{i18n._(item.label)}</Typo>
            </Option>
          </OptionListItem>
        </Link>
      ))}
    </OptionList>
  );
}
