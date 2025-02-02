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

export const useSearchStore = create<SearchStore>((set) => {
	return {
		search: '',
		searchInputValue: '',
		setSearch(newSearchValue) {
			set({ search: newSearchValue });
		},
		setSearchInputValue(newSearchInputValue) {
			set({ searchInputValue: newSearchInputValue });
		},
	};
});
