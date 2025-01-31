export default function IconSun(props: React.ComponentProps<'svg'>) {
	return (
		<svg width={20} height={20} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<path
				d='M10.045 2.5v1.143m0 12.714V17.5m7.5-7.5h-1.143M3.688 10H2.545m12.803-5.303l-.808.808m-8.99 8.99l-.808.808m10.606 0l-.808-.808m-8.99-8.99l-.808-.808'
				stroke='currentColor'
				strokeWidth={1.25}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path clipRule='evenodd' d='M10.045 6.504a3.496 3.496 0 110 6.992 3.496 3.496 0 010-6.992z' stroke='currentColor' strokeWidth={1.25} strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
}
