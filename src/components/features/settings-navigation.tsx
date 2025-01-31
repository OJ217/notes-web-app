import { IconLogout } from '@/components/icons';
import LogoutDialog from '@/components/misc/logout-dialog';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { SETTINGS_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';

export default function SettingsNavigation() {
	return (
		<div className='space-y-2'>
			{SETTINGS_LINKS.map(({ label, icon: IconComponent, link }) => (
				<NavLink
					to={link}
					key={label}
					className={() =>
						cn(
							'flex items-center gap-2 rounded-lg p-2 font-medium text-neutral-700 transition-all duration-300 ease-in-out outline-none hover:bg-neutral-100 focus-visible:ring-[1.5px] focus-visible:ring-neutral-300',
						)
					}
				>
					<IconComponent className='size-5' />
					<p className='text-sm'>{label}</p>
				</NavLink>
			))}

			<Divider />

			<LogoutDialog>
				<Button type='button' className='rounded-lg p-2 text-neutral-700 ring-offset-0 transition-all hover:bg-neutral-100' variant={'ghost'} fullWidth>
					<IconLogout className='size-5' />
					<span className='flex-grow text-left text-sm'>Logout</span>
				</Button>
			</LogoutDialog>
		</div>
	);
}
