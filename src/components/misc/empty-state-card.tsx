export default function EmptyStateCard({ children }: { children: React.ReactNode | string }) {
	return <div className='h-min rounded-lg border border-neutral-200 bg-neutral-100 p-2 text-sm'>{children}</div>;
}
