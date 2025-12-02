'use client';

import { deleteNote } from '@/actions/course.action';
import { Button } from '@/components/ui/button';
import { NoteType } from '@/types/app.type';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface NoteListProps {
	note: NoteType;
	index: number;
}

const NoteList = ({ note, index }: NoteListProps) => {
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		setLoading(true);
		try {
			await deleteNote(note._id);
			toast.success('Note deleted successfully');
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='hover:bg-secondary border-b p-2 text-sm leading-4 cursor-pointer flex justify-between items-start group relative h-full'>
			<div>
				{index + 1}. {note.content}
			</div>
			<Button
				className='invisible group-hover:visible size-6 p-0 rounded-full absolute top-1 right-1'
				variant={'ghost'}
				disabled={loading}
				onClick={handleDelete}
			>
				<Trash2 />
			</Button>
		</div>
	);
};

export default NoteList;