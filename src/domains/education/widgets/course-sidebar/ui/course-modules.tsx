import { Link } from '@tanstack/react-router';
import clsx from 'clsx';

import { ApiComponents } from '~/shared/api';
import { Flex } from '~/shared/ui/primitives/flex';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/shared/ui/primitives/accordion';

interface CourseModulesProps {
  courseModules: ApiComponents['ModuleWithLessons'][];
  courseId: string;
  activeLessonId: string;
}

export function CourseModules({ courseModules, courseId, activeLessonId }: CourseModulesProps) {
  const sortedModules = courseModules.sort((a, b) => a.order - b.order);

  const activeModuleId = sortedModules.find((module) =>
    module.lessons.some((lesson) => lesson.id === activeLessonId),
  )?.id;

  return (
    <Flex col>
      <Accordion
        type='multiple'
        defaultValue={activeModuleId ? [activeModuleId] : undefined}
        className='flex flex-col gap-3'
      >
        {sortedModules.map((module) => (
          <AccordionItem
            key={module.id}
            value={module.id}
            className='bg-default/50 md:bg-default/60 rounded-lg px-3 py-3 shadow'
          >
            <AccordionTrigger className='gap-3 text-sm font-semibold'>{module.title}</AccordionTrigger>
            <AccordionContent className='mt-4'>
              <Flex col className='gap-0.5'>
                {module.lessons.map((lesson) => (
                  <Link
                    to={'/courses/$course/lessons/$lesson'}
                    params={{ course: courseId, lesson: lesson.id }}
                    key={lesson.id}
                    className={clsx(
                      'hover:bg-default rounded-md py-2 transition-all hover:px-2',
                      lesson.id === activeLessonId && 'bg-default px-2',
                    )}
                  >
                    {lesson.title}
                  </Link>
                ))}
              </Flex>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
}
