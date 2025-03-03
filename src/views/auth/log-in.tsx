import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import AuthCard from '@/components/features/auth-card';
import { IconGoogle } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';
import { signInWithGoogle, useLogInMutation } from '@/services/auth-service';
import { authFormSchema, AuthFormValues } from '@/services/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LogInView() {
	const loginForm = useForm<AuthFormValues>({
		resolver: zodResolver(authFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onSubmit',
	});

	const { logIn, logInPending } = useLogInMutation();

	function handleLogInFormSubmit(credentials: AuthFormValues) {
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
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input autoComplete='off' placeholder='email@example.com' disabled={logInPending} {...field} />
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput autoComplete='off' disabled={logInPending} {...field} />
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
					<p className='text-foreground-100 text-center text-sm'>Or log in with:</p>
					<Button fullWidth variant={'outline'} onClick={signInWithGoogle} disabled={logInPending}>
						<IconGoogle className='size-6' />
						<span>Google</span>
					</Button>
				</div>

				<div className='pt-4'>
					<p className='text-center text-sm'>
						<span className='text-foreground-100'>No account yet?</span>{' '}
						<Button asChild variant={'link'}>
							<Link to={'/sign-up'}>Login</Link>
						</Button>
					</p>
				</div>
			</>
		</AuthCard>
	);
}
