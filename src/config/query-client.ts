import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			refetchOnWindowFocus: false,
			networkMode: 'always',
			retry: false,
		},
		mutations: {
			retry: false,
			throwOnError: false,
		},
	},
});

export default queryClient;
