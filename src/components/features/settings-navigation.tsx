import LinkCard from '@/components/features/link-card';
import { IconLogout } from '@/components/icons';
import LogoutDialog from '@/components/misc/logout-dialog';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { SETTINGS_LINKS } from '@/lib/constants';

export default function SettingsNavigation() {
	return (
		<div className='space-y-2'>
			{SETTINGS_LINKS.map((props) => (
				<LinkCard key={props.link.toString()} {...props} />
			))}

			<Divider />

			<LogoutDialog>
				<Button
					type='button'
					className='group with-transition flex items-center gap-2 rounded-xl px-2.5 py-2 text-neutral-700 outline-none hover:bg-neutral-50 hover:text-neutral-950 focus-visible:ring-[1.5px] focus-visible:ring-neutral-200 lg:px-3 lg:py-2.5'
					variant={'ghost'}
					fullWidth
				>
					<IconLogout className='size-5' />
					<span className='flex-grow text-left text-sm'>Logout</span>
				</Button>
			</LogoutDialog>
		</div>
	);
}
