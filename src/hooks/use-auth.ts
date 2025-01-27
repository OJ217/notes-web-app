import { useNavigate } from 'react-router';

import useAuthStore, { authStateSchema } from '@/stores/auth-store';

export const useAuth = (): { authenticated: boolean } => {
	const auth = useAuthStore((store) => store.auth);
	const clearAuth = useAuthStore((store) => store.clearAuth);

	const authParsed = authStateSchema.safeParse(auth);

	if (!authParsed.success) {
		clearAuth();
		return { authenticated: false };
	}

	return { authenticated: true };
};

export const useLogout = ({ redirectToLogin }: { redirectToLogin: boolean } = { redirectToLogin: false }) => {
	const { authenticated: authenticaed } = useAuth();
	const clearAuth = useAuthStore((store) => store.clearAuth);
	const navigate = useNavigate();

	if (authenticaed) {
		clearAuth();
		if (redirectToLogin) {
			navigate('/log-in');
		}
	}
};
