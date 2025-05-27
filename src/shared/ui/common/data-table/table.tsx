import * as React from 'react';

import { cn } from '~/shared/lib/utils';

const Table = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement> & { ref?: React.RefObject<HTMLTableElement | null> }) => (
  <div className='relative w-full overflow-auto'>
    <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
  </div>
);

Table.displayName = 'Table';

const TableHeader = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & { ref?: React.RefObject<HTMLTableSectionElement | null> }) => (
  <thead ref={ref} className={cn('border-divider [&_tr]:border-b', className)} {...props} />
);

TableHeader.displayName = 'TableHeader';

const TableBody = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & { ref?: React.RefObject<HTMLTableSectionElement | null> }) => (
  <tbody ref={ref} className={cn('border-divider [&_tr:last-child]:border-0', className)} {...props} />
);

TableBody.displayName = 'TableBody';

const TableFooter = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & { ref?: React.RefObject<HTMLTableSectionElement | null> }) => (
  <tfoot
    ref={ref}
    className={cn('bg-foreground/50 border-divider border-t font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
);

TableFooter.displayName = 'TableFooter';

const TableRow = ({
  ref,
  className,
  isHeader,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & {
  ref?: React.RefObject<HTMLTableRowElement | null>;
  isHeader?: boolean;
}) => (
  <tr
    ref={ref}
    className={cn(
      'border-divider border-b transition-colors',
      !isHeader && 'hover:bg-foreground/5 data-[state=selected]:bg-foreground/10',
      className,
    )}
    {...props}
  />
);

TableRow.displayName = 'TableRow';

const TableHead = ({
  ref,
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & { ref?: React.RefObject<HTMLTableCellElement | null> }) => (
  <th
    ref={ref}
    className={cn(
      'text-default-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
);

TableHead.displayName = 'TableHead';

const TableCell = ({
  ref,
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & { ref?: React.RefObject<HTMLTableCellElement | null> }) => (
  <td ref={ref} className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />
);

TableCell.displayName = 'TableCell';

const TableCaption = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement> & { ref?: React.RefObject<HTMLTableCaptionElement | null> }) => (
  <caption ref={ref} className={cn('text-default-foreground mt-4 text-sm', className)} {...props} />
);

TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
