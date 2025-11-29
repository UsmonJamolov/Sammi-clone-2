import ForWhom from '@/components/course/for-whom';
import Header from '@/components/course/header';
import Learning from '@/components/course/learning';
import Review from '@/components/course/review';
import Curriculum from './_components/curriculum';
import Enroll from '@/components/course/enroll';
import MobileEnroll from '@/components/course/mobile-enroll';
import { getCourseBySlug } from '@/actions/public.action';

interface CourseDetailsPageProps {
	params: Promise<{ slug: string }>;
}

const CourseDetailsPage = async ({ params }: CourseDetailsPageProps) => {
	const { slug } = await params;
	const {data} = await getCourseBySlug(slug);

	return (
		<>
			<Header courseData={data} />

			<div className='flex mt-6 w-full items-start gap-x-4'>
				<div className='w-full lg:w-2/3'>
					<Learning courseData={data} />
					<Curriculum courseId={data._id} />
					<ForWhom courseData={data} />
					<Review />
				</div>
				<div className='hidden lg:flex lg:w-1/3 sticky top-24'>
					<Enroll />
				</div>
			</div>

			<MobileEnroll />
		</>
	);
};

export default CourseDetailsPage;