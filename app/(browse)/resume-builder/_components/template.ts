import { Education, Experience, Language, Profile, Project, Skill } from './resume.types';

export const generateResumeTemplate = (
	profile: Profile,
	experiences: Experience[],
	projects: Project[],
	educations: Education[],
	skills: Skill[],
	languages: Language[]
) => {
	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>${profile.name} - Resume</title>
				<script src="https://cdn.tailwindcss.com"></script>
				<link
					href="https://fonts.googleapis.com/css2?family=Geist+Sans&family=Geist+Mono&display=swap"
					rel="stylesheet"
				/>
				<style>
					body, html, #root, * {
						font-family: 'Geist Sans', sans-serif;
					}
					.font-geist_mono {
						font-family: 'Geist Mono', monospace;
					}
					.prose ul {
						list-style-type: disc;
						padding-left: 1.5rem;
					}
					.prose ol {
						list-style-type: decimal;
						padding-left: 1.5rem;
					}
				</style>
			</head>
			<body>
				<div
					class="w-[210mm] h-[297mm] mx-auto px-8 bg-white text-black shadow-lg overflow-hidden text-base leading-tight print:shadow-none"
				>
					<div class="flex flex-col h-full">
						<header class="mb-4">
							<h1 class="text-3xl font-bold font-geist_mono">${profile.name}</h1>
							<h2 class="text-2xl font-geist_mono">${profile.role}</h2>
							<div class='flex items-center space-x-4'>
								<p class="text-lg mt-1.5">${profile.address}</p>
								<div class='flex items-center space-x-5 mt-1'>
									${
										profile.phone &&
										`<a href="tel:${profile.phone}" class="flex items-center text-blue-600 hover:underline">${profile.phone}</a>`
									}
									${
										profile.email &&
										`<a href="mailto:${profile.email}" class="flex items-center text-blue-600 hover:underline">${profile.email}</a>`
									}
								</div>
							</div>
							<div class="flex items-center space-x-5">
								${
									profile.linkedin &&
									`<a href="${profile.linkedin}" class="flex items-center text-blue-600 hover:underline"> <span class='mt-4'>${svgIcons.linkedin}</span> LinkedIn</a>`
								}
								${
									profile.github &&
									`<a href="${profile.github}" class="flex items-center text-blue-600 hover:underline"> <span class='mt-4'>${svgIcons.github}</span> Github</a>`
								}
								${
									profile.website &&
									`<a href="${profile.website}" class="flex items-center text-blue-600 hover:underline"><span class='mt-4'>${svgIcons.globe}</span>Website</a>`
								}
							</div>
							<p class="mt-1 text-sm">
								${profile.summary}
							</p>
						</header>

						${
							experiences.length > 0
								? `
								<section class="mb-3 w-full">
									<h2 class="text-2xl font-bold border-b mb-1 uppercase font-geist_mono pb-2">
										Experience
									</h2>
									${experiences
										.map(
											experience =>
												`
												<div class='mb-2'>
													<div class='flex justify-between'>
														<h3 class='font-semibold text-lg'>
															${experience.company}
														</h3>
														<span class='text-sm'>${experience.startDate} - ${experience.endDate || 'Present'}</span>
													</div>
													${experience.role && `<p class='text-sm'>${experience.role}</p>`}	
													${
														experience.description &&
														`<div class='text-xs w-full prose mt-2 max-w-full'>
															${experience.description}
														</div>`
													}
												</div>
											`
										)
										.join('')}
								</section>
							`
								: ''
						}

						${
							projects.length > 0
								? `
								<section class="mb-3">
									<h2 class="text-2xl font-bold border-b mb-1 uppercase font-geist_mono pb-2">
										Projects
									</h2>
									${projects
										.map(
											project =>
												`
												<div class='mb-2'>
													<h3 class='font-semibold text-lg'>
														${project.projectName}
													</h3>
													<p class='italic text-sm'>
														${
															project.deploymentLink &&
															`<a href=${project.deploymentLink} class='text-blue-600 hover:underline' target='_blank'>Live Link</a>`
														}
														${
															project.repoLink &&
															`<a href=${project.repoLink} class='text-blue-600 hover:underline' target='_blank'>| Github Link</a>`
														}
													</p>
													${
														project.projectDescription &&
														`<div class='text-xs w-full prose mt-2 max-w-full'>
															${project.projectDescription}
														</div>`
													}
												</div>
											`
										)
										.join('')}
								</section>
							`
								: ''
						}

						${
							educations.length > 0
								? `
								<section class="mb-3">
									<h2 class="text-2xl font-bold border-b mb-1 uppercase font-geist_mono pb-2">
										Education
									</h2>
									${educations
										.map(
											education =>
												`
												<div class='mb-2'>
													<div class='flex justify-between'>
														<h3 class='font-semibold text-lg'>
															${education.institutionName}
														</h3>
														<span class='text-sm'>${education.startDate} - ${education.endDate || 'Present'}</span>
													</div>
													<p class='text-sm'>${education.degree} - ${education.fieldOfStudy}</p>
													${
														education.description &&
														`<div class='text-xs w-full prose mt-2 max-w-full'>
															${education.description}
														</div>`
													}
												</div>
											`
										)
										.join('')}
								</section>
							`
								: ''
						}

						${
							skills.length > 0
								? `
								<section class="mb-3">
									<h2 class="text-2xl font-bold border-b mb-1 uppercase font-geist_mono pb-2">
										Skills
									</h2>
									${skills
										.map(
											skill =>
												`
												<div class='text-sm'>
													<span class='font-semibold'>${skill.skillCategories}: </span>
													${skill.skillList}
												</div>
											`
										)
										.join('')}
								</section>
							`
								: ''
						}

						${
							languages.length > 0
								? `
								<section class="mb-3">
									<h2 class="text-2xl font-bold border-b mb-1 uppercase font-geist_mono pb-2">
										Languages
									</h2>
									<div class='prose text-sm'>
										<ul>
											${languages.map(langauge => `<li>${langauge.languageName} - ${langauge.proficiency}</li>`).join('')}
										</ul>
									</div>
								</section>
							`
								: ''
						}
					</div>
				</div>
				<script>
				
				</script>
			</body>
		</html>
	`;
};

const svgIcons = {
	phone: ` <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="mr-1 h-4 w-4"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>`,

	mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 h-4 w-4"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,

	linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 h-4 w-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,

	github: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,

	globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 h-4 w-4"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
};
