export default function AuthCard({ children, title, description }: { children: React.ReactNode; title: string; description: string }) {
	return (
		<div className='w-full max-w-lg space-y-4 rounded-2xl border border-neutral-200 bg-white px-6 py-10 shadow-sm md:px-8 md:py-12'>
			<img src='/logo.svg' alt='logo' width={95} height={28} className='mx-auto' />

			<div className='space-y-2 text-center'>
				<h1 className='text-2xl font-bold'>{title}</h1>
				<h3 className='text-sm text-neutral-600'>{description}</h3>
			</div>

			{children}
		</div>
	);
}
