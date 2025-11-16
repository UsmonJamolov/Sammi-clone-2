import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const CreateNote = () => {
	return (
		<form className='flex items-center'>
			<Input
				placeholder='Type your note...'
				className='bg-secondary text-xs placeholder:text-xs rounded-r-none'
			/>
			<Button className='rounded-l-none flex-1'>
				<Send />
			</Button>
		</form>
	);
};

export default CreateNote;