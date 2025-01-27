import { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { dateIsBefore } from '@/lib/utils';

export const verificationStoreSchema = z.object({
	token: z.string().min(1),
	otpExpiration: z
		.string()
		.datetime()
		.refine((date) => dateIsBefore(date)),
});

type VerificationStoreState = z.infer<typeof verificationStoreSchema>;

type VerificationStoreActions = {
	setVerification: (verification: VerificationStoreState) => void;
	clearVerification: () => void;
	validateVerification: () => boolean;
};

type VerificationStore = { verification: VerificationStoreState } & VerificationStoreActions;

const verificationStoreName = 'notes_app.verification_store';

const verificationStoreInitialState: VerificationStoreState = {
	token: '',
	otpExpiration: new Date().toISOString(),
};

const useVerificationStore = create<VerificationStore>()(
	persist(
		(set, get) => ({
			verification: verificationStoreInitialState,
			setVerification: (verification) => {
				set({ verification });
			},
			clearVerification: () => {
				localStorage.removeItem(verificationStoreName);
			},
			validateVerification: () => {
				const verificationParse = verificationStoreSchema.safeParse(get().verification);

				if (verificationParse.success) {
					return true;
				} else {
					get().clearVerification();
					return false;
				}
			},
		}),
		{
			name: verificationStoreName,
			partialize: (state) => ({ verification: state.verification }),
		},
	),
);

export default useVerificationStore;
