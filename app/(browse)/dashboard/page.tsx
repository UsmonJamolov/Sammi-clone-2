import { auth } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const DashboardPage = async () => {
	const session = await getServerSession(auth);
	
	return <div>DashboardPage</div>;
};

export default DashboardPage;
