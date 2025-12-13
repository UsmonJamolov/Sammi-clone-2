'use client';

import { deleteLesson, updateLesson } from '@/actions/admin.action';
import Spinner from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { LessonType } from '@/types/app.type';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Grip } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import CreateLessonModal from './create-lesson.modal';

interface LessonListProps {
	lessons: LessonType[];
}

const LessonList = ({ lessons }: LessonListProps) => {
	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(lessons || []);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		const startIndex = Math.min(result.source.index, result.destination.index);
		const endIndex = Math.max(result.source.index, result.destination.index);

		const updatedLessons = items.slice(startIndex, endIndex + 1);

		const data = updatedLessons.map(s => ({
			_id: s._id,
			position: items.findIndex(i => i._id === s._id) + 1,
			title: s.title,
		}));

		const promise = Promise.all(data.map(s => updateLesson(s._id, { position: s.position })));
		toast.promise(promise, {
			loading: 'Updating lessons...',
			success: 'Lessons updated successfully',
			error: 'Failed to update lessons',
		});
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='lessons'>
				{provided => (
					<div {...provided.droppableProps} ref={provided.innerRef} className='space-y-1'>
						{lessons.map((lesson, idx) => (
							<LessonCard key={lesson._id} lesson={lesson} index={idx} />
						))}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default LessonList;

function LessonCard({ lesson, index }: { lesson: LessonType; index: number }) {
	const [loading, setLoading] = useState(false);

	const onDelete = async () => {
		const isConfirm = confirm('Are you sure you want to delete this lesson?');
		if (!isConfirm) return;

		try {
			setLoading(true);
			await deleteLesson(lesson._id, lesson.course.toString());
			toast.success('Lesson deleted successfully');
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Draggable draggableId={lesson._id} index={index}>
			{provided => (
				<div
					className='flex items-center gap-x-2 rounded-md text-sm border-b bg-secondary group relative'
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					{loading && (
						<div className='absolute inset-0 bg-background/70 flex items-center justify-center rounded-md z-10 animate-pulse'>
							<Spinner />
						</div>
					)}
					<div
						className='rounded-l-md border-r border-r-foreground/30 px-2 py-3 transition-all hover:bg-foreground/10 cursor-pointer'
						{...provided.dragHandleProps}
					>
						<Grip />
					</div>
					<span>{lesson.title}</span>
					<div className='ml-auto mr-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-x-1'>
						<CreateLessonModal lessonId={lesson._id} lessonData={lesson}>
							<Button size={'sm'} variant={'outline'} disabled={loading}>
								Edit
							</Button>
						</CreateLessonModal>
						<Button size={'sm'} variant={'destructive'} onClick={onDelete} disabled={loading}>
							Delete
						</Button>
					</div>
				</div>
			)}
		</Draggable>
	);
}
