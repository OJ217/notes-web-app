import { Link, Outlet } from 'react-router';

import { NotesList } from '@/components/features/notes-list';
import { IconPlus } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useResponsiveLayout } from '@/hooks';

export default function NotesLayout() {
	const { isLarge } = useResponsiveLayout();

	return isLarge ? (
		<div className='grid h-full grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr]'>
			<div className='grid grid-rows-[auto_1fr] gap-4 overflow-hidden border-r border-r-neutral-200 px-4 py-5'>
				<Button fullWidth className='gap-1' asChild>
					<Link to={'/notes/new'}>
						<IconPlus className='size-4' />
						<span className='text-sm'>Create New Note</span>
					</Link>
				</Button>
				<NotesList className='overflow-y-auto scroll-smooth' />
			</div>
			<Outlet />
		</div>
	) : (
		<Outlet />
	);
}
