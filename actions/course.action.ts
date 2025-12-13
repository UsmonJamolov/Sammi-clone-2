'use server';

import { newCourses } from '@/lib/constants';
import { generateToken } from './user.action';
import { axiosClient } from '@/lib/http';
import { revalidatePath } from 'next/cache';

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

export const getProjectData = async (slug: string) => {
	const token = await generateToken();
	const res = await axiosClient.get(`/api/course/dashboard/project/data/${slug}`, {
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

export const getProjectCurriculum = async (slug: string) => {
	const token = await generateToken();
	const res = await axiosClient.get(`/api/course/dashboard/project/curriculum/${slug}`, {
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

export const completeLesson = async (slug: string, currentLessonId: string) => {
	const token = await generateToken();
	const res = await axiosClient.post(
		`/api/course/course/next-lesson`,
		{ courseId: slug, currentLessonId },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	return res.data;
};

export const completeProjectLesson = async (slug: string, currentLessonId: string) => {
	const token = await generateToken();
	const res = await axiosClient.post(
		`/api/course/project/next-lesson`,
		{ courseId: slug, currentLessonId },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	return res.data;
};

export const createNote = async (lessonId: string, content: string) => {
	const token = await generateToken();
	const res = await axiosClient.post(
		`/api/course/notes`,
		{ lessonId, content },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	revalidatePath('/curriculum/[slug]');
	return res.data;
};

export const getNotes = async (lessonId: string) => {
	const token = await generateToken();
	const res = await axiosClient.get(`/api/course/notes/${lessonId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.data;
};

export const deleteNote = async (noteId: string) => {
	const token = await generateToken();
	const res = await axiosClient.delete(`/api/course/notes/${noteId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	revalidatePath('/curriculum/[slug]');
	return res.data;
};

export const createReview = async (slug: string, rating: number, comment: string) => {
	const token = await generateToken();
	const res = await axiosClient.post(
		`/api/course/review`,
		{ courseId: slug, rating, comment },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	return res.data;
};

export const getReview = async (slug: string) => {
	const token = await generateToken();
	const res = await axiosClient.get(`/api/course/review/${slug}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.data;
};

export const getDashboardCourses = async () => {
	const token = await generateToken();
	const res = await axiosClient.get('/api/course/dashboard', {
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.data;
};

export const resetCourseProgress = async (courseId: string) => {
	const token = await generateToken();
	const res = await axiosClient.post(
		`/api/course/dashboard/course/reset`,
		{ courseId },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	revalidatePath('/dashboard');
	return res.data;
};
