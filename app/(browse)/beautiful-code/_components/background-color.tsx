'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useStore } from './use-store';
import { getBgTypeByLabel, getGradientByLabel, getImageByLabel } from './utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { backgroundTypes, gradientColors, imageBackgrounds } from './constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HexColorPicker } from 'react-colorful';
import Image from 'next/image';

const BackgroundColor = () => {
	const {
		backgroundType,
		setBackgroundType,
		color,
		setColor,
		gradient,
		setGradient,
		image,
		setImage,
	} = useStore();

	const [isTypeOpen, setIsTypeOpen] = useState(false);
	const [isGradientOpen, setIsGradientOpen] = useState(false);
	const [isImageOpen, setIsImageOpen] = useState(false);

	const currentBgType = getBgTypeByLabel(backgroundType);
	const currenGradient = getGradientByLabel(gradient);
	const currentImage = getImageByLabel(image);

	return (
		<>
			<div className='lg:col-span-1 col-span-2'>
				<Popover open={isTypeOpen} onOpenChange={setIsTypeOpen}>
					<PopoverTrigger className='p-2 bg-sidebar rounded-lg border h-16 w-full'>
						<div className='flex items-center justify-between'>
							<div className='flex items-start flex-col cursor-pointer'>
								<p className='font-space-grotesk text-xs'>Background type</p>
								<p className='font-space-grotesk font-bold'>{currentBgType.label}</p>
							</div>

							<ChevronDown className='size-5' />
						</div>
					</PopoverTrigger>

					<PopoverContent className='rounded-lg p-0 py-2 bg-sidebar' side='bottom'>
						{backgroundTypes.map(type => (
							<div
								key={type.value}
								className='flex items-center px-2 gap-x-2 justify-start h-10 hover:bg-secondary cursor-pointer'
								onClick={() => {
									setBackgroundType(type.value);
									setIsTypeOpen(false);
								}}
							>
								<div className='font-space-grotesk'>{type.label}</div>
							</div>
						))}
					</PopoverContent>
				</Popover>
			</div>

			<div className='lg:col-span-1 col-span-2'>
				{currentBgType.value === 'gradient' && (
					<Popover open={isGradientOpen} onOpenChange={setIsGradientOpen}>
						<PopoverTrigger className='p-2 bg-sidebar rounded-lg border h-16 w-full'>
							<div className='flex items-center justify-between'>
								<div className='flex items-start flex-col cursor-pointer'>
									<p className='font-space-grotesk text-xs'>Gradient</p>
									<div className='flex items-center gap-x-2'>
										<div className={`size-6 rounded-lg ${currenGradient.value}`}></div>
										<p className='font-space-grotesk font-bold'>{currenGradient.label}</p>
									</div>
								</div>

								<ChevronDown className='size-5' />
							</div>
						</PopoverTrigger>
						<PopoverContent className='rounded-lg p-0 py-2 bg-sidebar' side='bottom'>
							<ScrollArea className='h-52 flex flex-col'>
								{gradientColors.map(color => (
									<div
										key={color.label}
										className='flex items-center px-2 gap-x-2 justify-start h-10 hover:bg-secondary cursor-pointer'
										onClick={() => {
											setGradient(color.value);
											setIsGradientOpen(false);
										}}
									>
										<div className={`size-6 rounded-lg ${color.value}`}></div>
										<div className='font-space-grotesk'>{color.label}</div>
									</div>
								))}
							</ScrollArea>
						</PopoverContent>
					</Popover>
				)}

				{currentBgType.value === 'solid' && (
					<Popover>
						<PopoverTrigger className='p-2 bg-sidebar rounded-lg border h-16 w-full'>
							<div className='flex items-center justify-between'>
								<div className='flex items-start flex-col cursor-pointer'>
									<p className='font-space-grotesk text-xs'>Solid</p>
									<p className='font-space-grotesk font-bold'>{color}</p>
								</div>

								<ChevronDown className='size-5' />
							</div>
						</PopoverTrigger>
						<PopoverContent className='rounded-lg p-2 bg-sidebar' side='bottom'>
							<HexColorPicker
								color={color}
								onChange={val => setColor(val)}
								style={{ width: '100%' }}
							/>
						</PopoverContent>
					</Popover>
				)}

				{currentBgType.value === 'image' && (
					<Popover open={isImageOpen} onOpenChange={setIsImageOpen}>
						<PopoverTrigger className='p-2 bg-sidebar rounded-lg border h-16 w-full'>
							<div className='flex items-center justify-between'>
								<div className='flex items-start flex-col cursor-pointer'>
									<p className='font-geist_mono text-xs'>Images</p>
									<div className='flex items-center gap-x-2'>
										<div className='size-6 rounded-lg relative'>
											<Image
												src={currentImage.images}
												alt={currentImage.value}
												fill
												className='rounded-lg object-cover'
											/>
										</div>
										<p className='font-geist_mono font-bold'>{currentImage.label}</p>
									</div>
								</div>

								<ChevronDown className='size-5' />
							</div>
						</PopoverTrigger>
						<PopoverContent className='rounded-lg p-0 py-2 bg-sidebar' side='bottom'>
							<ScrollArea className='h-52 flex flex-col'>
								{imageBackgrounds.map(item => (
									<div
										key={item.value}
										className='flex items-center px-2 gap-x-2 justify-start h-10 hover:bg-secondary cursor-pointer'
										onClick={() => {
											setImage(item.value);
											setIsImageOpen(false);
										}}
									>
										<div className='size-6 rounded-lg relative'>
											<Image
												src={item.images}
												alt={item.value}
												fill
												className='rounded-lg object-cover'
											/>
										</div>
										<div className='font-geist_mono'>{item.label}</div>
									</div>
								))}
							</ScrollArea>
						</PopoverContent>
					</Popover>
				)}
			</div>
		</>
	);
};

export default BackgroundColor;
