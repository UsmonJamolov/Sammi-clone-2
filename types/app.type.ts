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

	previewImage: ImageType;

	thumbnail: string;
};

export type SourceCodeType = {
	_id: string;
	title: string;
	repositoryUrl: string;
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