import { Trans } from '@lingui/react/macro';
import { Link, useParams } from '@tanstack/react-router';

import { ApiComponents } from '~/shared/api';
import { Chip } from '~/shared/ui/primitives/chip';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

interface CourseModulesProps {
  modules: ApiComponents['AdminModule'][];
}

export function CourseModules({ modules }: CourseModulesProps) {
  const { course } = useParams({ from: '/admin/_guard/courses_/$course' });
  const sortedModules = modules.sort((a, b) => a.order - b.order);

  return (
    <Flex col>
      {sortedModules.map((module) => (
        <Link
          to='/admin/courses/$course/modules/$module'
          params={{ course, module: module.id.toString() }}
          key={module.id}
        >
          <Flex className='border-divider items-start rounded-lg border p-4'>
            <Flex col className='items-start'>
              <Typo>{module.title}</Typo>
              <Flex className='items-center gap-2'>
                <Chip size='sm' color={module.is_published ? 'success' : 'warning'}>
                  {module.is_published ? <Trans>Опубликован</Trans> : <Trans>Не опубликован</Trans>}
                </Chip>

                <Chip size='sm'>
                  <Trans>3 урока</Trans>
                </Chip>
              </Flex>
            </Flex>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
}
