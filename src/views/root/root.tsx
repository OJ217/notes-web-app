import { useAuth } from '@/hooks';
import { Navigate } from 'react-router';

export default function RootView() {
	const { authenticated: authenticaed } = useAuth();

	if (!authenticaed) {
		return <Navigate to={'/log-in'} />;
	}

	return <Navigate to={'/notes'} />;
}
