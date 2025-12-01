import { getCourseData } from '@/actions/course.action';
import { redirect } from 'next/navigation';

interface Props {
	params: Promise<{ slug: string }>;
}

const CurriculumSlugPage = async ({ params }: Props) => {
	const { slug } = await params;
	const courseData = await getCourseData(slug);

	return redirect(
		`/curriculum/courses/${slug}/${courseData.data.lastLessonId}?s=${courseData.data.lastSectionId}`
	);
};

export default CurriculumSlugPage;
