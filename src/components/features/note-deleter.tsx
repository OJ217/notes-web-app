import { useEffect, useState } from 'react';

import { IconDelete } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useDeleteNoteMutation } from '@/services/note-service';

export default function NoteDeleter({ noteId, children }: { noteId: string; children: React.ReactNode }) {
	const { mutateAsync: deleteNote, isPending: deleteNotePending, isSuccess: noteDeleted } = useDeleteNoteMutation();

	const [dialogOpened, setDialogOpened] = useState<boolean>(false);

	const handleDialogOpenChange = () => {
		if (deleteNotePending) {
			return;
		}
		setDialogOpened(!dialogOpened);
	};

	useEffect(() => {
		if (noteDeleted) {
			setDialogOpened(false);
		}
	}, [noteDeleted]);

	return (
		<Dialog open={dialogOpened} onOpenChange={handleDialogOpenChange}>
			<DialogTrigger disabled={deleteNotePending} asChild>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className='flex flex-row gap-4'>
					<div className='bg-background-300 flex size-10 shrink-0 items-center justify-center rounded-lg'>
						<IconDelete className='size-6' />
					</div>
					<div className='space-y-2'>
						<DialogTitle>Delete Note</DialogTitle>
						<DialogDescription>Are you sure you want to permanently delete this note? This action cannot be undone.</DialogDescription>
					</div>
				</DialogHeader>
				<DialogFooter className='space-x-4'>
					<Button type='button' variant={'secondary'} onClick={handleDialogOpenChange} className='text-sm'>
						Cancel
					</Button>
					<Button
						type='button'
						variant={'destructive'}
						loading={deleteNotePending}
						onClick={() => {
							void deleteNote(noteId);
						}}
						className='text-sm'
					>
						Delete Note
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
