import { Trans, useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { PiCaretLeftBold } from 'react-icons/pi';

import { Container } from '~/shared/ui/primitives/container';
import { LinkButton } from '~/shared/ui/primitives/link-button';

export const Route = createFileRoute('/admin/_guard/courses_/$course_/modules_/$module_/lessons_/$lesson')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLingui();
  const { course, module, lesson } = Route.useParams();

  return (
    <Container size='md' title={t`Урок ${lesson}`}>
      <LinkButton to='/admin/courses/$course/modules/$module' params={{ course, module }} className='w-fit' size='sm'>
        <PiCaretLeftBold />
        <Trans>Назад к модулю</Trans>
      </LinkButton>
    </Container>
  );
}
