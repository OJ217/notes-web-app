import SettingsNavigation from '@/components/features/settings-navigation';
import { useLayoutStore } from '@/stores/layout-store';

export default function SettingsView() {
	const { isLarge } = useLayoutStore();

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
