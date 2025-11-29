export type CourseType = {
	_id: string;
	title: string;
	slug: string;
	level: string;
	category: string;
	excerpt: string;
	forWhom: string;
	whatYouWillLearn: string;
	keywords: string;
	isPublished: boolean;
	type: string;
	createdAt: string;

	previewImage: string;
	previewVideo: string;

	duration: string;
	lessonCount: number;

	thumbnail: string;
};

export type SectionType = {
	title: string;
	position: number;
	course: string | CourseType;
	lessons: LessonType[];
	_id: string;
};

export type LessonType = {
	title: string;
	position: number;
	content: string;
	videoId: string;
	hours: string;
	minutes: string;
	sectionId: string | SectionType;
	course: string | CourseType;
	_id: string;
};

export type SourceCodeType = {
	_id: string;
	title: string;
	url: string;
};

export type UserType = {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	avatar: ImageType;
};

export type ImageType = {
	url: string;
	key: string;
};