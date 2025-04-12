import { Trans } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';
import { PiBookBold, PiCreditCardBold, PiShoppingCartBold, PiUserBold } from 'react-icons/pi';

import { Option } from '~/shared/ui/primitives/option';
import { OptionList, OptionListItem } from '~/shared/ui/primitives/option-list';
import { Typo } from '~/shared/ui/primitives/typo';

interface MenuNavigationProps {
  closeMenu: () => void;
}

export function MenuNavigation(props: MenuNavigationProps) {
  const { closeMenu } = props;

  return (
    <OptionList title='Навигация'>
      <Link to='/' className='focus-visible:-outline-offset-6 w-full rounded-lg' onClick={closeMenu}>
        <OptionListItem pressable>
          <Option icon={<PiBookBold className='size-4 opacity-50' />}>
            <Typo>
              <Trans>Мои курсы</Trans>
            </Typo>
          </Option>
        </OptionListItem>
      </Link>

      <Link to='/shop' className='focus-visible:-outline-offset-6 w-full rounded-lg' onClick={closeMenu}>
        <OptionListItem pressable>
          <Option icon={<PiShoppingCartBold className='size-4 opacity-50' />}>
            <Typo>
              <Trans>Магазин курсов</Trans>
            </Typo>
          </Option>
        </OptionListItem>
      </Link>

      <Link to='/profile' className='focus-visible:-outline-offset-6 w-full rounded-lg' onClick={closeMenu}>
        <OptionListItem pressable>
          <Option icon={<PiUserBold className='size-4 opacity-50' />}>
            <Typo>
              <Trans>Профиль</Trans>
            </Typo>
          </Option>
        </OptionListItem>
      </Link>

      <Link to='/transactions' className='focus-visible:-outline-offset-6 w-full rounded-lg' onClick={closeMenu}>
        <OptionListItem pressable>
          <Option icon={<PiCreditCardBold className='size-4 opacity-50' />}>
            <Typo>
              <Trans>История транзакций</Trans>
            </Typo>
          </Option>
        </OptionListItem>
      </Link>
    </OptionList>
  );
}
