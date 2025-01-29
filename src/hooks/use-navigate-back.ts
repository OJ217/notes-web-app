import { To, useLocation, useNavigate } from 'react-router';

export const useNavigateBack = ({ fallback }: { fallback: To } = { fallback: '/notes' }) => {
	const navigate = useNavigate();
	const location = useLocation();

	return () => {
		if (location.key !== 'default') {
			navigate(-1);
		} else {
			navigate(fallback);
		}
	};
};
