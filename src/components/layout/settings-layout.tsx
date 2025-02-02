import SettingsNavigation from '@/components/features/settings-navigation';
import { useResponsiveLayout } from '@/hooks';
import { Outlet } from 'react-router';

export default function SettingsLayout() {
	const { isLarge } = useResponsiveLayout();

	return isLarge ? (
		<div className='grid h-full grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr]'>
			<div className='grid grid-rows-[auto_1fr] gap-4 overflow-hidden border-r border-r-neutral-200 px-4 py-5'>
				<SettingsNavigation />
			</div>
			<div className='p-8'>
				<Outlet />
			</div>
		</div>
	) : (
		<Outlet />
	);
}
