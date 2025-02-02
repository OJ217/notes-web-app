import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { IconSearch } from '@/components/icons';
import { InputWithIcon } from '@/components/ui/input';
import { useDebouncedCallback } from '@/hooks';
import { isNilString } from '@/lib/utils';
import { useSearchStore } from '@/stores/search-store';

export default function SearchInput({ debounceDuration = 750, className }: { debounceDuration?: number; className?: string }) {
	// ** Utility hooks
	const { pathname } = useLocation();
	const navigate = useNavigate();

	// ** Store values
	const { searchInputValue, setSearch, setSearchInputValue } = useSearchStore();

	// ** Query param values
	const [searchParams, setSearchParams] = useSearchParams();
	const searchParamValue = searchParams.get('query') ?? '';

	// ** Debounce
	const debouncedSetSearch = useDebouncedCallback((newSearchValue: string) => {
		setSearch(newSearchValue);
	}, debounceDuration);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newSearchValue = e.target.value;

			setSearchInputValue(newSearchValue);

			const updatedSearchParams = new URLSearchParams(searchParams);

			if (isNilString(newSearchValue)) {
				updatedSearchParams.delete('query');
				setSearch('');
			} else {
				updatedSearchParams.set('query', newSearchValue);
			}

			setSearchParams(updatedSearchParams, { replace: true });

			if (!pathname.startsWith('/search')) {
				navigate({ pathname: '/search', search: updatedSearchParams.toString() });
			}
		},
		[navigate, pathname, searchParams, setSearch, setSearchInputValue, setSearchParams],
	);

	// ** Sync query param with store values
	useEffect(() => {
		debouncedSetSearch(searchParamValue);
		setSearchInputValue(searchParamValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParamValue]);

	return <InputWithIcon icon={IconSearch} value={searchInputValue} onChange={(e) => handleInputChange(e)} placeholder='Search by title or content' className={className} />;
}
