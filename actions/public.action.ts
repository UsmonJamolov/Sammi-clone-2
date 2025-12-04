'use server';

import { axiosClient } from '@/lib/http';
import { CourseType, LessonType, SectionType, SourceCodeType } from '@/types/app.type';

type HomePageData = {
	data: { courses: CourseType[]; projects: CourseType[]; sourceCodes: SourceCodeType[] };
};
export const getHomePageData = async () => {
	const res = await axiosClient.get<HomePageData>('/api/get-home-page');
	return res.data;
};
export const getCourses = async () => {
	const res = await axiosClient.get<{ data: CourseType[] }>('/api/courses');
	return res.data;
};
export const getCourseBySlug = async (slug: string) => {
	const res = await axiosClient.get<{ data: CourseType }>(`/api/courses/${slug}`);
	return res.data;
};
export const getProjects = async () => {
	const res = await axiosClient.get<{ data: CourseType[] }>('/api/projects');
	return res.data;
};
export const getProjectBySlug = async (slug: string) => {
	const res = await axiosClient.get<{ data: CourseType }>(`/api/projects/${slug}`);
	return res.data;
};
export const getSourceCodes = async () => {
	const res = await axiosClient.get<{ data: SourceCodeType[] }>('/api/source-codes');
	return res.data;
};
export const getCurriculumByCourseId = async (courseId: string) => {
	const res = await axiosClient.get<{ data: SectionType[] }>(`/api/curriculum-course/${courseId}`);
	return res.data;
};
export const getCurriculumByProjectId = async (projectId: string) => {
	const res = await axiosClient.get<{ data: LessonType[] }>(`/api/curriculum-project/${projectId}`);
	return res.data;
};
export const getReviewsData = async (slug: string, limit: number) => {
	const res = await axiosClient.get(`/api/reviews-data/${slug}?limit=${limit}`);
	return res.data;
};