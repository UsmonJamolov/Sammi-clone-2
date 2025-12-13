'use client';

import { useSignUp } from '../store/use-sign-up';
import CompleteProfile from './complete-profile';
import Done from './done';
import PasswordField from './password-field';
import VerifyEmail from './verify-email';

const SignUpForm = () => {
	const { step } = useSignUp();

	return (
		<>
			{step === 'complete-profile' && <CompleteProfile />}
			{step === 'verify-email' && <VerifyEmail />}
			{step === 'password-field' && <PasswordField />}
			{step === 'done' && <Done />}
		</>
	);
};

export default SignUpForm;
