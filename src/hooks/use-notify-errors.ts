import { useEffect } from 'react';
import { Control, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

export const useNotifyErrors = ({ control }: { control: Control<any> }) => {
	const { errors: formErrors } = useFormState({ control });

	useEffect(() => {
		const errorList = Object.values(formErrors);

		if (errorList[0] !== undefined) {
			toast.dismiss();
			toast.error(errorList[0].message as string);
		}
	}, [formErrors]);
};
