import SettingsNavigation from '@/components/features/settings-navigation';

export default function SettingsView() {
	return (
		<div className='space-y-4'>
			<h1 className='text-2xl font-bold'>Settings</h1>
			<SettingsNavigation />
		</div>
	);
}
