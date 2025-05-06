'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorFollower() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const followerRef = useRef<HTMLDivElement>(null);
    const followerPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const follow = () => {
            // Velocidad de seguimiento: entre 0 y 1 (más cerca a 1 = más rápido)
            const speed = 0.1;

            followerPos.current.x +=
                (mousePos.x - followerPos.current.x) * speed;
            followerPos.current.y +=
                (mousePos.y - followerPos.current.y) * speed;

            if (followerRef.current) {
                followerRef.current.style.transform = `translate(${
                    followerPos.current.x - 40
                }px, ${followerPos.current.y - 40}px)`;
            }

            animationFrameId = requestAnimationFrame(follow);
        };

        follow();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePos]);

    return (
        <div
            ref={followerRef}
            className="pointer-events-none fixed top-0 left-0 z-50 h-20 w-20 rounded-full bg-blue-600/30 transition-transform duration-75"
        />
    );
}
