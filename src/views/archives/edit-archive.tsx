import { useParams } from 'react-router';

import NoteDeleter from '@/components/features/note-deleter';
import { ArchivedNoteForm } from '@/components/features/note-form';
import NoteRestorer from '@/components/features/note-restorer';
import { IconDelete, IconRestore } from '@/components/icons';
import BackButton from '@/components/misc/back-button';
import { Button } from '@/components/ui/button';
import { useNavigateBack } from '@/hooks';
import { useLayoutStore } from '@/stores/layout-store';

export default function EditArchiveView() {
	const { isLarge } = useLayoutStore();
	const params = useParams();
	const noteId = params.id!;
	const navigateBack = useNavigateBack();

	return (
		<div className='lg:grid lg:grid-cols-[1fr_200px] xl:grid-cols-[1fr_240px]'>
			<div className='lg:px-6 lg:py-5'>
				<ArchivedNoteForm
					noteId={noteId}
					header={
						!isLarge && (
							<div className='flex h-5 items-center justify-between gap-4 text-xs md:text-sm'>
								<BackButton />

								<div className='flex items-center gap-4'>
									<NoteDeleter noteId={noteId}>
										<Button type='button' variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
											<IconDelete className='size-5' />
										</Button>
									</NoteDeleter>

									<NoteRestorer noteId={noteId}>
										<Button type='button' variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
											<IconRestore className='size-[18px]' />
										</Button>
									</NoteRestorer>

									<Button type='button' onClick={navigateBack} variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
										<span className='text-xs md:text-sm'>Cancel</span>
									</Button>

									<Button type='submit' className='text-blue-500 hover:text-blue-700 focus-visible:ring-blue-700/50' variant={'ghost'}>
										<span className='text-xs md:text-sm'>Save Note</span>
									</Button>
								</div>
							</div>
						)
					}
					footer={
						isLarge && (
							<div className='flex items-center gap-4'>
								<Button type='submit' size={'lg'}>
									Save Note
								</Button>
								<Button type='button' onClick={navigateBack} variant={'secondary'}>
									Cancel
								</Button>
							</div>
						)
					}
				/>
			</div>

			{isLarge && (
				<div className='space-y-3 border-l border-l-neutral-200 px-4 py-5'>
					<NoteRestorer noteId={noteId}>
						<Button fullWidth variant={'outline'} className='justify-start'>
							<IconRestore className='size-5' />
							<span>Restore Note</span>
						</Button>
					</NoteRestorer>

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
