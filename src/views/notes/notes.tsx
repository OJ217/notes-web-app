import React from 'react';
import { Link } from 'react-router';

import NoteCard from '@/components/features/note-card';
import { IconPlus } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { isNotLastElement } from '@/lib/utils';
import { useNotesQuery } from '@/services/note-service';

export default function NotesView() {
	return (
		<React.Fragment>
			<div className='space-y-4'>
				<h1 className='text-2xl font-bold'>All Notes</h1>

				<NotesList />
			</div>
			<Button asChild className='fixed right-4 bottom-[73px] size-12 rounded-full ring-offset-transparent md:bottom-[101px] md:size-16'>
				<Link to={'/notes/new'}>
					<IconPlus className='size-8' />
				</Link>
			</Button>
		</React.Fragment>
	);
}

function NotesList() {
	const { data: notes, isPending, isError } = useNotesQuery();

	if (isPending) {
		return <div>Loading Notes...</div>;
	}

	if (isError) {
		return <div>Error Occured</div>;
	}

	if (notes.length === 0) {
		return <div>No notes</div>;
	}

	return (
		<div className='h-full space-y-2.5'>
			{notes.map((note, index) => (
				<React.Fragment key={note.id}>
					<NoteCard {...note} />
					{isNotLastElement(notes, index) && <Divider />}
				</React.Fragment>
			))}
		</div>
	);
}
