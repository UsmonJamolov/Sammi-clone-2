import Logo from '@/components/shared/logo';
import { ModeToggle } from '@/components/shared/mode-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ReviewModal from './review.modal';
import UserBox from '@/components/shared/user-box';
import { getAuthorizedUser } from '@/actions/user.action';

const Navbar = async () => {
	const session = await getAuthorizedUser()
	
	return (
		<div className='w-full h-20 bg-sidebar border-b px-4 mt-2 rounded-lg border sticky top-2 z-50'>
			<div className='flex items-center justify-between h-full'>
				<Logo />

				<div className='flex items-center lg:gap-x-2 gap-x-1'>
					<ReviewModal />
					<SidebarTrigger />
					<ModeToggle />
					<UserBox user={session.user} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;