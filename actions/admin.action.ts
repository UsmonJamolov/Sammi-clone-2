'use server';

import { axiosClient } from '@/lib/http';
import { CourseType } from '@/types/app.type';
import { revalidatePath } from 'next/cache';

export const getCourse = async (courseId: string) => {
	const res = await axiosClient.get<{ data: CourseType }>(`/api/admin/get-course/${courseId}`);
	return res.data;
};
export const getCourses = async () => {
	const res = await axiosClient.get<{ data: CourseType[] }>('/api/admin/get-courses');
	return res.data;
};

export const createCourse = async (data: Partial<CourseType>) => {
	const res = await axiosClient.post('/api/admin/create-course', data);
	revalidatePath('/admin/courses');
	return res.data;
};

export const updateCourse = async (courseId: string, data: Partial<CourseType>) => {
	const res = await axiosClient.put(`/api/admin/update-course/${courseId}`, data);
	revalidatePath(`/admin/courses/${courseId}`);
	return res.data;
};

export const deleteCourse = async (courseId: string) => {
	const res = await axiosClient.delete(`/api/admin/delete-course/${courseId}`);
	revalidatePath('/admin/courses');
	return res.data;
};