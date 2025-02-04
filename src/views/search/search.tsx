import { SearchedNotesList } from '@/components/features/notes-list';
import SearchInput from '@/components/features/search-input';
import { isNilString } from '@/lib/utils';
import { useLayoutStore } from '@/stores/layout-store';
import { useSearchStore } from '@/stores/search-store';

export default function SearchView() {
	const { isLarge } = useLayoutStore();
	const { search } = useSearchStore();

	if (!isLarge) {
		return (
			<div className='space-y-4'>
				<h1 className='text-2xl font-bold'>Search</h1>

				<SearchInput />

				<p className='text-foreground-200 text-sm'>{!isNilString(search) ? `All notes matching ”${search}” are displayed below.` : 'Please enter your search keyword'}</p>

				<SearchedNotesList search={search} />
			</div>
		);
	}
}
