'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useStore } from './use-store';
import { getLanguageByLabel } from './utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { highlightLanguages } from './constants';

const HighlightLanguage = () => {
	const [open, setOpen] = useState(false);
	const { language, setLanguage } = useStore();

	const currentLanguage = getLanguageByLabel(language);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger className='p-2 bg-sidebar rounded-lg border h-16'>
				<div className='flex items-center justify-between'>
					<div className='flex items-start flex-col cursor-pointer space-y-1'>
						<p className='font-space-grotesk text-xs'>Highlight Language</p>
						<div className='font-space-grotesk font-bold flex items-center gap-x-2'>
							<currentLanguage.icon className='size-5' />
							<span>{language}</span>
						</div>
					</div>

					<ChevronDown className='size-5' />
				</div>
			</PopoverTrigger>
			<PopoverContent className='rounded-lg p-0 py-2 bg-sidebar'>
				<ScrollArea className='h-52 flex flex-col'>
					{highlightLanguages.map(item => (
						<div
							key={item.label}
							className='flex items-center px-2 gap-x-2 justify-start h-14 hover:bg-secondary cursor-pointer'
							onClick={() => {
								setLanguage(item.label);
								setOpen(false);
							}}
						>
							<item.icon size={24} />
							<div className='font-space-grotesk'>{item.label}</div>
						</div>
					))}
				</ScrollArea>
			</PopoverContent>
		</Popover>
	);
};

export default HighlightLanguage;