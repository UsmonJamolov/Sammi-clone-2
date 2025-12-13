import { getLessonDetails } from '@/actions/course.action';
import Notes, { NoteSkeleton } from '@/app/curriculum/_components/notes';
import VideoPlayer, { VideoPlayerSkeleton } from '@/app/curriculum/_components/video-player';
import NextLesson from '../_components/next-lesson';
import { Skeleton } from '@/components/ui/skeleton';

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

export const LessonPageSkeleton = () => {
	return (
		<>
			<div className='grid grid-cols-4 gap-x-4'>
				<VideoPlayerSkeleton />
				<NoteSkeleton />
			</div>

			<div className='grid grid-cols-4 mt-4'>
				<div className='lg:col-span-3 col-span-4 space-y-4'>
					<div className='flex justify-between items-center'>
						<Skeleton className='w-36 h-7' />
						<Skeleton className='w-24 h-7' />
					</div>
				</div>
			</div>
		</>
	);
};
