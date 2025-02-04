import ThemeLogo from '@/components/misc/theme-logo';

export default function AuthCard({ children, title, description }: { children: React.ReactNode; title: string; description: string }) {
	return (
		<div className='bg-background border-background-200 w-full max-w-lg space-y-4 rounded-2xl border px-6 py-10 shadow-sm md:px-8 md:py-12'>
			<ThemeLogo className='mx-auto' />

			<div className='space-y-2 text-center'>
				<h1 className='text-2xl font-bold'>{title}</h1>
				<h3 className='text-foreground-100 text-sm'>{description}</h3>
			</div>

			{children}
		</div>
	);
}
