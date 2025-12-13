'use client';

import { UserType } from '@/types/app.type';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Separator } from '../ui/separator';

interface UserBoxProps {
	user: UserType;
}

const UserBox = ({ user }: UserBoxProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div role='button' className='cursor-pointer'>
					<Avatar>
						<AvatarFallback>
							{user.firstName[0]}
							{user.lastName[0]}
						</AvatarFallback>
						{user.avatar && <AvatarImage src={user.avatar.url} alt={user.avatar.key} />}
					</Avatar>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent style={{ width: '16rem' }} align='center'>
				<div className='flex flex-col space-y-2 p-2'>
					<p className='text-xs font-medium leading-none text-muted-foreground font-space-grotesk'>
						{user.email}
					</p>

					<div className='flex items-center gap-x-2 mt-2'>
						<div className='rounded-md bg-secondary p-1'>
							<Avatar>
								<AvatarFallback>
									{user.firstName[0]}
									{user.lastName[0]}
								</AvatarFallback>
								{user.avatar && <AvatarImage src={user.avatar.url} alt={user.avatar.key} />}
							</Avatar>
						</div>

						<div className='space-y-1'>
							<p className='text-sm line-clamp-1'>
								{user.firstName} {user.lastName}
							</p>
						</div>
					</div>

					<Separator className='mt-2' />

					<div className='mt-2'>
						<Link href='/dashboard'>
							<DropdownMenuItem className='cursor-pointer'>Dashboard</DropdownMenuItem>
						</Link>
						<DropdownMenuItem
							className='cursor-pointer'
							onClick={() => signOut({ callbackUrl: '/sign-in' })}
							variant='destructive'
						>
							<LogOut />
							<span>Logout</span>
						</DropdownMenuItem>
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserBox;
