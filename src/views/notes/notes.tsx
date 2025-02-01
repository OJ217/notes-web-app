import React from 'react';

import { NotesList } from '@/components/features/notes-list';
import NewNoteCircularButton from '@/components/misc/new-note-circular-button';
import { useResponsiveLayout } from '@/hooks';

export default function NotesView() {
	const { isLarge } = useResponsiveLayout();

	if (!isLarge) {
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
}
