import { Separator } from '@/components/ui/separator';
import SocialButton from '../_components/social.button';
import SignUpForm from './_components/sign-up.form';
import Link from 'next/link';
import Title from './_components/title';

const SignUpPage = () => {
	return (
		<div className='h-fit bg-card shadow-lg w-md rounded-lg'>
			<div className='p-6'>
				<Title />
				<SocialButton />
				<Separator className='my-6' />
				<SignUpForm />
			</div>
			<div className='bg-secondary py-6 rounded-lg text-center text-sm text-muted-foreground mt-4'>
				Already have an account?{' '}
				<Link href='/sign-in' className='text-primary hover:underline font-medium'>
					Sign In
				</Link>
			</div>
		</div>
	);
};

export default SignUpPage;
