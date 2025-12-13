import { getDashboardCourses } from '@/actions/course.action';
import { Separator } from '@/components/ui/separator';
import CourseCard from './_components/course.card';
import { CourseType } from '@/types/app.type';

const DashboardPage = async () => {
	const result = await getDashboardCourses();
	console.log(result);

	return (
		<>
			<h1 className='text-2xl font-space-grotesk'>My courses</h1>
			<Separator className='my-4' />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
				{result.data.map((course: CourseType) => (
					<CourseCard key={course._id} course={course} />
				))}
			</div>
		</>
	);
};

export default DashboardPage;
