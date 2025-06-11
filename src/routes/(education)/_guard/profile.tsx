import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { ChangeAvatarOption, ChangeMainDataOption, ChangePasswordOption } from '~/domains/education/features/edit-user';
import { UserInfo } from '~/domains/education/widgets/menu/ui/user-info';
import { rqClient } from '~/shared/api';
import { Container } from '~/shared/ui/primitives/container';
import { OptionList } from '~/shared/ui/primitives/option-list';

export const Route = createFileRoute('/(education)/_guard/profile')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(rqClient.queryOptions('get', '/users/me')),
});

function RouteComponent() {
  const { t } = useLingui();
  const { data } = rqClient.useSuspenseQuery('get', '/users/me');

  return (
    <Container size='sm' className='gap-8' title={t`Профиль`}>
      <UserInfo name={`${data.first_name} ${data.last_name}`} email={data.email} image_url={data.image_url} size='md' />
      <OptionList>
        <ChangeMainDataOption firstName={data.first_name} lastName={data.last_name} />
        <ChangeAvatarOption />
        <ChangePasswordOption />
      </OptionList>
    </Container>
  );
}
