import { Plural, Trans } from '@lingui/react/macro';
import { useMemo } from 'react';
import { PiBookBold, PiCheckBold } from 'react-icons/pi';

import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/shared/ui/primitives/accordion';
import { Chip } from '~/shared/ui/primitives/chip';

import { CourseFullInfoProps } from '.';
export function CourseFullInfoModules({ course }: CourseFullInfoProps) {
  const sortedModules = useMemo(() => course.modules.sort((a, b) => a.order - b.order), [course.modules]);

  return (
    <Flex col className='mt-4 w-full'>
      <Typo as='h3' size='xl' weight='medium'>
        <Trans>Программа курса</Trans>
      </Typo>

      <Accordion
        type='multiple'
        defaultValue={sortedModules.map((module) => module.id.toString())}
        className='flex flex-col gap-3'
      >
        {sortedModules.map((module) => {
          const isModuleCompleted = module.lessons.every((lesson) => lesson.is_completed);

          return (
            <AccordionItem
              key={module.id}
              value={module.id.toString()}
              className='bg-default rounded-lg px-3 py-3 shadow'
            >
              <AccordionTrigger>
                <Flex col gap='sm'>
                  <Typo as='h4' size='lg' weight='medium'>
                    {module.title}
                  </Typo>
                  <Flex gap='sm' className='items-center'>
                    <Chip color='default' size='sm' className='bg-foreground/5 h-6 border-none'>
                      <Typo as='p' size='sm' weight='semibold' className='text-xs opacity-50'>
                        {module.lessons.length}{' '}
                        <Plural value={module.lessons.length} one='урок' few='урока' many='уроков' />
                      </Typo>
                    </Chip>

                    {isModuleCompleted && (
                      <Chip color='success' size='sm' className='h-6 w-min border-none'>
                        <PiCheckBold className='text-success size-3 shrink-0' />
                        <Typo weight='semibold' className='text-success text-xs'>
                          <Trans>Завершен</Trans>
                        </Typo>
                      </Chip>
                    )}
                  </Flex>
                </Flex>
              </AccordionTrigger>
              <AccordionContent className='mt-6'>
                <Flex col>
                  {module.lessons.map((lesson) => (
                    <Flex key={lesson.id} className='flex items-center gap-3'>
                      <PiBookBold className='shrink-0 opacity-50' />
                      <Typo>{lesson.title}</Typo>
                      {lesson.is_completed && <PiCheckBold className='text-success shrink-0' />}
                    </Flex>
                  ))}
                </Flex>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Flex>
  );
}
