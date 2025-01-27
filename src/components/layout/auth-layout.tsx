import { Outlet } from 'react-router';

import PublicRoute from '@/components/hoc/public-route';

export default function AuthLayout() {
	return (
		<PublicRoute>
			<div className='flex min-h-screen items-center justify-center px-6 py-8'>
				<Outlet />
			</div>
		</PublicRoute>
	);
}
