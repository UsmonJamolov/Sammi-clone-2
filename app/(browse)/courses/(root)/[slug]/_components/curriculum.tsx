import { getCurriculumByCourseId } from '@/actions/public.action';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { getDuration, getDurationInMinutes } from '@/lib/utils';
import { CalendarRange, ChevronsUpDown, Dot, ListOrdered, Monitor, Video } from 'lucide-react';

interface CurriculumProps {
	courseId: string;
}

const Curriculum = async ({ courseId }: CurriculumProps) => {
	const { data } = await getCurriculumByCourseId(courseId);

	return (
		<div className='p-4 lg:p-8 border rounded-lg bg-card mt-5'>
			<h1 className='text-2xl font-space-grotesk font-semibold'>Curriculum</h1>

			<div className='flex flex-row flex-wrap gap-6 mt-2'>
				<div className='flex flex-col'>
					<ListOrdered className='size-10' />
					<p className='font-space-grotesk'>Modules</p>
					<p className='font-medium text-2xl'>{data.length}</p>
				</div>
				<div className='flex flex-col'>
					<Monitor className='size-10' />
					<p className='font-space-grotesk'>Lessons</p>
					<p className='font-medium text-2xl'>
						{data.reduce((acc, section) => acc + section.lessons.length, 0)}
					</p>
				</div>
				<div className='flex flex-col'>
					<CalendarRange className='size-10' />
					<p className='font-space-grotesk'>Duration</p>
					<p className='font-medium text-2xl'>
						{getDuration(data.flatMap(section => section.lessons))}
					</p>
				</div>
			</div>

			<Accordion type='single' collapsible className='mt-4'>
				{data.map(section => (
					<AccordionItem key={section._id} value={section._id}>
						<AccordionTrigger className='remove-icon flex w-full items-center justify-between hover:no-underline'>
							<div className='flex items-center gap-1'>
								<ChevronsUpDown className='size-4' />
								<div className='text-left font-semibold'>{section.title}</div>
							</div>

							<div className='items-center text-sm flex gap-0 max-md:hidden'>
								<div>{section.lessons.length} Lessons</div>
								<Dot />
								<div>{getDuration(section.lessons)}</div>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className='border-l-primary border-l-2 pl-4'>
								{section.lessons.map(lesson => (
									<div
										key={lesson._id}
										className='flex items-center justify-between py-2 hover:opacity-75'
										role='button'
									>
										<div className='items-center flex gap-2'>
											<Video size={16} />
											<p>{lesson.title}</p>
										</div>
										<div>{getDurationInMinutes(lesson)} min</div>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default Curriculum;