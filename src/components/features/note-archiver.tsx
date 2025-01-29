import { useEffect, useState } from 'react';

import { IconArchive } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useArchiveNoteMutation } from '@/services/note-service';

export default function NoteArchiver({ noteId, triggerDisabled }: { noteId: string; triggerDisabled: boolean }) {
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
			<DialogTrigger asChild>
				<Button type='button' disabled={triggerDisabled || archiveNotePending} variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
					<IconArchive className='size-[18px]' />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className='flex flex-row gap-4'>
					<div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100'>
						<IconArchive className='size-6' />
					</div>
					<div className='space-y-2'>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
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
