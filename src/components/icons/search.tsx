import React from 'react';

export default function IconSearch(props: React.ComponentProps<'svg'>) {
	return (
		<svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M11.248 3.5a7.289 7.289 0 100 14.577 7.289 7.289 0 000-14.577zM2.46 10.79a8.789 8.789 0 1117.577 0 8.789 8.789 0 01-17.577 0z'
				fill='currentColor'
			/>
			<path fillRule='evenodd' clipRule='evenodd' d='M16.736 15.648l5.616 5.6-1.06 1.063-5.615-5.601 1.06-1.062z' fill='currentColor' />
		</svg>
	);
}
