import { NavLink, To } from 'react-router';

import { cn } from '@/lib/utils';
import { IconComponent } from '@/types';

export default function LinkCard({ link, label, icon: IconComponent, className }: { link: To; label: string; icon: IconComponent; className?: string }) {
	return (
		<NavLink
			to={link}
			key={label}
			className={() =>
				cn(
					'flex items-center gap-2 rounded-lg p-2 font-medium text-neutral-700 transition-all duration-300 ease-in-out outline-none hover:bg-neutral-100 focus-visible:ring-[1.5px] focus-visible:ring-neutral-300',
					className,
				)
			}
		>
			<IconComponent className='size-5' />
			<p className='text-sm'>{label}</p>
		</NavLink>
	);
}
