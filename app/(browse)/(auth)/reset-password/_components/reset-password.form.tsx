'use client';

import { useResetPassword } from '../store/use-reset-password';
import Done from './done';
import EnterEmail from './enter-email';
import PasswordField from './password-field';
import VerifyEmail from './verify-email';

const ResetPasswordForm = () => {
	const { step } = useResetPassword();

	return (
		<>
			{step === 'enter-email' && <EnterEmail />}
			{step === 'verify-email' && <VerifyEmail />}
			{step === 'password-field' && <PasswordField />}
			{step === 'done' && <Done />}
		</>
	);
};

export default ResetPasswordForm;
