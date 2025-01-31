import { useEffect } from 'react';

import { COLOR_THEME_CLASS, COLOR_THEME_CLASS_LIST, FONT_THEME_CLASS, FONT_THEME_CLASS_LIST } from '@/lib/constants';
import useThemeStore from '@/stores/theme-store';
import { ColorTheme } from '@/types';
import { usePreferredColorScheme } from '@/hooks';

export default function ThemeLoader({ children }: { children: React.ReactNode }) {
	const preferredColorScheme = usePreferredColorScheme();
	const { colorTheme, fontTheme } = useThemeStore((state) => state.theme);

	useEffect(() => {
		document.body.classList.remove(...COLOR_THEME_CLASS_LIST);

		if (colorTheme !== ColorTheme.Sytem) {
			document.body.classList.add(COLOR_THEME_CLASS[colorTheme]);
		} else {
			document.body.classList.add(preferredColorScheme);
		}
	}, [colorTheme, preferredColorScheme]);

	useEffect(() => {
		document.body.classList.remove(...FONT_THEME_CLASS_LIST);
		document.body.classList.add(FONT_THEME_CLASS[fontTheme]);
	}, [fontTheme]);

	return children;
}
