import { useLocation, useParams, useSearchParams } from 'react-router';

export const useHeaderTitle = (): React.ReactNode => {
	const params = useParams();
	const { pathname } = useLocation();
	const [searchParams] = useSearchParams();

	switch (true) {
		case pathname.startsWith('/notes'):
			if (pathname.startsWith('/notes/new')) {
				return 'New Note';
			}
			return 'All Notes';
		case pathname.startsWith('/archives'):
			return 'Archived Notes';
		case pathname.startsWith('/tags'):
			if (params.tag !== undefined) {
				return (
					<>
						<span className='text-foreground-100'>Notes Tagged:</span> {params.tag}
					</>
				);
			}
			return 'Tags';
		case pathname.startsWith('/search'):
			if (searchParams.get('query') !== null) {
				return (
					<>
						<span className='text-foreground-100'>Showing results for:</span> {searchParams.get('query')}
					</>
				);
			}
			return 'Search';
		case pathname.startsWith('/settings'):
			return 'Settings';
		default:
			return 'Not found';
	}
};
