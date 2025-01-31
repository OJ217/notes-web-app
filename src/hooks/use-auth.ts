import { useNavigate } from 'react-router';

import useAuthStore, { authStateSchema } from '@/stores/auth-store';
import { toast } from 'sonner';

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

export const useLogout = ({ redirectToLogin, notifyLogin }: { redirectToLogin?: boolean; notifyLogin?: boolean } = { redirectToLogin: true, notifyLogin: true }): { logout: () => void } => {
	const { authenticated: authenticaed } = useAuth();
	const clearAuth = useAuthStore((store) => store.clearAuth);
	const navigate = useNavigate();

	const logout = () => {
		if (authenticaed) {
			clearAuth();

			if (redirectToLogin) {
				navigate('/log-in');
			}

			if (notifyLogin) {
				toast.warning('Please login again');
			}
		}
	};

	return { logout };
};
