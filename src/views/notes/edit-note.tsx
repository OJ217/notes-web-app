import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';

import NoteArchiver from '@/components/features/note-archiver';
import NoteDeleter from '@/components/features/note-deleter';
import { IconArrowLeft, IconCircleClock, IconTag } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNavigateBack, useNotifyErrors } from '@/hooks';
import { formatDate } from '@/lib/utils';
import { useNoteQuery, useUpdateNoteMutation } from '@/services/note-service';
import { MutateNoteData, MutateNoteFormInput, mutateNoteSchema } from '@/services/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function EditNoteView() {
	const params = useParams();
	const noteId = params.id!;
	const navigateBack = useNavigateBack();

	const { data: note, isPending: noteQueryPending, isSuccess: noteQuerySuccess, isFetched: noteFetched } = useNoteQuery({ noteId: noteId! });

	const [editFormReset, setEditFormReset] = useState<boolean>(false);

	const editNoteForm = useForm<MutateNoteFormInput, unknown, MutateNoteData>({
		resolver: zodResolver(mutateNoteSchema),
		defaultValues: {
			title: '',
			content: '',
			tags: '',
		},
	});

	useNotifyErrors({ control: editNoteForm.control });

	useEffect(() => {
		if (noteFetched) {
			if (note !== undefined) {
				editNoteForm.reset({
					title: note.title,
					content: note.content,
					tags: note.tags.join(', '),
				});
			}
			setEditFormReset(true);
		}
	}, [note, editNoteForm, noteFetched]);

	const { mutateAsync: updateNote, isPending: updateNotePending } = useUpdateNoteMutation();

	const handleEditNoteFormSubmit = async (noteData: MutateNoteData) => {
		toast.promise(async () => await updateNote({ noteId, note: noteData }), {
			loading: 'Saving note',
			success: 'Note has been saved',
		});
	};

	if (noteQueryPending || !noteFetched || !editFormReset) {
		return <div>Loading...</div>;
	}

	if ((noteFetched && note === undefined) || !noteQuerySuccess) {
		return <div>Note not found</div>;
	}

	return (
		<>
			<Form {...editNoteForm}>
				<form className='flex h-full flex-col gap-3' onSubmit={editNoteForm.handleSubmit(handleEditNoteFormSubmit)}>
					<div className='flex h-5 items-center justify-between gap-4 text-xs md:text-sm'>
						<Button type='button' onClick={navigateBack} disabled={updateNotePending} className='text-neutral-600 hover:text-neutral-950' variant={'ghost'}>
							<IconArrowLeft className='size-4' />
							<span>Go Back</span>
						</Button>
						<div className='flex items-center gap-4'>
							<NoteDeleter noteId={noteId} triggerDisabled={updateNotePending} />

							<NoteArchiver noteId={noteId} triggerDisabled={updateNotePending} />

							<Button type='button' onClick={navigateBack} disabled={updateNotePending} variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
								<span className='text-xs md:text-sm'>Cancel</span>
							</Button>
							<Button
								type='submit'
								disabled={!editNoteForm.formState.isDirty || updateNotePending}
								className='text-blue-500 hover:text-blue-700 focus-visible:ring-blue-700/50'
								variant={'ghost'}
							>
								<span className='text-xs md:text-sm'>Save Note</span>
							</Button>
						</div>
					</div>

					<Divider />

					<FormField
						name='title'
						control={editNoteForm.control}
						render={({ field }) => (
							<Input
								type='text'
								variant={'unstyled'}
								disabled={updateNotePending}
								className='text-2xl font-bold placeholder:text-neutral-950'
								placeholder='Enter a title…'
								autoComplete='off'
								{...field}
							/>
						)}
					/>

					<div className='grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 py-1 text-xs text-neutral-700 md:text-sm'>
						<div className='flex items-center gap-2'>
							<IconTag className='size-4 shrink-0' />
							<p>Tags</p>
						</div>

						<FormField
							name='tags'
							control={editNoteForm.control}
							render={({ field }) => (
								<Input
									variant={'unstyled'}
									type='text'
									disabled={updateNotePending}
									className='placeholder:text-neutral-400'
									placeholder='Add tags separated by commas'
									autoComplete='off'
									{...field}
								/>
							)}
						/>

						<div className='flex items-center gap-2'>
							<IconCircleClock className='size-4 shrink-0' />
							<p>Last edited</p>
						</div>

						<p>{formatDate(note.createdAt)}</p>
					</div>

					<Divider />

					<FormField
						name='content'
						control={editNoteForm.control}
						render={({ field }) => (
							<textarea
								disabled={updateNotePending}
								placeholder='Start typing your note here…'
								className='flex-grow resize-none text-xs transition-opacity duration-300 ease-in-out outline-none disabled:opacity-50 md:text-sm'
								{...field}
							/>
						)}
					/>
				</form>
			</Form>
		</>
	);
}
