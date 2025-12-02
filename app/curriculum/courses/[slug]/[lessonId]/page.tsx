import { getLessonDetails } from '@/actions/course.action';
import Notes from '@/app/curriculum/_components/notes';
import VideoPlayer from '@/app/curriculum/_components/video-player';
import NextLesson from '../_components/next-lesson';

interface PageProps {
	params: Promise<{ slug: string; lessonId: string }>;
}

const Page = async ({ params }: PageProps) => {
	const { lessonId } = await params;
	const result = await getLessonDetails(lessonId);

	return (
		<>
			<div className='grid-cols-4 gap-x-4 hidden lg:grid'>
				<div className='aspect-video bg-sidebar rounded-lg border lg:col-span-3'>
					<VideoPlayer videoId={result.data.videoId} />
				</div>
				<Notes lessonId={lessonId} />
			</div>

			<div className='grid-cols-4 gap-x-4 grid'>
				<div className='mt-4 col-span-3'>
					<div className='flex justify-between items-center'>
						<h1 className='text-2xl font-semibold'>{result.data.title}</h1>
						<NextLesson />
					</div>

					{result.data.content && result.data.content.length > 0 && (
						<div className='bg-secondary rounded-md border p-4 mt-4'>
							<h2 className='text-lg font-semibold'>Lesson Content</h2>
							<div
								className='prose prose-blue'
								dangerouslySetInnerHTML={{ __html: result.data.content }}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Page;