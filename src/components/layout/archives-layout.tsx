import { Outlet } from 'react-router';

import { ArchivesList } from '@/components/features/notes-list';
import { NewNotePrimaryButton } from '@/components/misc/new-note-button';
import { useLayoutStore } from '@/stores/layout-store';

export default function ArchivesLayout() {
	const { isLarge } = useLayoutStore();

	return isLarge ? (
		<div className='grid h-full grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr]'>
			<div className='border-r-background-200 grid grid-rows-[auto_1fr] gap-4 overflow-hidden border-r px-4 py-5'>
				<NewNotePrimaryButton />
				<ArchivesList className='overflow-y-auto scroll-smooth' />
			</div>
			<Outlet />
		</div>
	) : (
		<Outlet />
	);
}
