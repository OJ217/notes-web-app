import { Outlet } from 'react-router';

import PrivateRoute from '@/components/hoc/private-route';

export default function MainLayout() {
	return (
		<PrivateRoute>
			<div className='flex min-h-screen items-center justify-center'>
				<Outlet />
			</div>
		</PrivateRoute>
	);
}
