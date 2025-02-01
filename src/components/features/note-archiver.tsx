import { useEffect, useState } from 'react';

import { IconArchive } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useArchiveNoteMutation } from '@/services/note-service';

export default function NoteArchiver({ noteId, children }: { noteId: string; children: React.ReactNode }) {
	const { mutateAsync: archiveNote, isPending: archiveNotePending, isSuccess: noteArchived } = useArchiveNoteMutation();

	const [dialogOpened, setDialogOpened] = useState<boolean>(false);

	const handleDialogOpenChange = () => {
		if (archiveNotePending) {
			return;
		}
		setDialogOpened(!dialogOpened);
	};

	useEffect(() => {
		if (noteArchived) {
			setDialogOpened(false);
		}
	}, [noteArchived]);

	return (
		<Dialog open={dialogOpened} onOpenChange={handleDialogOpenChange}>
			<DialogTrigger disabled={archiveNotePending} asChild>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className='flex flex-row gap-4'>
					<div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100'>
						<IconArchive className='size-6' />
					</div>
					<div className='space-y-2'>
						<DialogTitle>Archive Note</DialogTitle>
						<DialogDescription>Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.</DialogDescription>
					</div>
				</DialogHeader>
				<DialogFooter className='space-x-4'>
					<Button type='button' variant={'secondary'} onClick={handleDialogOpenChange} className='text-sm'>
						Cancel
					</Button>
					<Button
						type='button'
						loading={archiveNotePending}
						onClick={() => {
							void archiveNote(noteId);
						}}
						className='text-sm'
					>
						Archive Note
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
