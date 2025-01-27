import { Navigate } from 'react-router';

import { useAuth } from '@/hooks';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
	const { authenticated: authenticaed } = useAuth();

	if (!authenticaed) {
		return <Navigate to={'/log-in'} />;
	}

	return children;
}
