import React, { useEffect } from 'react';
import { Link } from 'react-router';

import NoteCard from '@/components/features/note-card';
import EmptyStateCard from '@/components/misc/empty-state-card';
import LoadingSpinner from '@/components/misc/loading-spinner';
import NewNoteCircularButton from '@/components/misc/new-note-circular-button';
import Divider from '@/components/ui/divider';
import { useIntersectionObserver } from '@/hooks';
import { useArchivesQuery } from '@/services/note-service';

export default function ArchivesView() {
	return (
		<React.Fragment>
			<div className='space-y-4'>
				<h1 className='text-2xl font-bold'>Archived Notes</h1>
				<p className='text-sm'>All your archived notes are stored here. You can restore or delete them anytime.</p>
				<NotesList />
			</div>
			<NewNoteCircularButton />
		</React.Fragment>
	);
}

function NotesList() {
	const [triggerRef, triggerInView] = useIntersectionObserver<HTMLDivElement>();

	const { data: archivesPagination, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useArchivesQuery();

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

	if (archivesPagination.pages.length === 0) {
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
		<div className='h-full space-y-2.5'>
			{archivesPagination.pages.map((page, index) => (
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
					{isFetchingNextPage && <LoadingSpinner />}
				</div>
			)}
		</div>
	);
}
