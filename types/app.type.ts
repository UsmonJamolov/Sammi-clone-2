export type CourseType = {
	slug: string;
	title: string;
	thumbnail: string;
};

export type SourceCodeType = {
	_id: string;
	title: string;
	repositoryUrl: string;
};

export type UserType = {
	email: string;
	firstName: string;
	lastName: string;
	avatar: ImageType;
};

export type ImageType = {
	url: string;
	key: string;
}