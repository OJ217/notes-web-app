import { create } from 'zustand';

import { ColorTheme, ColorThemeClass, FontTheme } from '@/types';
import { persist } from 'zustand/middleware';

type ThemeStoreState = {
	colorTheme: ColorTheme;
	fontTheme: FontTheme;
	colorThemeClass: ColorThemeClass | '';
};

type ThemeStoreActions = {
	setColorTheme: (colorTheme: ColorTheme) => void;
	setFontTheme: (fontTheme: FontTheme) => void;
	setColorThemeClass: (colorThemeClass: ColorThemeClass | '') => void;
};

type ThemeStore = { theme: ThemeStoreState } & ThemeStoreActions;

const useThemeStore = create<ThemeStore>()(
	persist(
		(set) => ({
			theme: {
				colorTheme: ColorTheme.Light,
				fontTheme: FontTheme.SansSerif,
				colorThemeClass: '',
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
			setColorThemeClass: (colorThemeClass) => {
				set((state) => ({
					theme: {
						...state.theme,
						colorThemeClass,
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
