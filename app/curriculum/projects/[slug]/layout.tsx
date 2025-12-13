import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '../../_components/navbar';
import { CSSProperties } from 'react';
import CourseSidebar from './_components/sidebar';

interface LayoutProps {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
	const { slug } = await params;

	const sidebarStyle = {
		'--sidebar-width': '20rem',
		'--sidebar-width-mobile': '20rem',
	} as CSSProperties;

	return (
		<SidebarProvider style={sidebarStyle}>
			<CourseSidebar slug={slug} />

			<main className='w-full lg:mr-2'>
				<Navbar />
				<div className='mt-2 mb-12'>{children}</div>
			</main>
		</SidebarProvider>
	);
};

export default Layout;
