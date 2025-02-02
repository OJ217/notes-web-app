import React from 'react';

import { ArchivesList } from '@/components/features/notes-list';
import { NewNoteCircularButton } from '@/components/misc/new-note-button';
import { useLayoutStore } from '@/stores/layout-store';

export default function ArchivesView() {
	const { isLarge } = useLayoutStore();

	if (!isLarge) {
		return (
			<React.Fragment>
				<div className='space-y-4'>
					<h1 className='text-2xl font-bold'>Archived Notes</h1>
					<p className='text-sm'>All your archived notes are stored here. You can restore or delete them anytime.</p>
					<ArchivesList />
				</div>
				<NewNoteCircularButton />
			</React.Fragment>
		);
	}
}
