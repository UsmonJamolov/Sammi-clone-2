import { Separator } from '@/components/ui/separator';
import CreateCourseModal from './_components/create-course.modal';
import CourseCard from './_components/course.card';

const Page = () => {
	return (
		<div className='mt-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-semibold font-space-grotesk'>Courses</h1>
				<CreateCourseModal />
			</div>
			<Separator className='my-4' />

			<div className='grid grid-cols-3 gap-4'>
				<CourseCard />
			</div>
		</div>
	);
};

export default Page;