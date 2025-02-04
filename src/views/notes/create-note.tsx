import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { CreateNoteForm } from '@/components/features/note-form';
import BackButton from '@/components/misc/back-button';
import { Button } from '@/components/ui/button';
import { useNavigateBack, useNotifyErrors } from '@/hooks';
import { useCreateNoteMutation } from '@/services/note-service';
import { MutateNoteFormData, MutateNoteFormInput, mutateNoteSchema } from '@/services/schema';
import { useLayoutStore } from '@/stores/layout-store';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreateNoteView() {
	// Utility hooks
	const navigateBack = useNavigateBack();
	const { isLarge } = useLayoutStore();

	// Form hooks
	const createNoteForm = useForm<MutateNoteFormInput, unknown, MutateNoteFormData>({
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

	const handleCreateNoteFormSubmit = async (noteData: MutateNoteFormData) => {
		toast.promise(async () => await createNote(noteData), {
			loading: 'Saving note',
			success: 'Note has been saved',
		});
	};

	return (
		<div className='xl:border-r-background-200 h-full lg:px-6 lg:py-5 xl:w-[calc(100%-240px)] xl:border-r'>
			<CreateNoteForm
				form={createNoteForm}
				onSubmit={handleCreateNoteFormSubmit}
				disabled={isPending}
				header={
					!isLarge && (
						<div className='flex h-5 items-center justify-between gap-4 text-xs md:text-sm'>
							<BackButton type='button' disabled={isPending} />

							<div className='flex items-center gap-4'>
								<Button type='button' disabled={isPending} onClick={navigateBack} variant={'ghost'} className='hover:text-foreground text-foreground-100'>
									<span>Cancel</span>
								</Button>
								<Button type='submit' disabled={isPending} className='text-blue-500 hover:text-blue-700 focus-visible:ring-blue-700/50' variant={'ghost'}>
									<span>Save Note</span>
								</Button>
							</div>
						</div>
					)
				}
				footer={
					isLarge && (
						<div className='flex items-center gap-4'>
							<Button type='submit' disabled={!createNoteForm.formState.isDirty || isPending} size={'lg'}>
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
	);
}
