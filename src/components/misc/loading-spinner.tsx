import { cn } from '@/lib/utils';

export default function LoadingSpinner({ className }: { className?: string }) {
	return (
		<div className={cn('relative flex size-4 items-center justify-start text-current', className)}>
			<div className='absolute inset-0 h-full w-full'>
				<div className='relative top-[50%] left-[50%] h-full w-full'>
					{Array.from({ length: 12 }).map((_, index) => (
						<div
							key={index}
							className={`animate-spin-bar absolute top-[-3.9%] left-[-10%] h-[8%] w-[24%] -translate-x-1/2 transform rounded-md bg-current`}
							style={{
								animationDelay: `${-1.2 + index * 0.1}s`,
								transform: `rotate(${index === 0 ? 0.0001 : index * 30}deg) translate(146%)`,
							}}
						></div>
					))}
				</div>
			</div>
		</div>
	);
}
