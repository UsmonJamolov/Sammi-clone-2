import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeStore } from './resume.types';

const defaultProfile = {
	id: 1,
	name: 'Omar Osman',
	email: 'info@sammi.ac',
	phone: '+998(90) 123-45-67',
	address: 'Tashkent, Uzbekistan',
	linkedin: 'https://www.linkedin.com/in/samarbadriddinov',
	github: 'https://github.com/samarbadriddin0v',
	website: 'https://www.sammi.ac',
	role: 'Software Engineer',
	summary:
		'Software Engineer with 3 years of experience in software development, testing, and maintenance. Proven ability to build high-performance, secure, data-driven applications with quality code. Proficient in a range of modern technologies including Python, JavaScript, and Java.',
	resumeIdentifier: '',
};

export const useResume = create<ResumeStore>()(
	persist(
		set => ({
			profile: defaultProfile,
			experiences: [],
			educations: [],
			skills: [],
			projects: [],
			languages: [],
			certifications: [],
			resumeId: null,
			setProfile: (profileFieldName, profileFieldValue) =>
				set(state => ({
					profile: {
						...state.profile,
						[profileFieldName]: profileFieldValue,
					} as ResumeStore['profile'],
				})),
			setExperiences: experience =>
				set(state => ({ experiences: [...state.experiences, experience] })),
			updateExperience: (experienceId, experience) =>
				set(state => ({
					experiences: state.experiences.map(exp =>
						exp.expId === experienceId ? experience : exp
					),
				})),
			setPositionsExperience: experience => set(() => ({ experiences: experience })),
			deleteExperience: experienceId =>
				set(state => ({
					experiences: state.experiences.filter(experience => experience.expId !== experienceId),
				})),
			setProjects: project =>
				set(state => ({
					projects: [...state.projects, project],
				})),
			setPositionsProject: project => set(() => ({ projects: project })),
			deleteProject: projectId =>
				set(state => ({
					projects: state.projects.filter(project => project.projectId !== projectId),
				})),
			updateProject: (projectId, project) =>
				set(state => ({
					projects: state.projects.map(pro => (pro.projectId === projectId ? project : pro)),
				})),
			setEducations: education => set(state => ({ educations: [...state.educations, education] })),
			setPositionsEducation: education => set(() => ({ educations: education })),
			deleteEducation: educationId =>
				set(state => ({
					educations: state.educations.filter(edu => edu.eduId !== educationId),
				})),
			updateEducation: (educationId, education) =>
				set(state => ({
					educations: state.educations.map(edu => (edu.eduId === educationId ? education : edu)),
				})),
			setSkills: skill =>
				set(state => ({
					skills: [...state.skills, skill],
				})),
			setPositionsSkill: skill => set(() => ({ skills: skill })),
			deleteSkill: skillId =>
				set(state => ({
					skills: state.skills.filter(skill => skill.skillId !== skillId),
				})),
			updateSkill: (skillId, skill) =>
				set(state => ({
					skills: state.skills.map(sk => (sk.skillId === skillId ? skill : sk)),
				})),
			setLanguages: language => set(state => ({ languages: [...state.languages, language] })),
			setPositionsLanguage: language => set(() => ({ languages: language })),
			updateLanguage: (languageId, language) =>
				set(state => ({
					languages: state.languages.map(lan => (lan.languageId === languageId ? language : lan)),
				})),
			deleteLanguage: languageId =>
				set(state => ({
					languages: state.languages.filter(language => language.languageId !== languageId),
				})),
		}),
		{ name: 'resume' }
	)
);
