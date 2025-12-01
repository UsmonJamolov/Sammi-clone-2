'use server';

import { newCourses } from '@/lib/constants';
import { generateToken } from './user.action';
import { axiosClient } from '@/lib/http';

export const getCourseBySlug = async (slug: string) => {
	const course = newCourses.find(course => course.slug === slug);
	return course;
};

export const enrollment = async (slug: string) => {
	const token = await generateToken();
	const res = await axiosClient.post(
		'/api/course/enrollment',
		{ slug },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	return res.data;
};

export const getCourseData = async (slug: string) => {
	const token = await generateToken();
	const res = await axiosClient.get(`/api/course/dashboard/course/data/${slug}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.data;
};

export const getCourseCurriculum = async (slug: string) => {
	const token = await generateToken();
	const res = await axiosClient.get(`/api/course/dashboard/course/curriculum/${slug}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.data;
};

export const getLessonDetails = async (lessonId: string) => {
	const token = await generateToken();
	const res = await axiosClient.get(`/api/course/lesson/${lessonId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.data;
};