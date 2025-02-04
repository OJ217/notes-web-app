import { NavLink, useLocation } from 'react-router';

import { cn, formatDate } from '@/lib/utils';
import { NoteListItem } from '@/types';

export default function NoteCard({ id, title, tags, status, createdAt, basePath, selected }: NoteListItem & { basePath?: string; selected?: boolean }) {
	const { search } = useLocation();
	const linkBasePath = basePath ?? `/${status === 'active' ? 'notes' : 'archives'}`;

	return (
		<NavLink
			to={`${linkBasePath}/${id}` + search}
			className={cn(
				'focus-visible: with-transition focus-visible:border-background-200 hover:bg-background-300 block space-y-3 rounded-xl border-[1.5px] border-transparent p-2 outline-none focus-visible:hover:border-transparent',
				{ 'bg-background-300': selected },
			)}
		>
			<h3 className='line-clamp-3 font-semibold break-words'>{title}</h3>
			{tags.length > 0 && (
				<div className='flex flex-wrap gap-1'>
					{tags.map((tag, index) => (
						<div key={index} className='bg-background-200 rounded px-1.5 py-0.5 text-xs'>
							<p>{tag}</p>
						</div>
					))}
				</div>
			)}
			<p className='text-foreground-200 text-xs'>{formatDate(createdAt)}</p>
		</NavLink>
	);
}
