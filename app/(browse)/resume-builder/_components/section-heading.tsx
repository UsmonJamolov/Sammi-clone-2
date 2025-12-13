import { Icons } from '@/components/shared/icons';

type SectionHeadingProps = {
	title: string;
	icon: keyof typeof Icons;
};

const SectionHeading = ({ title, icon }: SectionHeadingProps) => {
	const Icon = Icons[icon || 'arrowRight'];

	return (
		<div className='flex  items-center'>
			<Icon />
			<h2 className='text-xl flex-1 font-space-grotesk font-bold'>{title}</h2>
		</div>
	);
};

export default SectionHeading;
