import { getCurriculumByProjectId } from '@/actions/public.action';
import { Separator } from '@/components/ui/separator';
import { getDuration, getDurationInMinutes } from '@/lib/utils';
import { Dot, Video } from 'lucide-react';

interface CurriculumProps {
	projectId: string;
}

const Curriculum = async ({ projectId }: CurriculumProps) => {
	const { data } = await getCurriculumByProjectId(projectId);

	return (
		<div className='p-4 lg:p-8 border rounded-lg bg-card mt-5'>
			<h1 className='text-2xl font-space-grotesk font-semibold'>Curriculum</h1>

			<div className='flex items-center'>
				<p>{data.length} Lessons</p>
				<Dot />
				<p>{getDuration(data)}</p>
			</div>

			<Separator className='my-4' />

			<div className='flex flex-col space-y-1'>
				{data.map(lesson => (
					<div key={lesson._id} className='flex items-center justify-between py-2 hover:opacity-75'>
						<div className='items-center flex gap-2'>
							<Video size={16} />
							<p>{lesson.title}</p>
						</div>
						<div className='text-sm'>{getDurationInMinutes(lesson)} min</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Curriculum;