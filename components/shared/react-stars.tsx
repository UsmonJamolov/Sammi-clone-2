'use client';

import { Star } from 'lucide-react';
import { MouseEvent, useMemo, useState } from 'react';

type ReactStarsProps = {
	onChange?: (newValue: number) => void;
	value?: number;
	count?: number;
	size?: number;
	color?: string;
	activeColor?: string;
	readOnly?: boolean;
	className?: string;
};

function clamp(n: number, min: number, max: number) {
	return Math.max(min, Math.min(max, n));
}

const ReactStars = (props: ReactStarsProps) => {
	const {
		onChange,
		value = 0,
		count = 5,
		size = 30,
		color = '#e4e5e9',
		activeColor = '#ffd700',
		readOnly = false,
		className,
	} = props;

	const [hover, setHover] = useState<number | null>(null);

	const displayValue = hover ?? value;
	const stars = useMemo(() => Array.from({ length: count }, (_, i) => i + 1), [count]);

	function getPointValue(index: number, e: MouseEvent<HTMLDivElement>) {
		const { left, width } = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
		const ratio = (e.clientX - left) / width;
		return ratio <= 0.5 ? index - 0.5 : index;
	}

	function handleMouseMove(star: number, e: MouseEvent<HTMLDivElement>) {
		if (readOnly) return;
		setHover(clamp(getPointValue(star, e), 0, count));
	}

	function handleClick(star: number, e: MouseEvent<HTMLDivElement>) {
		if (readOnly || !onChange) return;
		onChange(getPointValue(star, e));
	}

	return (
		<div
			className={className}
			style={{
				display: 'inline-flex',
				gap: Math.round(size * 0.1),
				cursor: readOnly ? 'default' : 'pointer',
				lineHeight: 0,
				userSelect: 'none',
			}}
			onMouseLeave={() => !readOnly && setHover(null)}
		>
			{stars.map(star => {
				const fillTill = Math.floor(displayValue);
				const fraction = displayValue - fillTill;
				const fillPortion = star <= fillTill ? 1 : star === fillTill + 1 ? fraction : 0;

				return (
					<div
						key={star}
						style={{
							position: 'relative',
							width: size,
							height: size,
						}}
						onMouseMove={e => handleMouseMove(star, e)}
						onClick={e => handleClick(star, e)}
					>
						<Star width={size} height={size} strokeWidth={2} color={color} fill={color} />

						<div
							style={{
								position: 'absolute',
								inset: 0,
								overflow: 'hidden',
								left: 0,
								width: `${fillPortion * 100}%`,
								pointerEvents: 'none',
							}}
						>
							<Star
								width={size}
								height={size}
								strokeWidth={0}
								color={activeColor}
								fill={activeColor}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ReactStars;
