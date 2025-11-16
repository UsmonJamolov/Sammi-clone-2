import { CheckCircle } from 'lucide-react';

const Learning = () => {
	const learning =
		'HTML, JavaScript, CSS, React, Next.js, Node.js, Express, MongoDB, RESTful APIs, Authentication, Deployment';

	return (
		<div className='p-4 lg:p-8 border rounded-lg bg-card'>
			<h1 className='text-2xl font-space-grotesk font-semibold'>What you will learn</h1>

			<div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
				{learning.split(', ').map(item => (
					<div className='flex gap-2' key={item}>
						<CheckCircle className='size-5 text-muted-foreground' />
						<p className='text-sm flex-1'>{item}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Learning;