interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return <div className='mt-4 flex justify-center items-center h-[80vh]'>{children}</div>;
};

export default Layout;
