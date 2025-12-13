import { getCourses } from '@/actions/admin.action';
import { Separator } from '@/components/ui/separator';
import CreateCourseModal from './_components/create-course.modal';
import CourseCard from './_components/course.card';

const Page = async () => {
	const res = await getCourses('project');

	return (
		<div className='mt-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-semibold font-space-grotesk'>Projects</h1>
				<CreateCourseModal />
			</div>
			<Separator className='my-4' />

			<div className='grid grid-cols-3 gap-4'>
				{res.data.map(course => (
					<CourseCard key={course._id} course={course} />
				))}
			</div>
		</div>
	);
};

export default Page;
