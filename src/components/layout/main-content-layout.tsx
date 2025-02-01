export default function MainContentLayout({ leftSideBar, content, rightSideBar }: { leftSideBar: JSX.Element; content?: JSX.Element; rightSideBar?: JSX.Element }) {
	return (
		<div className='grid h-full grid-cols-[280px_1fr_240px]'>
			<div className='h-full overflow-hidden border-r border-r-neutral-200'>{leftSideBar}</div>
			<div className='h-full overflow-hidden px-6 py-5'>{content}</div>
			{rightSideBar && <div className='h-full overflow-hidden border-l border-l-neutral-200'>{rightSideBar}</div>}
		</div>
	);
}
