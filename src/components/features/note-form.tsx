import { useEffect } from 'react';
import { toast } from 'sonner';

import { IconCircleClock, IconTag } from '@/components/icons';
import Divider from '@/components/ui/divider';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';
import { useNoteQuery } from '@/services/note-service';
import { MutateNoteFormData, UseNoteFormReturn } from '@/services/schema';

export function EditNoteForm({
	noteId,
	form,
	onSubmit,
	disabled,
	header,
	footer,
}: {
	noteId: string;
	form: UseNoteFormReturn;
	disabled: boolean;
	onSubmit: (formValues: MutateNoteFormData) => void;
	header?: React.ReactNode;
	footer?: React.ReactNode;
}) {
	const { data: note, isPending: noteQueryPending, isError, isSuccess } = useNoteQuery({ noteId });

	useEffect(() => {
		if (isSuccess) {
			form.reset({
				title: note.title,
				content: note.content,
				tags: note.tags.join(', '),
			});
		}
	}, [note, form, isSuccess]);

	if (noteQueryPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error has occured</div>;
	}

	return (
		<Form {...form}>
			<form className='flex h-full flex-col gap-3' onSubmit={form.handleSubmit(onSubmit)}>
				{header && (
					<>
						{header}
						<Divider />
					</>
				)}

				<FormField
					name='title'
					control={form.control}
					disabled={disabled}
					render={({ field }) => (
						<Input type='text' variant={'unstyled'} className='placeholder:text-foreground text-2xl font-bold' placeholder='Enter a title…' autoComplete='off' {...field} />
					)}
				/>

				<div className='text-foreground-200 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 py-1 text-xs md:text-sm'>
					<div className='flex items-center gap-2'>
						<IconTag className='size-4 shrink-0' />
						<p>Tags</p>
					</div>

					<FormField
						name='tags'
						control={form.control}
						disabled={disabled}
						render={({ field }) => (
							<Input variant={'unstyled'} type='text' className='placeholder:text-background-50' placeholder='Add tags separated by commas' autoComplete='off' {...field} />
						)}
					/>

					<div className='flex items-center gap-2'>
						<IconCircleClock className='size-4 shrink-0' />
						<p>Last edited</p>
					</div>

					<p>{formatDate(note.createdAt)}</p>
				</div>

				<Divider />

				<FormField
					name='content'
					control={form.control}
					disabled={disabled}
					render={({ field }) => (
						<textarea
							placeholder='Start typing your note here…'
							className='flex-grow resize-none text-xs transition-opacity duration-300 ease-in-out outline-none disabled:opacity-50 md:text-sm'
							{...field}
						/>
					)}
				/>

				{footer && (
					<>
						<Divider />
						{footer}
					</>
				)}
			</form>
		</Form>
	);
}

export function CreateNoteForm({
	form,
	onSubmit,
	disabled,
	header,
	footer,
}: {
	form: UseNoteFormReturn;
	disabled: boolean;
	onSubmit: (formValues: MutateNoteFormData) => void;
	header?: React.ReactNode;
	footer?: React.ReactNode;
}) {
	return (
		<Form {...form}>
			<form className='flex h-full flex-col gap-3' onSubmit={form.handleSubmit(onSubmit)}>
				{header && (
					<>
						{header}
						<Divider />
					</>
				)}

				<FormField
					name='title'
					control={form.control}
					disabled={disabled}
					render={({ field }) => (
						<Input type='text' variant={'unstyled'} className='placeholder:text-foreground text-2xl font-bold' placeholder='Enter a title…' autoComplete='off' {...field} />
					)}
				/>

				<div className='text-foreground-200 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 py-1 text-xs md:text-sm'>
					<div className='flex items-center gap-2'>
						<IconTag className='size-4 shrink-0' />
						<p>Tags</p>
					</div>

					<FormField
						name='tags'
						control={form.control}
						disabled={disabled}
						render={({ field }) => (
							<Input variant={'unstyled'} type='text' className='placeholder:text-background-50' placeholder='Add tags separated by commas' autoComplete='off' {...field} />
						)}
					/>

					<div className='flex items-center gap-2'>
						<IconCircleClock className='size-4 shrink-0' />
						<p>Last edited</p>
					</div>

					<p className='text-background-50'>Not saved yet</p>
				</div>

				<Divider />

				<FormField
					name='content'
					control={form.control}
					disabled={disabled}
					render={({ field }) => (
						<textarea
							placeholder='Start typing your note here…'
							className='flex-grow resize-none text-xs transition-opacity duration-300 ease-in-out outline-none disabled:opacity-50 md:text-sm'
							{...field}
						/>
					)}
				/>

				{footer && (
					<>
						<Divider />
						{footer}
					</>
				)}
			</form>
		</Form>
	);
}

export function ArchivedNoteForm({ noteId, header, footer }: { noteId: string; header?: React.ReactNode; footer?: React.ReactNode }) {
	const { data: archivedNote, isPending, isSuccess } = useNoteQuery({ noteId: noteId! });

	const handleFormFieldClick = () => {
		toast.dismiss();
		toast.warning('Please restore the note first');
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleFormFieldClick();
	};

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (!isSuccess) {
		return <div>Note not found</div>;
	}

	return (
		<form className='flex h-full flex-col gap-3' onSubmit={handleSubmit}>
			{header && (
				<>
					{header}
					<Divider />
				</>
			)}

			<Input
				readOnly
				type='text'
				variant={'unstyled'}
				value={archivedNote.title}
				onClick={handleFormFieldClick}
				className='placeholder:text-foreground text-2xl font-bold select-none'
				placeholder='Enter a title…'
				autoComplete='off'
			/>

			<div className='text-foreground-200 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 py-1 text-xs md:text-sm'>
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
					className='placeholder:text-background-50 select-none'
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

			{footer && (
				<>
					<Divider />
					{footer}
				</>
			)}
		</form>
	);
}
