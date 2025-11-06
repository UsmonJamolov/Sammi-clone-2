import { z } from 'zod';

export const completeProfileSchema = z.object({
	email: z.string().email(),
	firstName: z.string().min(2, { message: 'First name is required' }).max(50),
	lastName: z.string().min(2, { message: 'Last name is required' }).max(50),
});