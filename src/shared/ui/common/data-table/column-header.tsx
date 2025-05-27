import { Column } from '@tanstack/react-table';
import { PiArrowsOutLineHorizontalBold, PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { Trans } from '@lingui/react/macro';

import { cn } from '~/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/shared/ui/primitives/dropdown';

import { Button } from '../../primitives/button/button';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: any;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm' className='data-[state=open]:bg-accent -ml-3 h-8'>
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <PiCaretDownBold />
            ) : column.getIsSorted() === 'asc' ? (
              <PiCaretUpBold />
            ) : (
              <PiArrowsOutLineHorizontalBold className='opacity-50' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem
            onClick={() => {
              column.toggleSorting(false);
            }}
          >
            <PiCaretUpBold className='text-muted-foreground/70 h-3.5 w-3.5' />
            <Trans>По возрастанию</Trans>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              column.toggleSorting(true);
            }}
          >
            <PiCaretDownBold className='text-muted-foreground/70 h-3.5 w-3.5' />
            <Trans>По убыванию</Trans>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
