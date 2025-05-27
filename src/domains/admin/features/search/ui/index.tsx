import { useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useLingui } from '@lingui/react/macro';

import { Input } from '~/shared/ui/primitives/input';
import { useSearch } from '~/domains/admin/features/search/lib/use-search';

export function AdminSearch() {
  const { search, setSearch } = useSearch();
  const location = useLocation();
  const { t } = useLingui();

  useEffect(() => {
    setSearch('');
  }, [location]);

  return (
    <Input
      aria-label={t`Поиск`}
      placeholder={t`Поиск`}
      name='search'
      type='search'
      value={search}
      className='h-9'
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
  );
}
