'use client';

import { motion, Variants } from 'framer-motion';

interface RevealProps {
	children: React.ReactNode;
	className?: string;
}

const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Reveal = ({ children, className }: RevealProps) => {
	return (
		<motion.div
			className={className}
			variants={fadeInUp}
			initial={'hidden'}
			whileInView={'show'}
			transition={{ delay: 0.2 }}
			viewport={{ once: true }}
		>
			{children}
		</motion.div>
	);
};

export default Reveal;