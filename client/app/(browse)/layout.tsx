import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import AppSidebar from './_components/app.sidebar';
import AppNavbar from './_components/app.navbar';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className='w-full lg:mr-2'>
				<AppNavbar />
				<div className='mt-2 max-w-6xl mx-auto mb-12'>{children}</div>
			</main>
		</SidebarProvider>
	);
};

export default Layout;
