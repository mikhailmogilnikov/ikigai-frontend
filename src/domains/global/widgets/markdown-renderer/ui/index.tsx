/* eslint-disable lingui/no-unlocalized-strings */

import Markdown from 'react-markdown';

import { cn } from '~/shared/lib/utils';

const markdownStyles = {
  container: 'text-foreground leading-relaxed',
  heading: 'font-semibold',
  h1: 'text-2xl mt-6 mb-2 pb-1',
  h2: 'text-xl mt-6 mb-2 pb-1',
  h3: 'text-lg mt-5 mb-2',
  p: 'my-4',
  a: 'text-primary hover:underline',
  blockquote: 'border-l-4 border-primary/75 pl-4 text-foreground/75',
  code: 'bg-default-100 px-1.5 py-0.5 rounded font-mono text-sm',
  pre: 'bg-default-100 p-4 rounded-md overflow-x-auto',
  preCode: 'bg-transparent p-0',
  img: 'max-w-full rounded-lg overflow-hidden w-full aspect-video object-cover',
  hr: 'border-t border-divider my-8',
  table: 'w-full my-6 border-collapse overflow-hidden rounded-md',
  th: 'border border-divider p-2 bg-default-200 text-left',
  td: 'border border-divider p-2 whitespace-normal break-words',
  trEven: 'bg-default-100/30',
  ul: 'pl-8 my-4 list-disc',
  ol: 'pl-8 my-4 list-decimal',
  li: 'my-1',
  checkbox: 'mr-2',
  video: 'max-w-full rounded-md',
  del: 'text-foreground/60',
};

export function MarkdownRenderer({ content }: { content: string }) {
  let rowIndex = 0;

  return (
    <div className={markdownStyles.container}>
      <Markdown
        components={{
          h1: ({ children }) => <h1 className={cn(markdownStyles.heading, markdownStyles.h1)}>{children}</h1>,
          h2: ({ children }) => <h2 className={cn(markdownStyles.heading, markdownStyles.h2)}>{children}</h2>,
          h3: ({ children }) => <h3 className={cn(markdownStyles.heading, markdownStyles.h3)}>{children}</h3>,
          p: ({ children, ...props }) => {
            return (
              <p className={markdownStyles.p} {...props}>
                {children}
              </p>
            );
          },
          a: ({ href, children }) => (
            <a href={href} className={markdownStyles.a} target='_blank' rel='noopener noreferrer'>
              {children}
            </a>
          ),
          blockquote: ({ children }) => <blockquote className={markdownStyles.blockquote}>{children}</blockquote>,
          code: ({ children, className }) => {
            // Проверяем, является ли это блоком кода внутри pre
            const isInPre = className?.includes('language-');

            return <code className={isInPre ? markdownStyles.preCode : markdownStyles.code}>{children}</code>;
          },
          pre: ({ children }) => <pre className={markdownStyles.pre}>{children}</pre>,
          img: ({ src, alt }) => <img src={src} alt={alt} className={markdownStyles.img} />,
          hr: () => <hr className={markdownStyles.hr} />,
          table: ({ children }) => {
            rowIndex = 0; // Сбрасываем счетчик строк при создании новой таблицы

            return <table className={markdownStyles.table}>{children}</table>;
          },
          th: ({ children }) => <th className={markdownStyles.th}>{children}</th>,
          td: ({ children }) => <td className={markdownStyles.td}>{children}</td>,
          tr: ({ children }) => {
            const isEven = rowIndex % 2 === 1;

            rowIndex++;

            return <tr className={isEven ? markdownStyles.trEven : ''}>{children}</tr>;
          },
          ul: ({ children }) => <ul className={markdownStyles.ul}>{children}</ul>,
          ol: ({ children }) => <ol className={markdownStyles.ol}>{children}</ol>,
          li: ({ children }) => <li className={markdownStyles.li}>{children}</li>,
          input: (props) =>
            props.type === 'checkbox' ? (
              <input type='checkbox' checked={props.checked} readOnly className={markdownStyles.checkbox} />
            ) : null,
          del: ({ children }) => <del className={markdownStyles.del}>{children}</del>,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
