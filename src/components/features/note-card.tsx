import { NavLink } from 'react-router';

import { cn } from '@/lib/utils';
import { Note } from '@/types';

export default function NoteCard({ id, title, tags, createdAt }: Note) {
	return (
		<NavLink
			to={`/notes/${id}`}
			className={cn('block space-y-3 rounded-xl p-2 transition-all duration-300 ease-in-out outline-none hover:bg-neutral-100 focus-visible:ring focus-visible:ring-neutral-200')}
		>
			<h3 className='line-clamp-3 font-semibold break-words'>{title}</h3>
			<div className='flex flex-wrap gap-1'>
				{tags.map((tag, index) => (
					<div key={index} className='rounded bg-neutral-200 px-1.5 py-0.5 text-xs'>
						<p>{tag}</p>
					</div>
				))}
			</div>
			<p className='text-xs text-neutral-700'>{createdAt}</p>
		</NavLink>
	);
}
