'use server';

import { axiosClient } from '@/lib/http';
import { CourseType, SourceCodeType } from '@/types/app.type';

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