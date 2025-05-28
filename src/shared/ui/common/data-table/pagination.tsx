import { Table } from '@tanstack/react-table';
import { PiCaretLeftBold, PiCaretRightBold, PiCaretDoubleLeftBold, PiCaretDoubleRightBold } from 'react-icons/pi';
import { Trans } from '@lingui/react/macro';

import { Button } from '../../primitives/button/button';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className='border-divider bg-default-50 sticky bottom-0 left-0 right-0 flex h-11 items-center justify-between border-t px-2 md:-bottom-4'>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          {table.getState().pagination.pageIndex + 1} <Trans>из</Trans> {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='ghost'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => {
              table.setPageIndex(0);
            }}
            isDisabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>
              <Trans>Перейти на первую страницу</Trans>
            </span>
            <PiCaretDoubleLeftBold />
          </Button>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
            onClick={() => {
              table.previousPage();
            }}
            isDisabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>
              <Trans>Перейти на предыдущую страницу</Trans>
            </span>
            <PiCaretLeftBold />
          </Button>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
            onClick={() => {
              table.nextPage();
            }}
            isDisabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>
              <Trans>Перейти на следующую страницу</Trans>
            </span>
            <PiCaretRightBold />
          </Button>
          <Button
            variant='ghost'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
            }}
            isDisabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>
              <Trans>Перейти на последнюю страницу</Trans>
            </span>
            <PiCaretDoubleRightBold />
          </Button>
        </div>
      </div>
    </div>
  );
}
