import { useEffect, useState } from 'react';

import { IconRestore } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRestoreNoteMutation } from '@/services/note-service';

export default function NoteRestorer({ noteId, children }: { noteId: string; children: React.ReactNode }) {
	const { mutateAsync: restoreNote, isPending: restoreNotePending, isSuccess: noteRestored } = useRestoreNoteMutation();

	const [dialogOpened, setDialogOpened] = useState<boolean>(false);

	const handleDialogOpenChange = () => {
		if (restoreNotePending) {
			return;
		}
		setDialogOpened(!dialogOpened);
	};

	useEffect(() => {
		if (noteRestored) {
			setDialogOpened(false);
		}
	}, [noteRestored, setDialogOpened]);

	return (
		<Dialog open={dialogOpened} onOpenChange={handleDialogOpenChange}>
			<DialogTrigger disabled={restoreNotePending} asChild>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className='flex flex-row gap-4'>
					<div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100'>
						<IconRestore className='size-6' />
					</div>
					<div className='space-y-2'>
						<DialogTitle>Restore Note</DialogTitle>
						<DialogDescription>Are you sure you want to restore this note? You can find it in the Notes section and archive it anytime.</DialogDescription>
					</div>
				</DialogHeader>
				<DialogFooter className='space-x-4'>
					<Button type='button' variant={'secondary'} onClick={handleDialogOpenChange} className='text-sm'>
						Cancel
					</Button>
					<Button
						type='button'
						loading={restoreNotePending}
						onClick={() => {
							void restoreNote(noteId);
						}}
						className='text-sm'
					>
						Restore Note
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
