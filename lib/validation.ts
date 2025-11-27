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

export const signInSchema = (needsPassword: boolean) =>
	z.object({
		email: z.string().email(),
		password: needsPassword ? z.string().min(8).max(100) : z.string().optional(),
	});

export const enterEmailSchema = z.object({
	email: z.string().email(),
});

export const createCourseSchema = z.object({
	title: z
		.string({ error: 'Title is required' })
		.min(5, { message: 'Title must be at least 5 characters long' })
		.max(100),
	slug: z
		.string({ error: 'Slug is required' })
		.min(5, { message: 'Slug must be at least 5 characters long' })
		.max(100)
		.trim()
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
			message: 'Slug can only contain lowercase letters, numbers, and hyphens',
		}),
	level: z.string({ error: 'Level is required' }),
	category: z.string({ error: 'Category is required' }),
});

export const overviewSchema = z.object({
	title: z
		.string({ error: 'Title is required' })
		.min(5, { message: 'Title must be at least 5 characters long' })
		.max(100),
	slug: z
		.string({ error: 'Slug is required' })
		.min(5, { message: 'Slug must be at least 5 characters long' })
		.max(100)
		.trim()
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
			message: 'Slug can only contain lowercase letters, numbers, and hyphens',
		}),
	level: z.string({ error: 'Level is required' }),
	category: z.string({ error: 'Category is required' }),
	excerpt: z.string({ error: 'Excerpt is required' }).max(500),
	forWhom: z.string({ error: 'This field is required' }).max(500),
	whatYouWillLearn: z.string({ error: 'This field is required' }).max(500),
	keywords: z
		.string({ error: 'Keywords are required' })
		.min(5, { message: 'Please enter at least one keyword' })
		.max(200, { message: 'Keywords must be less than 200 characters' }),
});

export const sectionSchema = z.object({
	title: z.string({ error: 'Title is required' }),
});

export const lessonSchema = z.object({
	title: z.string({ error: 'Title is required' }),
	content: z.string().optional(),
	videoId: z.string({ error: 'Video ID is required' }),
	minutes: z.string({ error: 'Minutes is required' }),
	hours: z.string({ error: 'Hours is required' }),
});

export const sourceCodeSchema = z.object({
	title: z.string({ error: 'Title is required' }).min(5).max(100),
	url: z.string({ error: 'URL is required' }).url('Invalid URL').max(200),
});