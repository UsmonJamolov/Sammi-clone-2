'use client';

import { useResetPassword } from '../store/use-reset-password';

const Title = () => {
	const { step, email } = useResetPassword();

	if (step === 'enter-email') {
		return (
			<>
				<h1 className='text-xl font-space-grotesk font-semibold'>Reset Password</h1>
				<p className='text-sm text-muted-foreground'>
					Enter your email address below and we'll send you a 4 digits code to reset your password.
				</p>
			</>
		);
	}

	if (step === 'verify-email') {
		return (
			<>
				<h1 className='text-xl font-space-grotesk font-semibold'>Verify your email</h1>
				<p className='text-sm text-muted-foreground'>
					We have sent a 6-digit verification code to your email{' '}
					<span className='font-medium text-primary'>{email}</span>
				</p>
			</>
		);
	}

	if (step === 'password-field') {
		return (
			<>
				<h1 className='text-xl font-space-grotesk font-semibold'>Set New Password</h1>
				<p className='text-sm text-muted-foreground'>
					Your new password must be different from previous used passwords.
				</p>
			</>
		);
	}

	if (step === 'done') {
		return (
			<>
				<h1 className='text-xl font-space-grotesk font-semibold'>Password Reset Successful</h1>
				<p className='text-sm text-muted-foreground'>
					You can now use your new password to log in.
				</p>
			</>
		);
	}
};

export default Title;