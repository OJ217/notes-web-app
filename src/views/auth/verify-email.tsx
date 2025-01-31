import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router';

import AuthCard from '@/components/features/auth-card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { useVerifyEmailMutation } from '@/services/auth-service';
import { verifyEmailFormSchema, VerifyEmailFormValues } from '@/services/schema';
import useVerificationStore from '@/stores/verification-store';
import { zodResolver } from '@hookform/resolvers/zod';

export default function VerifyEmailView() {
	const verifyEmailForm = useForm<VerifyEmailFormValues>({
		defaultValues: {
			verificationToken: useVerificationStore.getState().verification.token,
			otp: '',
		},
		resolver: zodResolver(verifyEmailFormSchema),
	});

	const { verifyEmail, verifyEmailPending } = useVerifyEmailMutation();

	function handleVerifyEmailSubmit(verificationDetails: VerifyEmailFormValues) {
		void verifyEmail(verificationDetails);
	}

	// ** Verify verification token and otp expiration has been set
	const isVerificationValid = useVerificationStore.getState().validateVerification();

	if (!isVerificationValid) {
		return <Navigate to={'/sign-up'} />;
	}

	return (
		<AuthCard title='Verify Your Email' description='Verify your email using the verification code sent to your email'>
			<Form {...verifyEmailForm}>
				<form onSubmit={verifyEmailForm.handleSubmit(handleVerifyEmailSubmit)} className='space-y-6 pt-6'>
					<FormField
						name='otp'
						control={verifyEmailForm.control}
						render={({ field }) => (
							<FormItem className='mx-auto space-y-3'>
								<FormControl>
									<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field} disabled={verifyEmailPending}>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTP>
								</FormControl>
								<FormMessage className='text-center' />
							</FormItem>
						)}
					/>

					<Button type='submit' loading={verifyEmailPending} className='w-full'>
						Verify email
					</Button>
				</form>
			</Form>
		</AuthCard>
	);
}
