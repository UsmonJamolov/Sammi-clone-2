'use client';

import { useSignUp } from '../store/use-sign-up';

const Title = () => {
	const { step, user } = useSignUp();

	if (step === 'complete-profile') {
		return (
			<>
				<h1 className='text-xl font-space-grotesk font-semibold'>Create your account</h1>
				<p className='text-sm text-muted-foreground'>
					Welcome! Please fill in the details to get started.
				</p>
			</>
		);
	}

	if (step === 'verify-email') {
		return (
			<>
				<h1 className='text-xl font-space-grotesk font-semibold'>Verify Email</h1>
				<p className='text-muted-foreground text-xs leading-4'>
					We have sent a 4 digits code to your email address{' '}
					<span className='font-medium text-primary'>({user?.email})</span>. Please check your inbox
					and enter the code below.
				</p>
			</>
		);
	}

	if (step === 'password-field') {
		return (
			<>
				<h1 className='text-xl font-space-grotesk font-semibold'>Set a password</h1>
				<p className='text-sm text-muted-foreground'>
					Create a strong password to secure your account.
				</p>
			</>
		);
	}

	if (step === 'done') {
		return (
			<>
				<h1 className='text-xl font-space-grotesk font-semibold'>All done!</h1>
				<p className='text-sm text-muted-foreground'>
					Your account has been successfully created. You can now sign in and start using our
					services.
				</p>
			</>
		);
	}
};

export default Title;