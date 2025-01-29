import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { IconArrowLeft, IconCircleClock, IconTag } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNavigateBack, useNotifyErrors } from '@/hooks';
import { useCreateNoteMutation } from '@/services/note-service';
import { zodResolver } from '@hookform/resolvers/zod';

const createNoteFormSchema = z.object({
	title: z.string().min(1, { message: 'Please enter note title' }).max(128, { message: 'Title is too long' }),
	content: z.string().min(1, { message: 'Please enter note content' }).max(10000, { message: 'Content is too long' }),
	tags: z
		.string()
		.transform((tagString) => tagString.split(',').map((tag) => tag.trim()))
		.refine((tags) => tags.length <= 3, { message: 'Please enter up to 3 tags' })
		.refine((tags) => tags.every((tag) => tag.length < 40), { message: 'Tag is too long' })
		.optional(),
});

type CreateNotFormInputValues = z.input<typeof createNoteFormSchema>;
type CreateNotFormOutputValues = z.output<typeof createNoteFormSchema>;

export default function CreateNoteView() {
	// Utility hooks
	const navigateBack = useNavigateBack();

	// Form hooks
	const createNoteForm = useForm<CreateNotFormInputValues, unknown, CreateNotFormOutputValues>({
		defaultValues: {
			title: '',
			content: '',
			tags: '',
		},
		resolver: zodResolver(createNoteFormSchema),
	});

	useNotifyErrors({ control: createNoteForm.control });

	// Service handler
	const { mutateAsync: createNote, isPending } = useCreateNoteMutation();

	const handleCreateNoteFormSubmit = async (noteData: CreateNotFormOutputValues) => {
		toast.promise(async () => await createNote(noteData), {
			loading: 'Saving note',
			success: () => {
				return `Note has been saved`;
			},
		});
	};

	return (
		<Form {...createNoteForm}>
			<form className='flex h-full flex-col gap-3' onSubmit={createNoteForm.handleSubmit(handleCreateNoteFormSubmit)}>
				<div className='flex items-center justify-between gap-4'>
					<Button type='button' disabled={isPending} onClick={navigateBack} variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
						<IconArrowLeft className='size-4' />
						<span className='text-sm'>Go Back</span>
					</Button>
					<div className='flex items-center gap-4'>
						<Button type='button' disabled={isPending} onClick={navigateBack} variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
							<span className='text-sm'>Cancel</span>
						</Button>
						<Button type='submit' disabled={isPending} className='text-blue-500 hover:text-blue-700 focus-visible:ring-blue-700/50' variant={'ghost'}>
							<span className='text-sm'>Save Note</span>
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

				<div className='grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 py-1 text-sm'>
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
							className='flex-grow resize-none text-sm transition-opacity duration-300 ease-in-out outline-none disabled:opacity-50'
							{...field}
						/>
					)}
				/>
			</form>
		</Form>
	);
}
