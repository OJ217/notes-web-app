import { useForm } from 'react-hook-form';

import { IconInfoCircle } from '@/components/icons';
import BackButton from '@/components/misc/back-button';
import { Button } from '@/components/ui/button';
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/input';
import { ChangePasswordFormValues, changePasswordSchema } from '@/services/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePasswordMutation } from '@/services/user-service';

export default function ChangePasswordView() {
	const changePasswordForm = useForm<ChangePasswordFormValues>({
		defaultValues: {
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		resolver: zodResolver(changePasswordSchema),
	});

	const { changePassword, changePasswordPending } = useChangePasswordMutation();

	const handleChangePasswordFormSubmit = (changePasswordData: ChangePasswordFormValues) => {
		void changePassword(changePasswordData);
	};

	return (
		<Form {...changePasswordForm}>
			<form className='space-y-6' onSubmit={changePasswordForm.handleSubmit(handleChangePasswordFormSubmit)}>
				<div>
					<BackButton label='Settings' to={'/settings'} className='mv-3 lg:hidden' />
					<h1 className='text-2xl font-bold'>Change Password</h1>
				</div>
				<div className='space-y-4'>
					<FormField
						disabled={changePasswordPending}
						control={changePasswordForm.control}
						name='oldPassword'
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<FormLabel>Old Password</FormLabel>
								<PasswordInput {...field} />
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						disabled={changePasswordPending}
						control={changePasswordForm.control}
						name='newPassword'
						render={({ field, fieldState }) => (
							<FormItem className='space-y-2'>
								<FormLabel>New Password</FormLabel>
								<PasswordInput {...field} />
								{fieldState.error ? (
									<FormMessage />
								) : (
									<FormDescription className='flex items-center gap-2 text-neutral-600'>
										<IconInfoCircle className='size-4' />
										<p className='text-xs'>At least 8 characters</p>
									</FormDescription>
								)}
							</FormItem>
						)}
					/>

					<FormField
						disabled={changePasswordPending}
						control={changePasswordForm.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<FormLabel htmlFor='confirm-new-password'>Confirm New Password</FormLabel>
								<PasswordInput {...field} />
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex justify-end'>
					<Button type='submit' loading={changePasswordPending}>
						Save Password
					</Button>
				</div>
			</form>
		</Form>
	);
}
