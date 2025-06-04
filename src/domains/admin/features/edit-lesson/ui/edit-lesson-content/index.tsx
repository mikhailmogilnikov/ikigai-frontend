import { lazy, Suspense } from 'react';

import { Flex } from '~/shared/ui/primitives/flex';
import { Spinner } from '~/shared/ui/primitives/spinner';

const MarkdownEditor = lazy(() => import('~/shared/ui/common/md-editor'));

export function EditLessonContent({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string | undefined) => void;
}) {
  return (
    <Suspense
      fallback={
        <Flex className='h-full w-full items-center justify-center'>
          <Spinner />
        </Flex>
      }
    >
      <MarkdownEditor value={content} onChange={onChange} />
    </Suspense>
  );
}
