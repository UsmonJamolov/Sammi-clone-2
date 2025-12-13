'use client';

import { createNote } from '@/actions/course.action';
import Spinner from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const CreateNote = () => {
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);

	const { lessonId } = useParams<{ lessonId: string }>();

	const handleClick = async () => {
		if (!content) return;
		setLoading(true);
		try {
			await createNote(lessonId, content);
			toast.success('Note created successfully');
			setContent('');
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className='flex items-center'>
			<Input
				placeholder='Type your note...'
				className='bg-secondary text-xs placeholder:text-xs rounded-r-none'
				value={content}
				onChange={e => setContent(e.target.value)}
				disabled={loading}
			/>
			<Button
				type='submit'
				className='rounded-l-none flex-1'
				onClick={handleClick}
				disabled={loading}
			>
				{loading ? <Spinner /> : <Send />}
			</Button>
		</form>
	);
};

export default CreateNote;
