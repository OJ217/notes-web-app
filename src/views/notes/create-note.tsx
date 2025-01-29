import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { IconArrowLeft, IconCircleClock, IconTag } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNavigateBack, useNotifyErrors } from '@/hooks';
import { useCreateNoteMutation } from '@/services/note-service';
import { MutateNoteFormInput, MutateNoteData, mutateNoteSchema } from '@/services/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreateNoteView() {
	// Utility hooks
	const navigateBack = useNavigateBack();

	// Form hooks
	const createNoteForm = useForm<MutateNoteFormInput, unknown, MutateNoteData>({
		defaultValues: {
			title: '',
			content: '',
			tags: '',
		},
		resolver: zodResolver(mutateNoteSchema),
	});

	useNotifyErrors({ control: createNoteForm.control });

	// Service handler
	const { mutateAsync: createNote, isPending } = useCreateNoteMutation();

	const handleCreateNoteFormSubmit = async (noteData: MutateNoteData) => {
		toast.promise(async () => await createNote(noteData), {
			loading: 'Saving note',
			success: 'Note has been saved',
		});
	};

	return (
		<Form {...createNoteForm}>
			<form className='flex h-full flex-col gap-3' onSubmit={createNoteForm.handleSubmit(handleCreateNoteFormSubmit)}>
				<div className='flex h-5 items-center justify-between gap-4 text-xs md:text-sm'>
					<Button type='button' disabled={isPending} onClick={navigateBack} variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
						<IconArrowLeft className='size-4' />
						<span>Go Back</span>
					</Button>
					<div className='flex items-center gap-4'>
						<Button type='button' disabled={isPending} onClick={navigateBack} variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
							<span>Cancel</span>
						</Button>
						<Button type='submit' disabled={isPending} className='text-blue-500 hover:text-blue-700 focus-visible:ring-blue-700/50' variant={'ghost'}>
							<span>Save Note</span>
						</Button>
					</div>
				</div>

				<Divider />

				<FormField
					name='title'
					control={createNoteForm.control}
					render={({ field }) => (
						<Input
							variant={'unstyled'}
							type='text'
							disabled={isPending}
							className='text-2xl font-bold placeholder:text-neutral-950'
							placeholder='Enter a title…'
							autoComplete='off'
							{...field}
						/>
					)}
				/>

				<div className='grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 py-1 text-xs md:text-sm'>
					<div className='flex items-center gap-2 text-neutral-700'>
						<IconTag className='size-4' />
						<p>Tags</p>
					</div>

					<FormField
						name='tags'
						control={createNoteForm.control}
						render={({ field }) => (
							<Input
								variant={'unstyled'}
								type='text'
								disabled={isPending}
								className='placeholder:text-neutral-400'
								placeholder='Add tags separated by commas'
								autoComplete='off'
								{...field}
							/>
						)}
					/>

					<div className='flex items-center gap-2 text-neutral-700'>
						<IconCircleClock className='size-4' />
						<p>Last edited</p>
					</div>

					<p className='text-neutral-400'>Not yet saved</p>
				</div>

				<Divider />

				<FormField
					name='content'
					control={createNoteForm.control}
					render={({ field }) => (
						<textarea
							disabled={isPending}
							placeholder='Start typing your note here…'
							className='flex-grow resize-none text-xs transition-opacity duration-300 ease-in-out outline-none disabled:opacity-50 md:text-sm'
							{...field}
						/>
					)}
				/>
			</form>
		</Form>
	);
}
