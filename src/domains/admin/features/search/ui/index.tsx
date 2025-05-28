import { useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useLingui } from '@lingui/react/macro';

import { Input } from '~/shared/ui/primitives/input';
import { useSearch } from '~/domains/admin/features/search/lib/use-search';
import { useDebounce } from '~/shared/lib/hooks/use-debounce';

export function AdminSearch() {
  const location = useLocation();
  const { t } = useLingui();

  const { setSearch } = useSearch();

  const [inputValue, setInputValue] = useState('');
  const debouncedSearchValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearch(debouncedSearchValue);
  }, [debouncedSearchValue, setSearch]);

  useEffect(() => {
    setInputValue('');
    setSearch('');
  }, [location]);

  return (
    <Input
      aria-label={t`Поиск`}
      placeholder={t`Поиск`}
      name='search'
      type='search'
      value={inputValue}
      className='h-9'
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
    />
  );
}
