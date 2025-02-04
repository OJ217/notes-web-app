import { NavLink, To } from 'react-router';

import { cn } from '@/lib/utils';
import { IconComponent } from '@/types';
import { IconChevronRight } from '@/components/icons';

export default function LinkCard({ link, label, icon: IconComponent, className }: { link: To; label: string; icon: IconComponent; className?: string }) {
	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				cn(
					'group with-transition flex items-center gap-2 rounded-xl px-2.5 py-2 outline-none lg:px-3 lg:py-2.5',
					{
						'text-foreground focus-visible:bg-background-200 bg-background-300': isActive,
						'hover:text-foreground text-foreground-200 focus-visible:ring-background-200 hover:bg-background-400 focus-visible:ring-[1.5px]': !isActive,
					},
					className,
				)
			}
		>
			<IconComponent className='with-transition size-5 shrink-0 font-bold group-hover:text-blue-500 group-aria-[current=page]:text-blue-500' />
			<span className='flex-grow text-sm font-medium'>{label}</span>
			<IconChevronRight className='with-transition size-5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-aria-[current=page]:translate-x-0 group-aria-[current=page]:opacity-100' />
		</NavLink>
	);
}
