import { NavLink } from 'react-router';

import { cn, formatDate } from '@/lib/utils';
import { NoteListItem } from '@/types';

export default function NoteCard({ id, title, tags, status, createdAt }: NoteListItem) {
	const linkBasePath = `/${status === 'active' ? 'notes' : 'archives'}`;

	return (
		<NavLink
			to={`${linkBasePath}/${id}`}
			className={cn(
				'focus-visible: block space-y-3 rounded-xl border-[1.5px] border-transparent p-2 transition-all duration-300 ease-in-out outline-none hover:bg-neutral-100 focus-visible:border-neutral-200 focus-visible:hover:border-transparent',
			)}
		>
			<h3 className='line-clamp-3 font-semibold break-words'>{title}</h3>
			{tags.length > 0 && (
				<div className='flex flex-wrap gap-1'>
					{tags.map((tag, index) => (
						<div key={index} className='rounded bg-neutral-200 px-1.5 py-0.5 text-xs'>
							<p>{tag}</p>
						</div>
					))}
				</div>
			)}
			<p className='text-xs text-neutral-700'>{formatDate(createdAt)}</p>
		</NavLink>
	);
}
