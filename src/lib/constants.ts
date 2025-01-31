import { IconArchive, IconHome, IconLock, IconMonospace, IconMoon, IconSansSerif, IconSearch, IconSerif, IconSettings, IconSun, IconSystem, IconTag, IconType } from '@/components/icons';
import { ColorTheme, ColorThemeClass, FontTheme, FontThemeClass, LinkElement, ThemeOption } from '@/types';

export const BOTTOM_NAVIGATION_LINKS: LinkElement[] = [
	{ label: 'Home', icon: IconHome, link: '/notes' },
	{ label: 'Search', icon: IconSearch, link: '/search' },
	{ label: 'Archived', icon: IconArchive, link: '/archives' },
	{ label: 'Tags', icon: IconTag, link: '/tags' },
	{ label: 'Settings', icon: IconSettings, link: '/settings' },
];

export const SETTINGS_LINKS: LinkElement[] = [
	{ label: 'Color Theme', icon: IconSun, link: '/settings/color-theme' },
	{ label: 'Font Theme', icon: IconType, link: '/settings/font-theme' },
	{ label: 'Change Password', icon: IconLock, link: '/settings/change-password' },
];

export const COLOR_THEME_OPTIONS: ThemeOption<ColorTheme>[] = [
	{ label: 'Light Mode', description: 'Pick a clean and classic light theme', icon: IconSun, value: ColorTheme.Light },
	{ label: 'Dark Mode', description: 'Select a sleek and modern dark theme', icon: IconMoon, value: ColorTheme.Dark },
	{ label: 'System', description: 'Adapts to your device’s theme', icon: IconSystem, value: ColorTheme.Sytem },
];

export const FONT_THEME_OPTIONS: ThemeOption<FontTheme>[] = [
	{ label: 'Sans-serif ', description: 'Clean and modern, easy to read.', icon: IconSansSerif, value: FontTheme.SansSerif },
	{ label: 'Serif', description: 'Classic and elegant for a timeless feel.', icon: IconSerif, value: FontTheme.Serif },
	{ label: 'Monospace', description: 'Code-like, great for a technical vibe.', icon: IconMonospace, value: FontTheme.Monospace },
];

export const COLOR_THEME_CLASS: Record<Exclude<ColorTheme, ColorTheme.Sytem>, ColorThemeClass> = {
	light: 'light',
	dark: 'dark',
};

export const COLOR_THEME_CLASS_LIST: ColorThemeClass[] = Object.values(COLOR_THEME_CLASS);

export const FONT_THEME_CLASS: Record<FontTheme, FontThemeClass> = {
	'sans-serif': 'font-inter',
	serif: 'font-serif',
	monospace: 'font-mono',
};

export const FONT_THEME_CLASS_LIST: FontThemeClass[] = Object.values(FONT_THEME_CLASS);
