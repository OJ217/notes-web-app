import React, { useEffect } from 'react';

import NoteCard from '@/components/features/note-card';
import EmptyStateCard from '@/components/misc/empty-state-card';
import LoadingSpinner from '@/components/misc/loading-spinner';
import NewNoteCircularButton from '@/components/misc/new-note-circular-button';
import Divider from '@/components/ui/divider';
import { useIntersectionObserver } from '@/hooks';
import { useNotesQuery } from '@/services/note-service';

export default function NotesView() {
	return (
		<React.Fragment>
			<div className='space-y-4'>
				<h1 className='text-2xl font-bold'>All Notes</h1>

				<NotesList />
			</div>
			<NewNoteCircularButton />
		</React.Fragment>
	);
}

function NotesList() {
	const [triggerRef, triggerInView] = useIntersectionObserver<HTMLDivElement>();

	const { data: notesPagination, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useNotesQuery();

	useEffect(() => {
		if (triggerInView) {
			void fetchNextPage();
		}
	}, [triggerInView, fetchNextPage]);

	if (isPending) {
		return <div>Loading notes...</div>;
	}

	if (isError) {
		return <div>Error has occured</div>;
	}

	if (notesPagination.pages.length === 0 || notesPagination.pages[0].docs.length === 0) {
		return <EmptyStateCard>You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</EmptyStateCard>;
	}

	return (
		<div className='h-full space-y-2.5'>
			{notesPagination.pages.map((page, index) => (
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
