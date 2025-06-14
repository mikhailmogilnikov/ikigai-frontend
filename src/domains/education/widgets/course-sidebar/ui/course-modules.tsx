import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { PiCheckBold, PiLockBold } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { Trans } from '@lingui/react/macro';

import { ApiComponents } from '~/shared/api';
import { Flex } from '~/shared/ui/primitives/flex';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/shared/ui/primitives/accordion';
import { Typo } from '~/shared/ui/primitives/typo';
import { Chip } from '~/shared/ui/primitives/chip';

interface CourseModulesProps {
  courseModules: ApiComponents['ModuleWithLessons'][];
  courseId: string;
  activeLessonId: string;
}

const getActiveModuleId = (sortedModules: ApiComponents['ModuleWithLessons'][], activeLessonId: string) => {
  return sortedModules.find((module) => module.lessons.some((lesson) => lesson.id === Number(activeLessonId)))?.id;
};

export function CourseModules({ courseModules, courseId, activeLessonId }: CourseModulesProps) {
  const [activeModuleIds, setActiveModuleIds] = useState<string[]>([]);
  const sortedModules = courseModules.sort((a, b) => a.order - b.order);

  useEffect(() => {
    const currentActiveModuleId = getActiveModuleId(courseModules, activeLessonId);
    const uniqueActiveModuleIds = new Set(activeModuleIds);

    const isCurrentModuleActive = uniqueActiveModuleIds.has(currentActiveModuleId?.toString() ?? '');

    if (currentActiveModuleId && !isCurrentModuleActive) {
      setActiveModuleIds([...uniqueActiveModuleIds, currentActiveModuleId.toString()]);
    }
  }, [activeLessonId]);

  return (
    <Flex col>
      <Accordion
        type='multiple'
        value={activeModuleIds}
        onValueChange={setActiveModuleIds}
        className='flex flex-col gap-3'
      >
        {sortedModules.map((module) => {
          const isModuleCompleted = module.lessons.every((lesson) => lesson.is_completed);

          return (
            <AccordionItem
              key={module.id}
              value={module.id.toString()}
              className='bg-default/50 md:bg-default/60 rounded-lg px-3 py-3 shadow'
            >
              <AccordionTrigger className='gap-3'>
                <Flex col>
                  <Typo className='text-base font-semibold md:text-sm'>{module.title}</Typo>
                  {isModuleCompleted && (
                    <Chip color='success' size='sm' className='w-min'>
                      <PiCheckBold className='text-success size-3' />
                      <Typo weight='semibold' className='text-success text-xs'>
                        <Trans>Завершен</Trans>
                      </Typo>
                    </Chip>
                  )}
                </Flex>
              </AccordionTrigger>
              <AccordionContent className='mt-4'>
                <Flex col className='gap-0.5'>
                  {module.lessons.map((lesson) => {
                    const isLessonCompleted = lesson.is_completed;
                    const isLessonHaveAccess = lesson.is_have_access;

                    return (
                      <Link
                        to={'/courses/$course/lessons/$lesson'}
                        disabled={!isLessonHaveAccess}
                        data-disabled={!isLessonHaveAccess}
                        params={{ course: courseId, lesson: lesson.id.toString() }}
                        key={lesson.id}
                        className={clsx(
                          'hover:bg-default flex items-center justify-between gap-2 rounded-md py-2 transition-all hover:px-2 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
                          lesson.id === Number(activeLessonId) && 'bg-default px-2',
                        )}
                      >
                        {lesson.title}
                        {isLessonCompleted && (
                          <div>
                            <PiCheckBold className='text-success' />
                          </div>
                        )}
                        {!isLessonHaveAccess && (
                          <div>
                            <PiLockBold className='text-foreground' />
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </Flex>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Flex>
  );
}
