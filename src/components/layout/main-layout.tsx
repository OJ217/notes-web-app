import { Outlet } from 'react-router';

import BottomNavigationBar from '@/components/features/bottom-navigation-bar';
import PrivateRoute from '@/components/hoc/private-route';

export default function MainLayout() {
	return (
		<PrivateRoute>
			<MainMobileLayout>
				<Outlet />
			</MainMobileLayout>
		</PrivateRoute>
	);
}

function MainMobileLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='grid h-screen grid-rows-[auto_1fr_auto]'>
			<header className='bg-neutral-100 px-4 py-3 md:px-8 md:py-4'>
				<img src='/logo.svg' width={95} height={28} />
			</header>
			<main className='overflow-y-scroll scroll-smooth rounded-t-2xl bg-white px-4 py-5 md:px-8 md:py-6'>{children}</main>
			<BottomNavigationBar />
		</div>
	);
}
