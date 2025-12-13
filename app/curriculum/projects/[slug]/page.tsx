import { getProjectData } from '@/actions/course.action';
import { redirect } from 'next/navigation';

interface Props {
	params: Promise<{ slug: string }>;
}

const CurriculumSlugPage = async ({ params }: Props) => {
	const { slug } = await params;
	const courseData = await getProjectData(slug);

	return redirect(`/curriculum/projects/${slug}/${courseData.data.lastLessonId}`);
};

export default CurriculumSlugPage;
