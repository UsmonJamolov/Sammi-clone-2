import { Button } from '@/components/ui/button';
import { Info, Send } from 'lucide-react';
import CreateNote from './create-note';
import { getNotes } from '@/actions/course.action';
import NoteList from './note-list';
import { NoteType } from '@/types/app.type';
import { Skeleton } from '@/components/ui/skeleton';

interface NotesProps {
	lessonId: string;
}

const Notes = async ({ lessonId }: NotesProps) => {
	const result = await getNotes(lessonId);

	return (
		<div className='hidden lg:block col-span-1 rounded-lg h-full'>
			<div className='bg-sidebar border rounded-lg'>
				<div className='bg-secondary rounded-t-lg p-2'>
					<h2 className='font-space-grotesk text-xl font-semibold text-center'>Notes</h2>
				</div>

				<div className='h-[320px] w-full overflow-y-scroll'>
					<div className='mt-2'>
						{result.data.length === 0 && (
							<p className='text-sm text-center'>No notes yet. Add your first note!</p>
						)}
						{result.data.map((note: NoteType, index: number) => (
							<NoteList key={note._id} note={note} index={index} />
						))}
					</div>
				</div>

				<div className='flex flex-col space-y-1 w-full rounded-b-lg'>
					<div className='flex items-center gap-x-1'>
						<Button className='size-7 flex' variant={'ghost'}>
							<Info />
						</Button>
						<p className='text-sm'>Add a note</p>
					</div>

					<CreateNote />
				</div>
			</div>
		</div>
	);
};

export default Notes;

export const NoteSkeleton = () => {
	return (
		<div className='col-span-1 rounded-lg h-full hidden lg:block'>
			<div className='bg-sidebar border'>
				<Skeleton className='rounded-lg h-12' />

				<Skeleton className='h-[320px] w-full bg-transparent rounded-lg' />

				<div className='flex flex-col space-y-1 w-full rounded-b-lg'>
					<div className='flex items-center gap-x-1 px-1'>
						<Info className='animate-pulse size-5' />
						<Skeleton className='w-24 h-4' />
					</div>

					<div className='flex items-center'>
						<Skeleton className='flex-1 bg-secondary w-full h-9' />
						<Button size={'icon'} className='rounded-l-none'>
							<Send />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
