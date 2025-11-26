import { getProjectLessons } from '@/actions/admin.action';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CourseType } from '@/types/app.type';
import { Plus } from 'lucide-react';
import CreateLessonModal from './create-lesson.modal';
import LessonList from './lesson-list';

interface Props {
	courseData: CourseType;
}

const Lesson = async ({ courseData }: Props) => {
	const { data } = await getProjectLessons(courseData._id);

	console.log(data);

	return (
		<div className='bg-sidebar p-6 rounded-md border'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-semibold font-space-grotesk'>Lessons</h1>
				<CreateLessonModal>
					<Button size={'sm'}>
						<span>Add</span>
						<Plus />
					</Button>
				</CreateLessonModal>
			</div>

			<Separator className='my-4' />

			{data.length === 0 && (
				<p className='text-center py-10 text-muted-foreground'>No lessons found</p>
			)}
			<LessonList lessons={data} />
		</div>
	);
};

export default Lesson;