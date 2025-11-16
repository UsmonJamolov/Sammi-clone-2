'use server';

import { newCourses } from '@/lib/constants';

export const getCourseBySlug = async (slug: string) => {
	const course = newCourses.find(course => course.slug === slug);
	return course;
}