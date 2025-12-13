import { Button } from '@/components/ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const SocialButton = () => {
	return (
		<div className='grid grid-cols-2 gap-x-4 mt-4'>
			<Button variant={'outline'}>
				<FaGithub />
				<span>Github</span>
			</Button>

			<Button variant={'outline'}>
				<FaGoogle />
				<span>Google</span>
			</Button>
		</div>
	);
};

export default SocialButton;
