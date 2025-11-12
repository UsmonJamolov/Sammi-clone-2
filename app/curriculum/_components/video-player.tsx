'use client'

import { ComponentRef, useEffect, useRef } from 'react';
import Vimeo from '@vimeo/player';

interface VideoPlayerProps {
    videoId: string
}

const VideoPlayer = ({videoId}: VideoPlayerProps) => {
    const vimePlayerRef = useRef<ComponentRef<'div'>>(null)

    useEffect(() => {
        if (vimePlayerRef.current) {
            const player = new Vimeo(vimePlayerRef.current, {
                id: parserInt(videoId),
                responsive: true
            })

            player
                .ready()
                .then(() => {
                    // Player is ready
                })
                .catch(error => {
                    console.error();
                    
                })

            player.on('ended', () => onEnded())
        }
    }, onEnded = () => {})

    return (
        <div>
            <div ref={vimePlayerRef}></div>
        </div>
    )
}

export default VideoPlayer