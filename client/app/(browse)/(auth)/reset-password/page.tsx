import { Separator } from '@/components/ui/separator';
import SocialButton from '../_components/social.button';
import Link from 'next/link';
import Title from './_components/title';
import ResetPasswordForm from './_components/reset-password.form';

const Page = () => {
	return (
		<div className='h-fit bg-card shadow-lg w-md rounded-lg'>
			<div className='p-6'>
				<Title />
				<SocialButton />
				<Separator className='my-6' />
				<ResetPasswordForm />
			</div>
			<div className='bg-secondary py-6 rounded-lg text-center text-sm text-muted-foreground mt-4'>
				Don't have an account?{' '}
				<Link href='/sign-up' className='text-primary hover:underline font-medium'>
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default Page;