import { NavigateOptions, useLocation, useNavigate } from 'react-router';

export const useNavigateToParent = ({ options }: { options?: NavigateOptions } = {}) => {
	const navigate = useNavigate();
	const { search } = useLocation();

	return () => {
		navigate({ pathname: '..', search }, options);
	};
};
