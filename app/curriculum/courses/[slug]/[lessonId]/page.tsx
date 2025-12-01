import { getLessonDetails } from '@/actions/course.action';
import Notes from '@/app/curriculum/_components/notes';
import VideoPlayer from '@/app/curriculum/_components/video-player';

interface PageProps {
	params: Promise<{ slug: string; lessonId: string }>;
}

const Page = async ({ params }: PageProps) => {
	const {lessonId } = await params;
	const result = await getLessonDetails(lessonId)

	return (
		<>
			{/* Desktop */}
			<div className='grid-cols-4 gap-x-4 hidden lg:grid'>
				<div className='aspect-video bg-sidebar rounded-lg border lg:col-span-3'>
					<VideoPlayer videoId={result.data.videoId} />
				</div>
				<Notes />
			</div>
		</>
	);
};

export default Page;