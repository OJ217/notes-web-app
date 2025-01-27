import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

import AuthCard from '@/components/features/auth-card';
import { IconGoogle } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';
import { signInWithGoogle, useLogInMutation } from '@/services/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';

const loginFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email' }),
	password: z.string().min(1, { message: 'Please enter your password' }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LogInView() {
	const loginForm = useForm<LoginFormValues>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onSubmit',
	});

	const { logIn, logInPending } = useLogInMutation();

	function handleLogInFormSubmit(credentials: LoginFormValues) {
		void logIn(credentials);
	}

	return (
		<AuthCard title='Welcome to Note' description='Please log in to continue'>
			<>
				<Form {...loginForm}>
					<form onSubmit={loginForm.handleSubmit(handleLogInFormSubmit)} className='space-y-4 pt-6'>
						<FormField
							name='email'
							control={loginForm.control}
							render={({ field }) => (
								<FormItem className='space-y-2'>
									<FormLabel htmlFor='email'>Email Address</FormLabel>
									<FormControl>
										<Input id='email' autoComplete='username' placeholder='email@example.com' disabled={logInPending} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='password'
							control={loginForm.control}
							render={({ field }) => (
								<FormItem className='space-y-2'>
									<FormLabel htmlFor='password'>Password</FormLabel>
									<FormControl>
										<PasswordInput id='password' autoComplete='current-password' disabled={logInPending} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button fullWidth type='submit' loading={logInPending}>
							Login
						</Button>
					</form>
				</Form>

				<Divider />

				<div className='space-y-4 pt-4'>
					<p className='text-center text-sm text-neutral-600'>Or log in with:</p>
					<Button fullWidth variant={'outline'} onClick={signInWithGoogle} disabled={logInPending}>
						<IconGoogle className='size-6' />
						<span>Google</span>
					</Button>
				</div>

				<div className='pt-4'>
					<p className='text-center text-sm'>
						<span className='text-neutral-600'>No account yet?</span>{' '}
						<Link to={'/sign-up'} className='hover:underline'>
							Sign Up
						</Link>
					</p>
				</div>
			</>
		</AuthCard>
	);
}
