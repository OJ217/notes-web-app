import axios, { isAxiosError } from 'axios';
import { toast } from 'sonner';

import useAuthStore from '@/stores/auth-store';
import { ApiErrorRespose } from '@/types';

declare module 'axios' {
	interface AxiosRequestConfig {
		withAuthorization?: boolean;
		checkUnauthorizedResponse?: boolean;
	}
}

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL;

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withAuthorization = false;
axios.defaults.checkUnauthorizedResponse = true;

axios.interceptors.request.use(
	(config) => {
		if (config.url?.startsWith('https')) {
			config.baseURL = config.url;
			return config;
		}

		if (!config.url?.startsWith('/')) {
			config.url = `/${config.url}`;
		}

		if (config.withAuthorization && !config.headers.Authorization) {
			const controller = new AbortController();
			const token = useAuthStore.getState().auth.token;

			if (!token) {
				config.signal = controller.signal;
				controller.abort('ERR_CANCELLED');
			}

			config.headers.Authorization = `Bearers ${token}`;
			config.url = `/api${config.url}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(errorResponse) => {
		if (isAxiosError(errorResponse)) {
			if (errorResponse.config?.checkUnauthorizedResponse) {
				if (errorResponse.status === 401) {
					useAuthStore.getState().clearAuth();
					toast('Please login again');

					return Promise.reject(errorResponse);
				}
			}

			if (errorResponse.response?.data?.error) {
				const errorObj = (errorResponse.response?.data as ApiErrorRespose).error;

				if (errorObj.message) {
					toast(errorObj.message, { description: errorObj.description });
				}
			} else {
				toast('Internal error');
			}
		}

		return Promise.reject(errorResponse);
	},
);
