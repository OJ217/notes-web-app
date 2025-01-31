import { z } from 'zod';

export const mutateNoteSchema = z.object({
	title: z.string().min(1, { message: 'Please enter note title' }).max(128, { message: 'Title is too long' }),
	content: z.string().min(1, { message: 'Please enter note content' }).max(10000, { message: 'Content is too long' }),
	tags: z
		.string()
		.transform((tagString) =>
			tagString
				.trim()
				.split(',')
				.map((tag) => tag.trim()),
		)
		.refine((tags) => tags.length <= 3, { message: 'Please enter up to 3 tags' })
		.refine((tags) => tags.every((tag) => tag.length < 40), { message: 'Tag is too long' })
		.optional(),
});

export type MutateNoteFormInput = z.input<typeof mutateNoteSchema>;
export type MutateNoteData = z.output<typeof mutateNoteSchema>;

export const changePasswordSchema = z
	.object({
		oldPassword: z.string().min(6, { message: 'Password is too short' }).max(64, { message: 'Password is too long' }).optional(),
		newPassword: z.string().min(6, { message: 'Password is too short' }).max(64, { message: 'Password is too long' }),
		confirmPassword: z.string().min(6, { message: 'Password is too short' }).max(64, { message: 'Password is too long' }),
	})
	.refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, { message: 'Password confirmation does not match', path: ['confirmPassword'] });

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
