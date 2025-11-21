'use server';

import { axiosClient } from '@/lib/http';
import { CourseType, SectionType } from '@/types/app.type';
import { revalidatePath } from 'next/cache';

export const getCourse = async (courseId: string) => {
	const res = await axiosClient.get<{ data: CourseType }>(`/api/admin/get-course/${courseId}`);
	return res.data;
};
export const getCourses = async () => {
	const res = await axiosClient.get<{ data: CourseType[] }>('/api/admin/get-courses');
	return res.data;
};
export const getSections = async (courseId: string) => {
	const res = await axiosClient.get(`/api/admin/get-sections/${courseId}`);
	return res.data;
};

export const createCourse = async (data: Partial<CourseType>) => {
	const res = await axiosClient.post('/api/admin/create-course', data);
	revalidatePath('/admin/courses');
	return res.data;
};
export const createSection = async (data: Partial<SectionType>) => {
	const res = await axiosClient.post(`/api/admin/create-section`, {
		title: data.title,
		courseId: data.course,
	});
	revalidatePath(`/admin/courses/${data.course}`);
	return res.data;
};

export const updateCourse = async (courseId: string, data: Partial<CourseType>) => {
	const res = await axiosClient.put(`/api/admin/update-course/${courseId}`, data);
	revalidatePath(`/admin/courses/${courseId}`);
	return res.data;
};
export const updateSection = async (sectionId: string, data: Partial<SectionType>) => {
	const res = await axiosClient.put(`/api/admin/update-section/${sectionId}`, data);
	revalidatePath(`/admin/courses/${data.course}`);
	return res.data;
};

export const deleteCourse = async (courseId: string) => {
	const res = await axiosClient.delete(`/api/admin/delete-course/${courseId}`);
	revalidatePath('/admin/courses');
	return res.data;
};
export const deleteSection = async (sectionId: string, courseId: string) => {
	const res = await axiosClient.delete(`/api/admin/delete-section/${sectionId}`);
	revalidatePath(`/admin/courses/${courseId}`);
	return res.data;
};