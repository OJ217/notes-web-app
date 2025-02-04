export default function EmptyStateCard({ children }: { children: React.ReactNode | string }) {
	return <div className='border-background-200 bg-background-300 h-min rounded-lg border p-2 text-sm'>{children}</div>;
}
