import { Button } from '@/components/ui/button';
import { IoMdArrowDropleft } from 'react-icons/io';
import { CiTrash } from 'react-icons/ci';

const CourseAction = () => {
	return (
		<div className='flex items-center'>
			<Button variant={'outline'} className='rounded-r-none'>
				<IoMdArrowDropleft />
				<span>Back</span>
			</Button>
			<Button className='rounded-none' variant={'secondary'}>
				Draft
			</Button>
			<Button variant={'destructive'} className='rounded-l-none'>
				<span>Delete</span>
				<CiTrash />
			</Button>
		</div>
	);
};

export default CourseAction;