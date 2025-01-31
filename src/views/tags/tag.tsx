import NoteCard from '@/components/features/note-card';
import BackButton from '@/components/misc/back-button';
import NewNoteCircularButton from '@/components/misc/new-note-circular-button';
import Divider from '@/components/ui/divider';
import { useTaggedNotesQuery } from '@/services/note-service';
import React from 'react';
import { useParams } from 'react-router';

export default function TagView() {
	const params = useParams();
	const tag = params.tag!;

	return (
		<React.Fragment>
			<div className='space-y-4'>
				<BackButton to={'/tags'} />

				<h1 className='text-2xl font-bold'>
					<span className='text-neutral-600'>Notes Tagged:</span> {tag}
				</h1>

				<p className='text-sm text-neutral-700'>All notes with the ”{tag}” tag are shown here.</p>

				<TaggesNotesList tag={tag} />
			</div>

			<NewNoteCircularButton />
		</React.Fragment>
	);
}

function TaggesNotesList({ tag }: { tag: string }) {
	const { data: taggedNotes, isPending, isError } = useTaggedNotesQuery(tag);

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error has occured</div>;
	}

	return (
		<div className='space-y-2.5'>
			{taggedNotes.map((note) => (
				<React.Fragment key={note.id}>
					<NoteCard {...note} />
					<Divider />
				</React.Fragment>
			))}
		</div>
	);
}
