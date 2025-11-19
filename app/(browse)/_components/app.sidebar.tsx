'use client';

import { Button } from '@/components/ui/button';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
	Braces,
	Bug,
	CircleGauge,
	GitCompareArrows,
	Github,
	Home,
	Instagram,
	Linkedin,
	Rss,
	Send,
	Terminal,
	UserPen,
	Youtube,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AppSidebar = () => {
	const pathname = usePathname();

	return (
		<Sidebar variant='floating' collapsible='icon'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Pages</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navbar_items.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild isActive={pathname === item.href}>
										<Link href={item.href}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Startups</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{startup_items.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild isActive={pathname === item.href}>
										<Link href={item.href}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup />
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu className='flex items-center border-t group-data-[collapsible=icon]:hidden'>
					<div className='flex items-center gap-x-2 pt-2'>
						{social_items.map(item => (
							<Button
								variant={'ghost'}
								size={'icon'}
								className='size-7'
								onClick={() => window.open(item.href, '_blank')}
								key={item.title}
							>
								<item.icon />
							</Button>
						))}
					</div>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;

const navbar_items = [
	{ title: 'Home', href: '/', icon: Home },
	{ title: 'Courses', href: '/courses', icon: Braces },
	{ title: 'Projects', href: '/projects', icon: Terminal },
	{ title: 'Source codes', href: '/source-codes', icon: Bug },
	{ title: 'Dashboard', href: '/dashboard', icon: CircleGauge },
];

const startup_items = [
	{ title: 'Blogs', href: '/blogs', icon: Rss },
	{ title: 'Resume builder', href: '/resume-builder', icon: UserPen },
	{ title: 'Beautiful code', href: '/beautiful-code', icon: GitCompareArrows },
];

const social_items = [
	{ title: 'Telegram', href: 'https://t.me/samarbadriddinov', icon: Send },
	{ title: 'Instagram', href: 'https://www.instagram.com/samarbadriddinov/', icon: Instagram },
	{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/samarbadriddinov/', icon: Linkedin },
	{ title: 'Youtube', href: 'https://www.youtube.com/@samarbadriddinov', icon: Youtube },
	{ title: 'Github', href: 'https://github.com/samarbadriddin0v', icon: Github },
];
