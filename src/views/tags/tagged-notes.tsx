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
					<BackButton />

					<h1 className='text-2xl font-bold'>
						<span className='text-foreground-100'>Notes Tagged:</span> {tag}
					</h1>

					<p className='text-foreground-200 text-sm'>All notes with the ”{tag}” tag are shown here.</p>

					<TaggedNotesList tag={tag} />
				</div>

				<NewNoteCircularButton />
			</React.Fragment>
		);
	}
}
