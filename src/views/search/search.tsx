import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import NoteCard from '@/components/features/note-card';
import { IconSearch } from '@/components/icons';
import EmptyStateCard from '@/components/misc/empty-state-card';
import LoadingSpinner from '@/components/misc/loading-spinner';
import Divider from '@/components/ui/divider';
import { InputWithIcon } from '@/components/ui/input';
import { useDebouncedCallback, useIntersectionObserver } from '@/hooks';
import { useNotesSearchQuery } from '@/services/note-service';

export default function SearchView() {
	// ** Local search state
	const [search, setSearch] = useState<string>('');
	const debouncedSetSearch = useDebouncedCallback((newSearchValue: string) => {
		setSearch(newSearchValue.trim());
	}, 750);

	// ** Search param
	const [searchParams, setSearchParams] = useSearchParams();
	const searchParamValue = searchParams.get('query');

	// ** Input handler
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchParams({ query: e.target.value }, { replace: true });
	};

	useEffect(() => {
		debouncedSetSearch(searchParamValue ?? '');
	}, [searchParamValue, debouncedSetSearch]);

	return (
		<div className='space-y-4'>
			<h1 className='text-2xl font-bold'>Search</h1>

			<InputWithIcon icon={IconSearch} value={searchParamValue ?? ''} onChange={handleInputChange} />

			<p className='text-sm text-neutral-700'>
				{searchParamValue !== null && searchParamValue.trim() !== '' ? `All notes matching ”${searchParamValue}” are displayed below.` : 'Please enter your search keyword'}
			</p>

			<SearchResult search={search} />
		</div>
	);
}

function SearchResult({ search }: { search: string }) {
	const [triggerRef, triggerInView] = useIntersectionObserver<HTMLDivElement>();

	const { data: searchResult, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useNotesSearchQuery(search);

	useEffect(() => {
		if (triggerInView && hasNextPage) {
			void fetchNextPage();
		}
	}, [triggerInView, hasNextPage, fetchNextPage]);

	if (search === '' || search === null) {
		return;
	}

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error has occured</div>;
	}

	if (searchResult.pages.length === 0 || searchResult.pages[0].docs.length === 0) {
		return (
			<EmptyStateCard>
				No notes match your search. Try a different keyword or{' '}
				<Link to={'/notes/new'} className='underline underline-offset-3'>
					create a new note.
				</Link>
			</EmptyStateCard>
		);
	}

	return (
		<div className='h-full space-y-2.5'>
			{searchResult.pages.map((page, index) => (
				<React.Fragment key={index}>
					{page.docs.map((note) => (
						<React.Fragment key={note.id}>
							<NoteCard {...note} />
							<Divider />
						</React.Fragment>
					))}
				</React.Fragment>
			))}
			{hasNextPage && (
				<div ref={triggerRef} className='flex justify-center'>
					{isFetchingNextPage && <LoadingSpinner className='pt-1 text-neutral-700' />}
				</div>
			)}
		</div>
	);
}
