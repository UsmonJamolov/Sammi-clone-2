'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Braces, Bug, GaugeCircle, Terminal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
	const pathname = usePathname();

	return (
		<Sidebar variant='floating' collapsible='icon'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Dashboard</SidebarGroupLabel>
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
				<SidebarGroup />
			</SidebarContent>
		</Sidebar>
	);
};

export default AdminSidebar;

const navbar_items = [
	{ title: 'Dashboard', href: '/admin', icon: GaugeCircle },
	{ title: 'Courses', href: '/admin/courses', icon: Braces },
	{ title: 'Projects', href: '/admin/projects', icon: Terminal },
	{ title: 'Source codes', href: '/admin/source-codes', icon: Bug },
];