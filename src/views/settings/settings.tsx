import SettingsNavigation from '@/components/features/settings-navigation';
import { useResponsiveLayout } from '@/hooks';

export default function SettingsView() {
	const { isLarge } = useResponsiveLayout();

	if (!isLarge) {
		return (
			!isLarge && (
				<div className='space-y-4'>
					<h1 className='text-2xl font-bold'>Settings</h1>
					<SettingsNavigation />
				</div>
			)
		);
	}
}
