import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import AuthCard from '@/components/features/auth-card';
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
		<AuthCard title='Create Your Account' description='Sign up to start organizing your notes and boost your productivity.'>
			<>
				<Form {...signUpForm}>
					<form onSubmit={signUpForm.handleSubmit(handleSignUpSubmit)} className='space-y-4 pt-6'>
						<FormField
							name='email'
							control={signUpForm.control}
							render={({ field }) => (
								<FormItem className='space-y-2'>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input autoComplete='off' placeholder='email@example.com' disabled={signUpPending} {...field} />
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput autoComplete='off' disabled={signUpPending} {...field} />
									</FormControl>
									{fieldState.error ? (
										<FormMessage />
									) : (
										<FormDescription className='text-foreground-100 flex items-center gap-2'>
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
					<p className='text-foreground-100 text-center text-sm'>Or log in with:</p>
					<Button type='button' fullWidth variant={'outline'} onClick={signInWithGoogle}>
						<IconGoogle className='size-6' />
						<span>Google</span>
					</Button>
				</div>

				<div className='pt-4'>
					<p className='text-center text-sm'>
						<span className='text-foreground-100'>Already have an account?</span>{' '}
						<Button asChild variant={'link'}>
							<Link to={'/log-in'}>Login</Link>
						</Button>
					</p>
				</div>
			</>
		</AuthCard>
	);
}
