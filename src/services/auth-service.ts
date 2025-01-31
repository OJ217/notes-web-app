import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router';

import { auth } from '@/lib/firebase';
import useAuthStore from '@/stores/auth-store';
import { ApiResponse, AuthResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import useVerificationStore from '@/stores/verification-store';
import { AuthFormValues } from '@/services/schema';

export const signInWithGoogle = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		console.log(result);
	} catch (error) {
		console.error(error);
	}
};

export const useLogInMutation = () => {
	const logInWithCredentials = async (loginData: AuthFormValues) => {
		return (
			await axios.post<ApiResponse<AuthResponse>>('/auth/log-in', loginData, {
				checkUnauthorizedResponse: false,
			})
		).data.data;
	};

	const navigate = useNavigate();

	const logInMutation = useMutation({
		mutationFn: logInWithCredentials,
		onSuccess: (auth) => {
			if (auth) {
				useAuthStore.getState().setAuth({
					token: auth.token,
					user: {
						...auth.user,
						provider: 'credentials',
					},
				});

				navigate('/notes');
			}
		},
	});

	return {
		logIn: logInMutation.mutateAsync,
		logInPending: logInMutation.isPending,
	};
};

export const useSignUpMutation = () => {
	const signUp = async (credentials: { email: string; password: string }) => {
		return (
			await axios.post<
				ApiResponse<{
					verificationToken: string;
					otpExpiration: string;
				}>
			>('/auth/sign-up', credentials, {
				checkUnauthorizedResponse: false,
			})
		).data.data;
	};

	const navigate = useNavigate();

	const signUpMutation = useMutation({
		mutationFn: signUp,
		onSuccess: (verification) => {
			if (verification) {
				useVerificationStore.getState().setVerification({
					token: verification.verificationToken,
					otpExpiration: verification.otpExpiration,
				});

				navigate('/verify-email');
			}
		},
	});

	return {
		signUp: signUpMutation.mutateAsync,
		signUpPending: signUpMutation.isPending,
	};
};

export const useVerifyEmailMutation = () => {
	const verifyEmail = async (verificationDetails: { verificationToken: string; otp: string }) => {
		return (await axios.post<ApiResponse<AuthResponse>>('/auth/verify-email', verificationDetails)).data.data;
	};

	const navigate = useNavigate();

	const verifyEmailMutation = useMutation({
		mutationFn: verifyEmail,
		onSuccess(response) {
			if (response) {
				useAuthStore.getState().setAuth({
					token: response.token,
					user: {
						...response.user,
						provider: 'credentials',
					},
				});

				useVerificationStore.getState().clearVerification();

				navigate('/notes', { replace: true });
			}
		},
	});

	return {
		verifyEmail: verifyEmailMutation.mutateAsync,
		verifyEmailPending: verifyEmailMutation.isPending,
	};
};
