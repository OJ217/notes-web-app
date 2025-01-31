import { useParams } from 'react-router';
import { toast } from 'sonner';

import NoteDeleter from '@/components/features/note-deleter';
import NoteRestorer from '@/components/features/note-restorer';
import { IconArrowLeft, IconCircleClock, IconTag } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { Input } from '@/components/ui/input';
import { useNavigateBack } from '@/hooks';
import { formatDate } from '@/lib/utils';
import { useNoteQuery } from '@/services/note-service';

export default function EditArchiveView() {
	const params = useParams();
	const noteId = params.id!;
	const navigateBack = useNavigateBack({ fallback: '/archives' });

	const { data: archivedNote, isPending, isSuccess } = useNoteQuery({ noteId: noteId! });

	const handleFormFieldClick = () => {
		toast.dismiss();
		toast.warning('Please restore the note first');
	};

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (!isSuccess) {
		return <div>Note not found</div>;
	}

	return (
		<form className='flex h-full flex-col gap-3'>
			<div className='flex h-5 items-center justify-between gap-4 text-xs md:text-sm'>
				<Button type='button' onClick={navigateBack} className='text-neutral-600 hover:text-neutral-950' variant={'ghost'}>
					<IconArrowLeft className='size-4' />
					<span>Go Back</span>
				</Button>
				<div className='flex items-center gap-4'>
					<NoteDeleter noteId={noteId} />

					<NoteRestorer noteId={noteId} />

					<Button type='button' onClick={navigateBack} variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
						<span className='text-xs md:text-sm'>Cancel</span>
					</Button>

					<Button type='button' onClick={handleFormFieldClick} className='text-blue-500 hover:text-blue-700 focus-visible:ring-blue-700/50' variant={'ghost'}>
						<span className='text-xs md:text-sm'>Save Note</span>
					</Button>
				</div>
			</div>

			<Divider />

			<Input
				readOnly
				type='text'
				variant={'unstyled'}
				value={archivedNote.title}
				onClick={handleFormFieldClick}
				className='text-2xl font-bold select-none placeholder:text-neutral-950'
				placeholder='Enter a title…'
				autoComplete='off'
			/>

			<div className='grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 py-1 text-xs text-neutral-700 md:text-sm'>
				<div className='flex items-center gap-2'>
					<IconTag className='size-4 shrink-0' />
					<p>Tags</p>
				</div>

				<Input
					readOnly
					type='text'
					variant={'unstyled'}
					value={archivedNote.tags.join(', ')}
					onClick={handleFormFieldClick}
					className='select-none placeholder:text-neutral-400'
					placeholder='Add tags separated by commas'
					autoComplete='off'
				/>

				<div className='flex items-center gap-2'>
					<IconCircleClock className='size-4 shrink-0' />
					<p>Last edited</p>
				</div>

				<p>{formatDate(archivedNote.createdAt)}</p>
			</div>

			<Divider />

			<textarea
				readOnly
				value={archivedNote.content}
				onClick={handleFormFieldClick}
				placeholder='Start typing your note here…'
				className='flex-grow resize-none text-xs transition-opacity duration-300 ease-in-out outline-none select-none disabled:opacity-50 md:text-sm'
			/>
		</form>
	);
}
