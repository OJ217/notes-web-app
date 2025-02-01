import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';

import NoteArchiver from '@/components/features/note-archiver';
import NoteDeleter from '@/components/features/note-deleter';
import { MutateNoteForm } from '@/components/features/note-form';
import { IconArchive, IconDelete } from '@/components/icons';
import BackButton from '@/components/misc/back-button';
import { Button } from '@/components/ui/button';
import { useNavigateBack, useNotifyErrors, useResponsiveLayout } from '@/hooks';
import { useUpdateNoteMutation } from '@/services/note-service';
import { MutateNoteFormData, MutateNoteFormInput, mutateNoteSchema } from '@/services/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function EditNoteView() {
	const { isLarge } = useResponsiveLayout();
	const params = useParams();
	const noteId = params.id!;
	const navigateBack = useNavigateBack();

	const editNoteForm = useForm<MutateNoteFormInput, unknown, MutateNoteFormData>({
		resolver: zodResolver(mutateNoteSchema),
		defaultValues: {
			title: '',
			content: '',
			tags: '',
		},
	});

	useNotifyErrors({ control: editNoteForm.control });

	const { mutateAsync: updateNote, isPending: updateNotePending } = useUpdateNoteMutation();

	const handleEditNoteFormSubmit = async (noteData: MutateNoteFormData) => {
		toast.promise(async () => await updateNote({ noteId, note: noteData }), {
			loading: 'Saving note',
			success: 'Note has been saved',
		});
	};

	return (
		<div className='lg:grid lg:grid-cols-[1fr_200px] xl:grid-cols-[1fr_240px]'>
			<div className='lg:px-6 lg:py-5'>
				<MutateNoteForm
					noteId={noteId}
					form={editNoteForm}
					disabled={updateNotePending}
					onSubmit={handleEditNoteFormSubmit}
					header={
						!isLarge && (
							<div className='flex h-5 items-center justify-between gap-4 text-xs md:text-sm'>
								<BackButton />

								<div className='flex items-center gap-4'>
									<NoteDeleter noteId={noteId}>
										<Button type='button' disabled={updateNotePending} variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
											<IconDelete className='size-5' />
										</Button>
									</NoteDeleter>

									<NoteArchiver noteId={noteId}>
										<Button type='button' variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
											<IconArchive className='size-[18px]' />
										</Button>
									</NoteArchiver>

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
						)
					}
					footer={
						isLarge && (
							<div className='flex items-center gap-4'>
								<Button type='submit' disabled={!editNoteForm.formState.isDirty || updateNotePending} size={'lg'}>
									Save Note
								</Button>
								<Button type='button' variant={'secondary'}>
									Cancel
								</Button>
							</div>
						)
					}
				/>
			</div>

			{isLarge && (
				<div className='space-y-3 border-l border-l-neutral-200 px-4 py-5'>
					<NoteArchiver noteId={noteId}>
						<Button fullWidth variant={'outline'} className='justify-start'>
							<IconArchive className='size-5' />
							<span>Archive Note</span>
						</Button>
					</NoteArchiver>

					<NoteDeleter noteId={noteId}>
						<Button fullWidth type='button' variant={'outline'} className='justify-start'>
							<IconDelete className='size-5' />
							<span>Delete Note</span>
						</Button>
					</NoteDeleter>
				</div>
			)}
		</div>
	);
}
