import { NavLink } from 'react-router';

import { BOTTOM_NAVIGATION_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function BottomNavigationBar() {
	return (
		<footer className='border-t border-t-neutral-200 bg-white px-4 py-3 shadow-[0_-4px_6px_#F0F0F0] md:px-8'>
			<nav className='grid grid-cols-5 gap-2 md:gap-4'>
				{BOTTOM_NAVIGATION_LINKS.map(({ label, icon: IconComponent, link }) => (
					<NavLink
						key={label}
						to={link}
						className={({ isActive }) =>
							cn('flex flex-col items-center gap-1 rounded-lg py-1 transition-all duration-300 ease-in-out outline-none focus-visible:ring md:py-2', {
								'bg-blue-50 text-blue-500 focus-visible:ring-blue-500': isActive,
								'text-neutral-600 focus-visible:ring-neutral-200': !isActive,
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
