import { To } from 'react-router';

export enum ErrorCodes {}

export type BaseApiReponse = {
	success: boolean;
};

export type ApiResponse<T extends object> = BaseApiReponse & {
	data: T;
};

export type ApiErrorRespose = BaseApiReponse & {
	error: {
		message: string;
		description?: string;
		code: ErrorCodes;
	};
};

export type ResourceUpdatedResponse = ApiResponse<{ updated: true }>;
export type ResourceDeletedResponse = ApiResponse<{ deleted: true }>;
export type PaginatedResponse<T extends object> = {
	docs: T[];
	meta: {
		cursor: string | null;
	};
};

export type AuthResponse = {
	token: string;
	user: { id: string; email: string; createdAt: string };
};

export type NoteStatus = 'active' | 'archived';

export type Note = {
	id: string;
	title: string;
	content: string;
	tags: string[];
	authorId: string;
	status: NoteStatus;
	createdAt: string;
	updatedAt: string;
};

export type NoteListItem = Omit<Note, 'updatedAt' | 'content' | 'authorId'>;

export enum ColorTheme {
	Dark = 'dark',
	Light = 'light',
	Sytem = 'system',
}

export enum FontTheme {
	Serif = 'serif',
	SansSerif = 'sans-serif',
	Monospace = 'monospace',
}

export type ColorThemeClass = 'light' | 'dark';
export type FontThemeClass = 'font-inter' | 'font-serif' | 'font-mono';

export type Theme = ColorTheme | FontTheme;
export type ThemeOption<T extends Theme> = {
	label: string;
	description: string;
	icon: IconComponent;
	value: T;
};

export type LinkElement = {
	label: string;
	icon: IconComponent;
	link: To;
};

export type IconComponent = (props: React.ComponentProps<'svg'>) => React.ReactNode;
