export enum ErrorCodes {}

export interface BaseApiReponse {
	success: boolean;
}

export interface ApiResponse<T extends object> extends BaseApiReponse {
	data: T;
}

export interface ApiErrorRespose extends BaseApiReponse {
	error: {
		message: string;
		description?: string;
		code: ErrorCodes;
	};
}

export interface AuthResponse {
	token: string;
	user: { id: string; email: string; createdAt: string };
}

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
