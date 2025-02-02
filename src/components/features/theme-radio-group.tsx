import { Theme, ThemeOption } from '@/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';

export default function ThemeRadioGroup<T extends Theme>({ value, onChange, options }: { value: T; onChange: React.Dispatch<React.SetStateAction<T>>; options: ThemeOption<T>[] }) {
	return (
		<RadioGroup defaultValue={value} value={value} onValueChange={(value) => onChange(value as T)}>
			{options.map(({ label, description, icon: IconComponent, value }) => (
				<RadioGroupItem
					value={value}
					key={value}
					className='group with-transition flex items-center gap-4 rounded-xl border border-neutral-200 p-4 hover:bg-neutral-50 focus-visible:border-neutral-300 data-[state=checked]:bg-neutral-100'
				>
					<div className='flex aspect-square size-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white'>
						<IconComponent className='size-6' />
					</div>
					<div className='flex-grow space-y-1.5 text-left'>
						<h3 className='text-sm font-medium'>{label}</h3>
						<p className='text-xs text-neutral-700'>{description}</p>
					</div>
					<div className='border-primary with-transition aspect-square size-4 shrink-0 rounded-full border-2 border-neutral-200 bg-white group-disabled:cursor-not-allowed group-disabled:opacity-50 group-data-[state=checked]:border-4 group-data-[state=checked]:border-blue-500' />
				</RadioGroupItem>
			))}
		</RadioGroup>
	);
}
