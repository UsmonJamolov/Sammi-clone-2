'use client';

import { Label } from '@/components/ui/label';
import { useStore } from './use-store';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings2 } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { fontMap, fontSizeOptions, tabSizeOptions } from './constants';
import { Checkbox } from '@/components/ui/checkbox';

const Settings = () => {
	const {
		font,
		setFont,
		fontSize,
		setFontSize,
		tabSize,
		setTabSize,
		lineNumber,
		setLineNumber,
		foldGutter,
		setFoldGutter,
	} = useStore();

	return (
		<Popover>
			<PopoverTrigger className='p-2 bg-sidebar rounded-lg border h-16'>
				<div className='flex items-center gap-x-2'>
					<Settings2 className='size-5' />
					<h1>Settings</h1>
				</div>
			</PopoverTrigger>

			<PopoverContent className='rounded-lg p-2 bg-sidebar w-96'>
				<div className='flex flex-col space-y-1'>
					<Label className='font-space-grotesk text-xs'>Font Family</Label>
					<Select onValueChange={setFont} value={font}>
						<SelectTrigger className='w-full bg-background h-12 focus-visible:ring-0'>
							<SelectValue placeholder='Font Family' />
						</SelectTrigger>
						<SelectContent>
							{Object.keys(fontMap).map(item => (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='grid grid-cols-2 gap-x-2 mt-4'>
					<div className='flex flex-col space-y-1'>
						<Label className='font-space-grotesk text-xs'>Font Size</Label>
						<Select onValueChange={setFontSize} value={fontSize}>
							<SelectTrigger className='w-full bg-background h-12 focus-visible:ring-0'>
								<SelectValue placeholder='Font Size' />
							</SelectTrigger>
							<SelectContent>
								{fontSizeOptions.map(item => (
									<SelectItem key={item.value} value={`${item.value}`}>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='flex flex-col space-y-1'>
						<Label className='font-space-grotesk text-xs'>Tab Size</Label>
						<Select onValueChange={setTabSize} value={tabSize}>
							<SelectTrigger className='w-full bg-background h-12 focus-visible:ring-0'>
								<SelectValue placeholder='Tab Size' />
							</SelectTrigger>
							<SelectContent>
								{tabSizeOptions.map(item => (
									<SelectItem key={item.value} value={`${item.value}`}>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className='flex items-center space-x-2 mt-4'>
					<Checkbox
						id='line-number'
						checked={lineNumber}
						onCheckedChange={val => setLineNumber(Boolean(val))}
					/>
					<label htmlFor='line-number' className='text-sm font-medium leading-none '>
						Line numbers
					</label>
				</div>
				<div className='flex items-center space-x-2 mt-4'>
					<Checkbox
						id='fold-gutter'
						checked={foldGutter}
						onCheckedChange={val => setFoldGutter(Boolean(val))}
					/>
					<label htmlFor='fold-gutter' className='text-sm font-medium leading-none '>
						Fold gutter
					</label>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default Settings;