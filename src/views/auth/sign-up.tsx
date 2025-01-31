import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { IconGoogle, IconInfoCircle } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';
import { signInWithGoogle, useSignUpMutation } from '@/services/auth-service';
import { authFormSchema, AuthFormValues } from '@/services/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignUpView() {
	const signUpForm = useForm<AuthFormValues>({
		resolver: zodResolver(authFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { signUp, signUpPending } = useSignUpMutation();

	function handleSignUpSubmit(credentials: AuthFormValues) {
		void signUp(credentials);
	}

	return (
		<div className='w-full max-w-lg space-y-4 rounded-2xl border border-neutral-200 bg-white px-6 py-10 shadow-sm md:px-8 md:py-12'>
			<img src='/logo.svg' alt='logo' width={95} height={28} className='mx-auto' />

			<div className='space-y-2 text-center'>
				<h1 className='text-2xl font-bold'>Create Your Account</h1>
				<h3 className='text-sm text-neutral-600'>Sign up to start organizing your notes and boost your productivity.</h3>
			</div>

			<Form {...signUpForm}>
				<form onSubmit={signUpForm.handleSubmit(handleSignUpSubmit)} className='space-y-4 pt-6'>
					<FormField
						name='email'
						control={signUpForm.control}
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<FormLabel htmlFor='email'>Email Address</FormLabel>
								<FormControl>
									<Input id='email' autoComplete='username' placeholder='email@example.com' disabled={signUpPending} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={signUpForm.control}
						name='password'
						render={({ field, fieldState }) => (
							<FormItem className='space-y-2'>
								<FormLabel htmlFor='password'>Password</FormLabel>
								<FormControl>
									<PasswordInput id='password' autoComplete='current-password' disabled={signUpPending} {...field} />
								</FormControl>
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

					<Button type='submit' loading={signUpPending} className='w-full'>
						Sign up
					</Button>
				</form>
			</Form>

			<Divider />

			<div className='space-y-4 pt-4'>
				<p className='text-center text-sm text-neutral-600'>Or log in with:</p>
				<Button type='button' fullWidth variant={'outline'} onClick={signInWithGoogle}>
					<IconGoogle className='size-6' />
					<span>Google</span>
				</Button>
			</div>

			<div className='pt-4'>
				<p className='text-center text-sm'>
					<span className='text-neutral-600'>Already have an account?</span>{' '}
					<Link to={'/log-in'} className='hover:underline'>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
