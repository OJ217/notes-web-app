import axios from 'axios';
import { toast } from 'sonner';

import { ChangePasswordFormValues } from '@/services/schema';
import { ApiResponse, ResourceUpdatedResponse } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useChangePasswordMutation = () => {
	const changePassword = async (changePasswordData: ChangePasswordFormValues) => {
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

export const useUserTagsQuery = () => {
	const fetchTags = async () => {
		return (
			await axios.get<
				ApiResponse<
					{
						tag: string;
						tag_count: number;
					}[]
				>
			>('/user/tags', {
				withAuthorization: true,
			})
		).data.data;
	};

	return useQuery({
		queryKey: ['tags'],
		queryFn: fetchTags,
	});
};
