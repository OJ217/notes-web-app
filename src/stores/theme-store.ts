import { create } from 'zustand';

import { ColorTheme, FontTheme } from '@/types';
import { persist } from 'zustand/middleware';

type ThemeStoreState = {
	colorTheme: ColorTheme;
	fontTheme: FontTheme;
};

type ThemeStoreActions = {
	setColorTheme: (colorTheme: ColorTheme) => void;
	setFontTheme: (fontTheme: FontTheme) => void;
};

type ThemeStore = { theme: ThemeStoreState } & ThemeStoreActions;

const useThemeStore = create<ThemeStore>()(
	persist(
		(set) => ({
			theme: {
				colorTheme: ColorTheme.Light,
				fontTheme: FontTheme.SansSerif,
			},
			setColorTheme: (colorTheme) => {
				set((state) => ({
					theme: {
						...state.theme,
						colorTheme,
					},
				}));
			},
			setFontTheme: (fontTheme) => {
				set((state) => ({
					theme: {
						...state.theme,
						fontTheme,
					},
				}));
			},
		}),
		{
			name: 'notes_app.theme_store',
			partialize: (state) => ({ theme: state.theme }),
		},
	),
);

export default useThemeStore;
