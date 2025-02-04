import { NavLink } from 'react-router';

import { BOTTOM_NAVIGATION_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function BottomNavigationBar() {
	// shadow-[0_-4px_6px_#F0F0F0]
	return (
		<footer className='bg-background border-t-background-200 border-t px-4 py-3 md:px-8'>
			<nav className='grid grid-cols-5 gap-2 md:gap-4'>
				{BOTTOM_NAVIGATION_LINKS.map(({ label, icon: IconComponent, link }) => (
					<NavLink
						key={label}
						to={link}
						className={({ isActive }) =>
							cn('with-transition flex flex-col items-center gap-1 rounded-lg py-1 outline-none focus-visible:ring', {
								'dark:bg-background-200 bg-blue-50 text-blue-500 focus-visible:ring-blue-500': isActive,
								'hover:text-foreground-200 text-foreground-50 focus-visible:ring-background-200': !isActive,
							})
						}
					>
						<IconComponent className='size-6' />
						<p className='hidden text-xs md:block'>{label}</p>
					</NavLink>
				))}
			</nav>
		</footer>
	);
}
