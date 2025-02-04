import { capitalize } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const authFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email' }),
	password: z.string().min(1, { message: 'Please enter your password' }),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;

export const verifyEmailFormSchema = z.object({
	verificationToken: z.string().min(1),
	otp: z.coerce.string().length(6, { message: 'Please enter valid otp' }),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailFormSchema>;

export const mutateNoteSchema = z.object({
	title: z.string().min(1, { message: 'Please enter note title' }).max(128, { message: 'Title is too long' }),
	content: z.string().min(1, { message: 'Please enter note content' }).max(10000, { message: 'Content is too long' }),
	tags: z
		.string()
		.transform((tagString) =>
			tagString
				.trim()
				.split(',')
				.map(capitalize)
				.filter((tag) => tag.length > 0),
		)
		.refine((tags) => tags.length <= 3, { message: 'Please enter up to 3 tags' })
		.refine((tags) => tags.every((tag) => tag.length < 40), { message: 'Tag is too long' })
		.optional(),
});

export type MutateNoteFormInput = z.input<typeof mutateNoteSchema>;
export type MutateNoteFormData = z.output<typeof mutateNoteSchema>;
export type UseNoteFormReturn = UseFormReturn<MutateNoteFormInput, unknown, MutateNoteFormData>;

export const changePasswordSchema = z
	.object({
		oldPassword: z.string().min(6, { message: 'Password is too short' }).max(64, { message: 'Password is too long' }).optional(),
		newPassword: z.string().min(6, { message: 'Password is too short' }).max(64, { message: 'Password is too long' }),
		confirmPassword: z.string().min(6, { message: 'Password is too short' }).max(64, { message: 'Password is too long' }),
	})
	.refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, { message: 'Password confirmation does not match', path: ['confirmPassword'] });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
