import axios from 'axios';

import { ChangePasswordData } from '@/services/schema';
import { ResourceUpdatedResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useChangePasswordMutation = () => {
	const changePassword = async (changePasswordData: ChangePasswordData) => {
		return (
			await axios.patch<ResourceUpdatedResponse>('/user/password', changePasswordData, {
				withAuthorization: true,
			})
		).data.data;
	};

	const changePasswordMutation = useMutation({
		mutationFn: changePassword,
		onSuccess: (changePasswordResponse) => {
			if (changePasswordResponse.updated) {
				toast.success('Password has been changed.');
			}
		},
	});

	return {
		changePassword: changePasswordMutation.mutateAsync,
		changePasswordPending: changePasswordMutation.isPending,
	};
};
