import { z } from 'zod';

export const mutateNoteSchema = z.object({
	title: z.string().min(1, { message: 'Please enter note title' }).max(128, { message: 'Title is too long' }),
	content: z.string().min(1, { message: 'Please enter note content' }).max(10000, { message: 'Content is too long' }),
	tags: z
		.string()
		.transform((tagString) => tagString.split(',').map((tag) => tag.trim()))
		.refine((tags) => tags.length <= 3, { message: 'Please enter up to 3 tags' })
		.refine((tags) => tags.every((tag) => tag.length < 40), { message: 'Tag is too long' })
		.optional(),
});

export type MutateNoteFormInput = z.input<typeof mutateNoteSchema>;
export type MutateNoteData = z.output<typeof mutateNoteSchema>;
