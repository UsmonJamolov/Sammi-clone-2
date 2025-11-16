import { Separator } from '@/components/ui/separator';
import SocialButton from '../_components/social.button';
import Link from 'next/link';
import SignInForm from './_components/sign-in.form';

const SignInPage = () => {
	return (
		<div className='h-fit bg-card shadow-lg w-md rounded-lg'>
			<div className='p-6'>
				<h1 className='text-xl font-space-grotesk font-semibold'>Sign in to Sammi</h1>
				<p className='text-sm text-muted-foreground'>Welcome back! Please sign in to continue</p>
				<SocialButton />
				<Separator className='my-6' />
				<SignInForm />
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

export default SignInPage;