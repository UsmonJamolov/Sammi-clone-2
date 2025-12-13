'use client';

import { ComponentRef, useEffect, useRef } from 'react';
import Vimeo from '@vimeo/player';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader } from 'lucide-react';

interface VideoPlayerProps {
	videoId: string;
}

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
	const vimePlayerRef = useRef<ComponentRef<'div'>>(null);

	useEffect(() => {
		if (vimePlayerRef.current) {
			const player = new Vimeo(vimePlayerRef.current, {
				id: parseInt(videoId),
				responsive: true,
			});

			player
				.ready()
				.then(() => {
					// Player is ready
				})
				.catch(error => {
					console.error('Error initializing Vimeo player:', error);
				});

			player.on('ended', () => onEnded());
		}
	}, [videoId]);

	const onEnded = () => {};

	return (
		<div>
			<div ref={vimePlayerRef}></div>
		</div>
	);
};

export default VideoPlayer;

export const VideoPlayerSkeleton = () => {
	return (
		<Skeleton className='aspect-video bg-sidebar rounded-lg border lg:col-span-3 col-span-4 flex justify-center items-center flex-col space-y-2'>
			<Loader className='animate-spin' />
			<p className='font-geist_mono animate-pulse text-sm text-center'>Loading</p>
		</Skeleton>
	);
};
