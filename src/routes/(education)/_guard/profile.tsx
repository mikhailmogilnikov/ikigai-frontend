import { Trans, useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { PiAtBold, PiImageBold, PiLockBold, PiUserCircleBold } from 'react-icons/pi';

import { UserInfo } from '~/domains/education/widgets/menu/ui/user-info';
import { Container } from '~/shared/ui/primitives/container';
import { Option } from '~/shared/ui/primitives/option';
import { OptionList, OptionListItem } from '~/shared/ui/primitives/option-list';

export const Route = createFileRoute('/(education)/_guard/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLingui();

  return (
    <Container size='sm' className='gap-8' title={t`Профиль`}>
      <UserInfo name='M' email='mikhail@mogilnikov.ru' avatar_url='https://i.pravatar.cc/300' size='md' />
      <OptionList>
        <OptionListItem pressable>
          <Option icon={<PiUserCircleBold className='opacity-50' />}>
            <Trans>Редактировать основные данные</Trans>
          </Option>
        </OptionListItem>
        <OptionListItem pressable>
          <Option icon={<PiImageBold className='opacity-50' />}>
            <Trans>Изменить аватар</Trans>
          </Option>
        </OptionListItem>
        <OptionListItem pressable>
          <Option icon={<PiAtBold className='opacity-50' />}>
            <Trans>Сменить email</Trans>
          </Option>
        </OptionListItem>
        <OptionListItem pressable>
          <Option icon={<PiLockBold className='opacity-50' />}>
            <Trans>Сменить пароль</Trans>
          </Option>
        </OptionListItem>
      </OptionList>
    </Container>
  );
}
