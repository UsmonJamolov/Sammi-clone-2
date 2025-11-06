import { z } from 'zod';

export const completeProfileSchema = z.object({
	email: z.string().email(),
	firstName: z.string().min(2, { message: 'First name is required' }).max(50),
	lastName: z.string().min(2, { message: 'Last name is required' }).max(50),
});

export const verifyEmailSchema = z.object({
	code: z
		.string()
		.min(6, { message: 'Code must be 6 digits' })
		.max(6, { message: 'Code must be 6 digits' })
		.regex(/^[0-9]{6}$/, { message: 'Code must be 6 digits' }),
});

export const passwordFieldSchema = z
	.object({
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long' })
			.max(100)
			.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
			.regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
			.regex(/[0-9]/, { message: 'Password must contain at least one number' })
			.regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});