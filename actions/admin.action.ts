'use server';

import { axiosClient } from '@/lib/http';
import { CourseType, LessonType, SectionType, SourceCodeType } from '@/types/app.type';
import { revalidatePath } from 'next/cache';

export const getCourse = async (courseId: string) => {
	const res = await axiosClient.get<{ data: CourseType }>(`/api/admin/get-course/${courseId}`);
	return res.data;
};
export const getCourses = async (type: 'course' | 'project') => {
	const res = await axiosClient.get<{ data: CourseType[] }>(`/api/admin/get-courses/${type}`);
	return res.data;
};
export const getSections = async (courseId: string) => {
	const res = await axiosClient.get(`/api/admin/get-sections/${courseId}`);
	return res.data;
};
export const getLessons = async (sectionId: string) => {
	const res = await axiosClient.get<{ data: LessonType[] }>(`/api/admin/get-lessons/${sectionId}`);
	return res.data;
};
export const getProjectLessons = async (courseId: string) => {
	const res = await axiosClient.get<{ data: LessonType[] }>(
		`/api/admin/get-project-lessons/${courseId}`
	);
	return res.data;
};
export const getSourceCodes = async () => {
	const res = await axiosClient.get<{ data: SourceCodeType[] }>('/api/admin/get-source-codes');
	return res.data;
};

export const createCourse = async (data: Partial<CourseType>) => {
	const res = await axiosClient.post('/api/admin/create-course', data);
	revalidatePath('/admin/courses');
	revalidatePath('/admin/projects');
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
export const createLesson = async (data: Partial<LessonType>) => {
	const res = await axiosClient.post(`/api/admin/create-lesson`, data);
	revalidatePath(`/admin/courses/${data.course}`);
	return res.data;
};
export const createProjectLesson = async (data: Partial<LessonType>) => {
	const res = await axiosClient.post(`/api/admin/create-project-lesson`, {
		...data,
		courseId: data.course,
	});
	revalidatePath(`/admin/projects/${data.course}`);
	return res.data;
};
export const createSourceCode = async (data: Partial<SourceCodeType>) => {
	const res = await axiosClient.post('/api/admin/create-source-code', data);
	revalidatePath('/admin/source-codes');
	return res.data;
};

export const updateCourse = async (courseId: string, data: Partial<CourseType>) => {
	const res = await axiosClient.put(`/api/admin/update-course/${courseId}`, data);
	revalidatePath(`/admin/courses/${courseId}`);
	revalidatePath(`/admin/projects/${courseId}`);
	return res.data;
};
export const updateSection = async (sectionId: string, data: Partial<SectionType>) => {
	const res = await axiosClient.put(`/api/admin/update-section/${sectionId}`, data);
	revalidatePath(`/admin/courses/${data.course}`);
	return res.data;
};
export const updateLesson = async (lessonId: string, data: Partial<LessonType>) => {
	const res = await axiosClient.put(`/api/admin/update-lesson/${lessonId}`, data);
	revalidatePath(`/admin/courses/${data.course}`);
	revalidatePath(`/admin/projects/${data.course}`);
	return res.data;
};
export const uploadPreviewImage = async (courseId: string, formData: FormData) => {
	const res = await axiosClient.put(`/api/admin/upload-preview-image/${courseId}`, formData);
	revalidatePath(`/admin/courses/${courseId}`);
	revalidatePath(`/admin/projects/${courseId}`);
	return res.data;
};
export const updateSourceCode = async (sourceCodeId: string, data: Partial<SourceCodeType>) => {
	const res = await axiosClient.put(`/api/admin/update-source-code/${sourceCodeId}`, data);
	revalidatePath('/admin/source-codes');
	return res.data;
};

export const deleteCourse = async (courseId: string) => {
	const res = await axiosClient.delete(`/api/admin/delete-course/${courseId}`);
	revalidatePath('/admin/courses');
	revalidatePath('/admin/projects');
	return res.data;
};
export const deleteSection = async (sectionId: string, courseId: string) => {
	const res = await axiosClient.delete(`/api/admin/delete-section/${sectionId}`);
	revalidatePath(`/admin/courses/${courseId}`);
	return res.data;
};
export const deleteLesson = async (lessonId: string, courseId: string) => {
	const res = await axiosClient.delete(`/api/admin/delete-lesson/${lessonId}`);
	revalidatePath(`/admin/courses/${courseId}`);
	return res.data;
};
export const deleteProjectLesson = async (lessonId: string, courseId: string) => {
	const res = await axiosClient.delete(`/api/admin/delete-project-lesson/${lessonId}`);
	revalidatePath(`/admin/projects/${courseId}`);
	return res.data;
};
export const deleteSourceCode = async (sourceCodeId: string) => {
	const res = await axiosClient.delete(`/api/admin/delete-source-code/${sourceCodeId}`);
	revalidatePath('/admin/source-codes');
	return res.data;
};
