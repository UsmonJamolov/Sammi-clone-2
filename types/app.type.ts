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
	enrollmentCount: number

	previewImage: string;
	previewVideo: string;

	duration: string;
	lessonCount: number;

	thumbnail: string;

	rating: number;
	reviewsCount: number;
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
	isCompleted: boolean;
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

export type NoteType = {
	_id: string;
	lessonId: string;
	content: string;
};

export type ReviewType = {
	_id: string;
	user: UserType;
	course: string | CourseType;
	rating: number;
	comment: string;
	createdAt: string;
};