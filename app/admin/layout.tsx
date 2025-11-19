import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from './_components/admin.sidebar';
import AdminNavbar from './_components/admin.navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<SidebarProvider>
			<AdminSidebar />
			<main className='w-full lg:mr-2'>
				<AdminNavbar />
				<div className='mt-2 max-w-6xl mx-auto mb-12'>{children}</div>
			</main>
		</SidebarProvider>
	);
};

export default Layout;