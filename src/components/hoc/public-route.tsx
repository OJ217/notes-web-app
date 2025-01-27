import { Navigate } from 'react-router';

import { useAuth } from '@/hooks';

export default function PublicRoute({ children }: { children: React.ReactNode }) {
	const { authenticated: authenticaed } = useAuth();

	if (authenticaed) {
		return <Navigate to={'/notes'} />;
	}

	return children;
}
