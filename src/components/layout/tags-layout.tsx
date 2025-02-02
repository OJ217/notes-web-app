import { Outlet, useParams } from 'react-router';

import { TaggedNotesList } from '@/components/features/notes-list';
import { NewNotePrimaryButton } from '@/components/misc/new-note-button';
import { useLayoutStore } from '@/stores/layout-store';

export default function TagsLayout() {
	const { tag } = useParams();
	const { isLarge } = useLayoutStore();

	return isLarge ? (
		<div className='grid h-full grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr]'>
			<div className='grid grid-rows-[auto_1fr] gap-4 overflow-hidden border-r border-r-neutral-200 px-4 py-5'>
				<NewNotePrimaryButton />
				<TaggedNotesList tag={tag} className='overflow-y-auto scroll-smooth' />
			</div>
			<Outlet />
		</div>
	) : (
		<Outlet />
	);
}
