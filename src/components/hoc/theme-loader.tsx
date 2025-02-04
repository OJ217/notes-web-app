import { useEffect } from 'react';

import { usePreferredColorScheme } from '@/hooks';
import { COLOR_THEME_CLASS, COLOR_THEME_CLASS_LIST, FONT_THEME_CLASS, FONT_THEME_CLASS_LIST } from '@/lib/constants';
import useThemeStore from '@/stores/theme-store';
import { ColorTheme, ColorThemeClass } from '@/types';

export default function ThemeLoader({ children }: { children: React.ReactNode }) {
	const preferredColorScheme = usePreferredColorScheme();
	const { colorTheme, fontTheme } = useThemeStore((state) => state.theme);
	const setColorThemeClass = useThemeStore((state) => state.setColorThemeClass);

	useEffect(() => {
		withoutTransition(() => {
			document.body.classList.remove(...COLOR_THEME_CLASS_LIST);

			let colorThemeClass: ColorThemeClass;

			if (colorTheme !== ColorTheme.Sytem) {
				colorThemeClass = COLOR_THEME_CLASS[colorTheme];
			} else {
				colorThemeClass = preferredColorScheme;
			}

			document.body.classList.add(colorThemeClass);
			setColorThemeClass(colorThemeClass);
		});
	}, [colorTheme, preferredColorScheme, setColorThemeClass]);

	useEffect(() => {
		document.body.classList.remove(...FONT_THEME_CLASS_LIST);
		document.body.classList.add(FONT_THEME_CLASS[fontTheme]);
	}, [fontTheme]);

	return children;
}

const withoutTransition = (action: () => void) => {
	const style = document.createElement('style');
	const css = document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);
	style.appendChild(css);

	const disable = () => document.head.appendChild(style);
	const enable = () => document.head.removeChild(style);

	if (typeof window.getComputedStyle !== 'undefined') {
		disable();
		action();
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		window.getComputedStyle(style).opacity;
		enable();
		return;
	}

	if (typeof window.requestAnimationFrame !== 'undefined') {
		disable();
		action();
		window.requestAnimationFrame(enable);
		return;
	}
};
