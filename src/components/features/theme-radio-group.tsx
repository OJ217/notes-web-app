import { Theme, ThemeOption } from '@/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';

export default function ThemeRadioGroup<T extends Theme>({ value, onChange, options }: { value: T; onChange: React.Dispatch<React.SetStateAction<T>>; options: ThemeOption<T>[] }) {
	return (
		<RadioGroup defaultValue={value} value={value} onValueChange={(value) => onChange(value as T)}>
			{options.map(({ label, description, icon: IconComponent, value }) => (
				<RadioGroupItem
					value={value}
					key={value}
					className='group with-transition focus-visible:border-background-100 border-background-200 data-[state=checked]:bg-background-300 hover:bg-background-400 flex items-center gap-4 rounded-xl border p-4'
				>
					<div className='bg-background border-background-200 flex aspect-square size-10 shrink-0 items-center justify-center rounded-xl border'>
						<IconComponent className='size-6' />
					</div>
					<div className='flex-grow space-y-1.5 text-left'>
						<h3 className='text-sm font-medium'>{label}</h3>
						<p className='text-foreground-200 text-xs'>{description}</p>
					</div>
					<div className='border-primary with-transition border-background-200 aspect-square size-4 shrink-0 rounded-full border-2 group-disabled:cursor-not-allowed group-disabled:opacity-50 group-data-[state=checked]:border-4 group-data-[state=checked]:border-blue-500' />
				</RadioGroupItem>
			))}
		</RadioGroup>
	);
}
