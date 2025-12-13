import { Github, Globe, Linkedin, Mail, Phone } from 'lucide-react';
import { useResume } from './_components/use-resume.store';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const MyResume = () => {
	const resumeData = useResume();

	return (
		<div className='w-[210mm] h-full mx-auto p-8 bg-white text-black shadow-lg overflow-hidden  leading-tight print:shadow-none'>
			<div className='flex flex-col h-full'>
				{/* Header */}
				<header className='mb-4'>
					<h1 className='text-3xl font-bold font-geist_mono'>{resumeData.profile?.name}</h1>
					<h2 className='text-2xl font-geist_mono'>{resumeData.profile?.role}</h2>
					<div className='flex items-center space-x-4'>
						<p className='text-lg'>{resumeData.profile?.address}</p>
						<div className='flex items-center space-x-5'>
							{resumeData.profile?.phone && (
								<a
									href={`tel:${resumeData.profile?.phone}`}
									className='flex items-center text-blue-600 hover:underline'
									target='_blank'
								>
									<Phone className='mr-1 h-4 w-4' /> {resumeData.profile?.phone}
								</a>
							)}
							{resumeData.profile?.email && (
								<a
									href={`mailto:${resumeData.profile?.email}`}
									className='flex items-center justify-center text-blue-600 hover:underline'
									target='_blank'
								>
									<Mail className='mr-1 h-4 w-4' /> {resumeData.profile?.email}
								</a>
							)}
						</div>
					</div>
					<div className='flex items-center space-x-5 mt-1'>
						{resumeData.profile?.linkedin && (
							<a
								href={resumeData.profile?.linkedin}
								className='flex items-center text-blue-600 hover:underline'
								target='_blank'
							>
								<Linkedin className='mr-1 h-4 w-4' /> LinkedIn
							</a>
						)}
						{resumeData.profile?.github && (
							<a
								href={resumeData.profile?.github}
								className='flex items-center text-blue-600 hover:underline'
								target='_blank'
							>
								<Github className='mr-1 h-4 w-4' /> Github
							</a>
						)}
						{resumeData.profile?.website && (
							<a
								href={resumeData.profile?.website}
								className='flex items-center text-blue-600 hover:underline'
								target='_blank'
							>
								<Globe className='mr-1 h-4 w-4' /> Website
							</a>
						)}
					</div>
					<p className='text-muted-foreground mt-2 text-sm'>{resumeData.profile?.summary}</p>
				</header>

				{/* Experiences */}
				{resumeData.experiences.length > 0 && (
					<section className='mb-3'>
						<h2 className='text-xl font-bold border-b border-gray-300 mb-1 uppercase'>
							Experience
						</h2>
						{resumeData.experiences.map(experience => (
							<div key={experience.expId} className='mb-2'>
								<div className='flex justify-between'>
									<h3 className='font-semibold text-lg'>{experience.company}</h3>
									<span className='text-sm'>
										{experience.startDate} - {experience.endDate || 'Present'}
									</span>
								</div>
								{experience.role && <p className='text-sm'>{experience.role}</p>}
								{experience.description && (
									<div className='text-xs w-full html-content'>
										{parse(DOMPurify.sanitize(experience.description))}
									</div>
								)}
							</div>
						))}
					</section>
				)}

				{/* Projects */}
				{resumeData.projects.length > 0 && (
					<section className='mb-3'>
						<h2 className='text-xl font-bold border-b border-gray-300 mb-1 uppercase'>Projects</h2>
						{resumeData.projects.map(project => (
							<div key={project.projectId} className='mb-2'>
								<div className='flex justify-between'>
									<h3 className='font-semibold text-lg'>{project.projectName}</h3>
								</div>
								<p className='italic text-sm'>
									{project.deploymentLink && (
										<a
											href={project.deploymentLink}
											className='text-blue-600 hover:underline'
											target='_blank'
										>
											{' '}
											Live Link{' '}
										</a>
									)}
									{project.repoLink && (
										<a
											href={project.repoLink}
											className='text-blue-600 hover:underline'
											target='_blank'
										>
											| Github Link{' '}
										</a>
									)}
								</p>
								{project.projectDescription && (
									<div className='text-xs w-full html-content'>
										{parse(DOMPurify.sanitize(project.projectDescription))}
									</div>
								)}
							</div>
						))}
					</section>
				)}

				{/* Education */}
				{resumeData.educations.length > 0 && (
					<section className='mb-3'>
						<h2 className='text-xl font-bold border-b border-gray-300 mb-2 uppercase'>Education</h2>
						{resumeData.educations.map((edu, index) => (
							<div key={index} className='mb-1'>
								<div className='flex justify-between'>
									<h3 className='font-semibold text-lg'>{edu.institutionName}</h3>
									<span className='text-sm'>
										{edu.startDate} - {edu.endDate || 'Present'}
									</span>
								</div>
								<p className='text-sm'>
									{edu.degree} - {edu.fieldOfStudy}
								</p>
								{edu.description && (
									<div className='text-xs w-full html-content'>
										{parse(DOMPurify.sanitize(edu.description))}
									</div>
								)}
							</div>
						))}
					</section>
				)}

				{/* Skills */}
				{resumeData.skills.length > 0 && (
					<section className='mb-2'>
						<h2 className='text-lg font-bold border-b border-gray-300 mb-1 uppercase'>Skills</h2>
						<div>
							{resumeData.skills.map(skill => (
								<p key={skill.skillId} className='text-sm'>
									<span className='font-semibold'>{skill.skillCategories}: </span>
									{skill.skillList}
								</p>
							))}
						</div>
					</section>
				)}

				{/* Languages */}
				{resumeData.languages.length > 0 && (
					<section className='mb-3'>
						<h2 className='text-lg font-bold border-b border-gray-300 mb-1 uppercase'>Languages</h2>
						<ul className='mb-2 list-disc pl-3 text-sm'>
							{resumeData.languages.map((certification, index) => (
								<li key={index}>
									{certification.languageName} - {certification.proficiency}
								</li>
							))}
						</ul>
					</section>
				)}
			</div>
		</div>
	);
};

export default MyResume;
