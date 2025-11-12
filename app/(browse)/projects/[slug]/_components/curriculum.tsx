import { Separator } from '@/components/ui/separator';
import { Dot, Video } from 'lucide-react';

const Curriculum = () => {
	return (
		<div className='p-4 lg:p-8 border rounded-lg bg-card mt-5'>
			<h1 className='text-2xl font-space-grotesk font-semibold'>Curriculum</h1>

			<div className='flex items-center'>
				<p>23 Lessons</p>
				<Dot />
				<p>40 hours 20 minutes</p>
			</div>

			<Separator className='my-4' />

			<div className='flex flex-col space-y-1'>
				<div className='flex items-center justify-between py-2 hover:opacity-75'>
					<div className='items-center flex gap-2'>
						<Video size={16} />
						<p>Introduction to JavaScript</p>
					</div>
					<div className='text-sm'>20 min</div>
				</div>
			</div>
		</div>
	);
};

export default Curriculum;