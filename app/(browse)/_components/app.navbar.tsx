import Logo from '@/components/shared/logo';
import { ModeToggle } from '@/components/shared/mode-toggle';
import UserBox from '@/components/shared/user-box';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { Contact, LogIn } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const AppNavbar = async () => {
	const session = await getServerSession(auth);

	return (
		<div className='w-full h-20 bg-sidebar border-b px-4 mt-2 rounded-lg border sticky top-2 z-50'>
			<div className='flex items-center justify-between h-full'>
				<Logo />

				<div className='flex items-center lg:gap-x-2 gap-x-1'>
					<SidebarTrigger />
					<ModeToggle />
					<Button asChild size={'icon'} variant='ghost' className='size-7'>
						<Link href={'/contact'}>
							<Contact />
						</Link>
					</Button>
					{session?.user && <UserBox user={session.user} />}
					{!session?.user._id && (
						<Button asChild size={'sm'}>
							<Link href={'/sign-in'}>
								<span>Sign In</span>
								<LogIn />
							</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default AppNavbar;
