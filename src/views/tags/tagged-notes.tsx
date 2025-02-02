import React from 'react';
import { useParams } from 'react-router';

import { TaggedNotesList } from '@/components/features/notes-list';
import BackButton from '@/components/misc/back-button';
import { NewNoteCircularButton } from '@/components/misc/new-note-button';
import { useLayoutStore } from '@/stores/layout-store';

export default function TaggedNotesView() {
	const { tag } = useParams();
	const { isLarge } = useLayoutStore();

	if (!isLarge) {
		return (
			<React.Fragment>
				<div className='space-y-4'>
					<BackButton to={'/tags'} />

					<h1 className='text-2xl font-bold'>
						<span className='text-neutral-600'>Notes Tagged:</span> {tag}
					</h1>

					<p className='text-sm text-neutral-700'>All notes with the ”{tag}” tag are shown here.</p>

					<TaggedNotesList tag={tag} />
				</div>

				<NewNoteCircularButton />
			</React.Fragment>
		);
	}
}
