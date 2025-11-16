import { getCourseBySlug } from '@/actions/course.action';
import ForWhom from '@/components/course/for-whom';
import Header from '@/components/course/header';
import Learning from '@/components/course/learning';
import Review from '@/components/course/review';
import Curriculum from './_components/curriculum';
import Enroll from '@/components/course/enroll';
import MobileEnroll from '@/components/course/mobile-enroll';

interface CourseDetailsPageProps {
	params: Promise<{ slug: string }>;
}

const CourseDetailsPage = async ({ params }: CourseDetailsPageProps) => {
	const { slug } = await params;
	const course = await getCourseBySlug(slug);

	return (
		<>
			<Header />

			<div className='flex mt-6 w-full items-start gap-x-4'>
				<div className='w-full lg:w-2/3'>
					<Learning />
					<Curriculum />
					<ForWhom />
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