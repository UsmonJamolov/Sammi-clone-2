import {
	certificationSchema,
	educationSchema,
	experienceSchema,
	languageSchema,
	profileSchema,
	projectSchema,
	skillSchema,
} from '@/lib/validation';
import z from 'zod';

export type Profile = z.infer<typeof profileSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Language = z.infer<typeof languageSchema>;
export type Certification = z.infer<typeof certificationSchema>;

export type Resume = {
	profile: Profile | undefined;
	experiences: Experience[];
	educations: Education[];
	skills: Skill[];
	projects: Project[];
	languages: Language[];
	certifications: Certification[];
	resumeId: string | null;
};

export type ResumeStore = Resume & {
	setProfile: (profileFieldName: string, profileFieldValue: string | number) => void;

	setExperiences: (experience: Experience) => void;
	updateExperience: (experienceId: string, experience: Experience) => void;
	setPositionsExperience: (experience: Experience[]) => void;
	deleteExperience: (experienceId: string) => void;

	setProjects: (project: Project) => void;
	setPositionsProject: (project: Project[]) => void;
	updateProject: (projectId: string, project: Project) => void;
	deleteProject: (projectId: string) => void;

	setEducations: (education: Education) => void;
	setPositionsEducation: (education: Education[]) => void;
	updateEducation: (educationId: string, education: Education) => void;
	deleteEducation: (educationId: string) => void;

	setSkills: (skill: Skill) => void;
	setPositionsSkill: (skill: Skill[]) => void;
	updateSkill: (skillId: string, skill: Skill) => void;
	deleteSkill: (skillId: string) => void;

	setLanguages: (language: Language) => void;
	setPositionsLanguage: (language: Language[]) => void;
	updateLanguage: (languageId: string, language: Language) => void;
	deleteLanguage: (languageId: string) => void;
};
