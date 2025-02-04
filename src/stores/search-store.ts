import { create } from 'zustand';

type SearchStoreState = {
	search: string;
	searchInputValue: string;
};

type SearchStoreActions = {
	setSearch: (newSearchValue: string) => void;
	setSearchInputValue: (newSearchInputValue: string) => void;
};

type SearchStore = SearchStoreState & SearchStoreActions;

export function getDefaultSearchTerm() {
	const params = new URLSearchParams(window.location.search);
	return params.get('query') || '';
}

export const useSearchStore = create<SearchStore>((set) => {
	const params = new URLSearchParams(window.location.search);
	const defaultSearchTerm = params.get('query') || '';

	return {
		search: defaultSearchTerm,
		searchInputValue: defaultSearchTerm,
		setSearch(newSearchValue) {
			set((state) => ({ ...state, search: newSearchValue }));
		},
		setSearchInputValue(newSearchInputValue) {
			set((state) => ({ ...state, searchInputValue: newSearchInputValue }));
		},
	};
});
