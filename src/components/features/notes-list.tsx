import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router';

import NoteCard from '@/components/features/note-card';
import EmptyStateCard from '@/components/misc/empty-state-card';
import LoadingSpinner from '@/components/misc/loading-spinner';
import Divider from '@/components/ui/divider';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn, isNilString } from '@/lib/utils';
import { useArchivesQuery, useNotesQuery, useSearchNotesQuery, useTaggedNotesQuery } from '@/services/note-service';
import { NoteListItem, PaginatedResponse } from '@/types';
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

// ** Base Component for Displaying List of Note Cards
function NotesCardList({
	pagination,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	noteBasePath,
	className,
}: {
	pagination: InfiniteData<PaginatedResponse<NoteListItem>>;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<PaginatedResponse<NoteListItem>, unknown>, Error>>;
	noteBasePath?: string;
	className?: string;
}) {
	const { id } = useParams();
	const [triggerRef, triggerInView] = useIntersectionObserver<HTMLDivElement>();

	useEffect(() => {
		if (triggerInView) {
			void fetchNextPage();
		}
	}, [triggerInView, fetchNextPage]);

	return (
		<div className={cn('space-y-2.5', className)}>
			{pagination.pages.map((page, index) => (
				<React.Fragment key={index}>
					{page.docs.map((note) => (
						<React.Fragment key={note.id}>
							<NoteCard {...note} {...(noteBasePath !== undefined && { basePath: noteBasePath })} selected={id === note.id} />
							<Divider />
						</React.Fragment>
					))}
				</React.Fragment>
			))}
			{hasNextPage && (
				<div ref={triggerRef} className='flex justify-center pt-1'>
					{isFetchingNextPage && <LoadingSpinner />}
				</div>
			)}
		</div>
	);
}

export function NotesList({ className }: { className?: string }) {
	const { data: notesPagination, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useNotesQuery();

	if (isPending) {
		return (
			<div className='flex justify-center pt-8'>
				<LoadingSpinner />
			</div>
		);
	}

	if (isError) {
		return <div>Error has occured</div>;
	}

	if (notesPagination.pages.length === 0 || notesPagination.pages[0].docs.length === 0) {
		return <EmptyStateCard>You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</EmptyStateCard>;
	}

	return <NotesCardList pagination={notesPagination} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} className={className} />;
}

export function ArchivesList({ className }: { className?: string }) {
	const { data: archivesPagination, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useArchivesQuery();

	if (isPending) {
		return (
			<div className='flex justify-center pt-8'>
				<LoadingSpinner />
			</div>
		);
	}

	if (isError) {
		return <div>Error has occured</div>;
	}

	if (archivesPagination.pages.length === 0 || archivesPagination.pages[0].docs.length === 0) {
		return (
			<EmptyStateCard>
				<React.Fragment>
					No notes have been archived yet. Move notes here for safekeeping, or{' '}
					<Link to={'/notes/new'} className='underline underline-offset-3'>
						create a new note.
					</Link>
				</React.Fragment>
			</EmptyStateCard>
		);
	}

	return <NotesCardList pagination={archivesPagination} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} className={className} />;
}

export function TaggedNotesList({ tag, className }: { tag?: string; className?: string }) {
	const { data: taggedNotesPagination, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useTaggedNotesQuery(tag);

	if (tag === undefined) {
		return <EmptyStateCard>Please select a tag</EmptyStateCard>;
	}

	if (isPending) {
		return (
			<div className='flex justify-center pt-8'>
				<LoadingSpinner />
			</div>
		);
	}

	if (isError) {
		return <div>Error has occured</div>;
	}

	if (taggedNotesPagination.pages.length === 0 || taggedNotesPagination.pages[0].docs.length === 0) {
		return (
			<EmptyStateCard>
				<React.Fragment>
					No notes have been archived yet. Move notes here for safekeeping, or{' '}
					<Link to={'/notes/new'} className='underline underline-offset-3'>
						create a new note.
					</Link>
				</React.Fragment>
			</EmptyStateCard>
		);
	}
	return (
		<NotesCardList
			pagination={taggedNotesPagination}
			hasNextPage={hasNextPage}
			isFetchingNextPage={isFetchingNextPage}
			fetchNextPage={fetchNextPage}
			noteBasePath={`/tags/${tag}`}
			className={className}
		/>
	);
}

export function SearchedNotesList({ search, className, showEmptySearchState = false }: { search?: string; className?: string; showEmptySearchState?: boolean }) {
	const { data: searchResult, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchNotesQuery(search);

	if (isNilString(search)) {
		if (showEmptySearchState) {
			return <EmptyStateCard>Please enter your search keyword</EmptyStateCard>;
		}
		return;
	}

	if (isPending) {
		return (
			<div className='flex justify-center pt-8'>
				<LoadingSpinner />
			</div>
		);
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

	return <NotesCardList pagination={searchResult} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} noteBasePath='/search' className={className} />;
}
