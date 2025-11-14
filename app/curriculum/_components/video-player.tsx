'use client';

import { ComponentRef, useEffect, useRef } from 'react';
import Vimeo from '@vimeo/player';

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