import { useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { IconSearch } from '@/components/icons';
import { InputWithIcon } from '@/components/ui/input';
import { isNilString } from '@/lib/utils';
import { useSearchStore } from '@/stores/search-store';

export default function SearchInput({ className }: { className?: string }) {
	// ** Utility hooks
	const { pathname } = useLocation();
	const navigate = useNavigate();

	// ** Store values
	const { search, setSearch } = useSearchStore();

	// ** Query param values
	const [searchParams, setSearchParams] = useSearchParams();

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newSearchValue = e.target.value;

			const updatedSearchParams = new URLSearchParams(searchParams);

			if (isNilString(newSearchValue)) {
				updatedSearchParams.delete('query');
				setSearch('');
			} else {
				updatedSearchParams.set('query', newSearchValue);
				setSearch(newSearchValue);
			}

			setSearchParams(updatedSearchParams, { replace: true });

			if (!pathname.startsWith('/search')) {
				navigate({ pathname: '/search', search: updatedSearchParams.toString() });
			}
		},
		[navigate, pathname, searchParams, setSearch, setSearchParams],
	);

	return <InputWithIcon icon={IconSearch} value={search} onChange={handleInputChange} placeholder='Search by title or content' className={className} />;
}
