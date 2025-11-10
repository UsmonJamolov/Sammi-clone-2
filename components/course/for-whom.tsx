import { Sparkles } from 'lucide-react';

const ForWhom = () => {
	const forWhom = 'Beginners, Students, Professionals';

	return (
		<div className='p-4 lg:p-8 border rounded-lg bg-card mt-5'>
			<h1 className='text-2xl font-space-grotesk font-semibold'>Who this course is for</h1>

			<div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
				{forWhom.split(', ').map(item => (
					<div className='flex gap-2' key={item}>
						<Sparkles className='size-5 text-secondary' />
						<p className='text-sm flex-1'>{item}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ForWhom;