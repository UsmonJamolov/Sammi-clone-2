import { IoMdArrowDropright } from 'react-icons/io';
import { Button } from '../ui/button';

const MobileEnroll = () => {
	return (
		<div className='block md:hidden mt-36'>
			<div className='fixed w-full p-4 bg-sidebar bottom-0 left-0 right-0 border-t flex items-center justify-between'>
				<div className='flex items-end gap-x-2 mt-2'>
					<h2 className='text-2xl font-semibold font-space-grotesk'>Free</h2>
					<p className='text-sm text-muted-foreground line-through'>10.00 USD</p>
				</div>

				<Button className='rounded-full group' size={'lg'}>
					<span>Enroll Now</span>
					<IoMdArrowDropright className='size-4 transition-transform group-hover:translate-x-1' />
				</Button>
			</div>
		</div>
	);
};

export default MobileEnroll;
