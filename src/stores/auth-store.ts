import { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const authStateSchema = z.object({
	token: z.string().min(1),
	user: z.object({
		id: z.string().min(1),
		email: z.string().email(),
		createdAt: z.string().datetime(),
		provider: z.enum(['credentials', 'google', 'none']),
	}),
});

type AuthStoreState = z.infer<typeof authStateSchema>;

type AuthStoreActions = {
	setAuth: (auth: Omit<AuthStoreState, 'verificationToken'>) => void;
	clearAuth: () => void;
};

type AuthStore = { auth: AuthStoreState } & AuthStoreActions;

const authStoreInitialState: AuthStoreState = {
	token: '',
	user: {
		id: '',
		email: '',
		provider: 'none',
		createdAt: new Date().toISOString(),
	},
};

const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			auth: authStoreInitialState,
			setAuth: (auth) => {
				set({ auth });
			},
			clearAuth: () => {
				set({ auth: authStoreInitialState });
			},
		}),
		{
			name: 'notes_app.auth_store',
			partialize: (state) => ({ auth: state.auth }),
		},
	),
);

export default useAuthStore;
