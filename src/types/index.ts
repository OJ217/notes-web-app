export enum ErrorCodes {}

export type BaseApiReponse = {
	success: boolean;
};

export type ApiResponse<T extends object> = BaseApiReponse & {
	data: T;
};

export type ResourceUpdatedResponse = ApiResponse<{ updated: true }>;
export type ResourceDeletedResponse = ApiResponse<{ deleted: true }>;

export type ApiErrorRespose = BaseApiReponse & {
	error: {
		message: string;
		description?: string;
		code: ErrorCodes;
	};
};

export type AuthResponse = {
	token: string;
	user: { id: string; email: string; createdAt: string };
};

type NoteStatus = 'active' | 'archived';

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

export type IconComponent = (props: React.ComponentProps<'svg'>) => React.ReactNode;
