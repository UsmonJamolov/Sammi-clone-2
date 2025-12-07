import { BsFiletypeJson } from 'react-icons/bs';
import { FaCss3, FaHtml5, FaJava, FaMarkdown, FaPython, FaRust } from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import { SiCplusplus, SiJavascript, SiMysql, SiPhp, SiTypescript, SiYaml } from 'react-icons/si';
import { PiFileCSharp } from 'react-icons/pi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import {
	dracula,
	monokai,
	solarizedDark,
	solarizedLight,
	githubLight,
	materialLight,
	sublime,
	nord,
} from '@uiw/codemirror-themes-all';
import tinycolor from 'tinycolor2';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { go } from '@codemirror/lang-go';
import { sql } from '@codemirror/lang-sql';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { markdown } from '@codemirror/lang-markdown';
import { json } from '@codemirror/lang-json';
import { yaml } from '@codemirror/lang-yaml';

export const highlightLanguages = [
	{ icon: SiJavascript, label: 'JavaScript' },
	{ icon: FaPython, label: 'Python' },
	{ icon: FaJava, label: 'Java' },
	{ icon: SiCplusplus, label: 'C++' },
	{ icon: PiFileCSharp, label: 'C#' },
	{ icon: SiTypescript, label: 'TypeScript' },
	{ icon: FaHtml5, label: 'HTML' },
	{ icon: FaCss3, label: 'CSS' },
	{ icon: FaGolang, label: 'Go' },
	{ icon: SiMysql, label: 'SQL' },
	{ icon: SiPhp, label: 'PHP' },
	{ icon: FaRust, label: 'Rust' },
	{ icon: FaMarkdown, label: 'Markdown' },
	{ icon: BsFiletypeJson, label: 'JSON' },
	{ icon: SiYaml, label: 'YAML' },
];

export const themes = [
	{ icon: MdDarkMode, label: 'Dracula', span: 'Dark', value: 'dracula-dark' },
	{ icon: MdDarkMode, label: 'Monokai', span: 'Dark', value: 'monokai-dark' },
	{
		icon: MdDarkMode,
		label: 'Solarized',
		span: 'Dark',
		value: 'solarized-dark',
	},
	{
		icon: MdLightMode,
		label: 'Solarized',
		span: 'Light',
		value: 'solarized-light',
	},
	{ icon: MdLightMode, label: 'GitHub', span: 'Light', value: 'github-light' },
	{
		icon: MdLightMode,
		label: 'Material',
		span: 'Light',
		value: 'material-light',
	},
	{
		icon: MdLightMode,
		label: 'Sublime Text',
		span: 'Light',
		value: 'sublime-text-light',
	},
	{ icon: MdDarkMode, label: 'Nord', span: 'Dark', value: 'nord-dark' },
];

export const fontMap: Record<string, string> = {
	'OS default': 'monospace',
	'Roboto Mono': "'Roboto Mono', monospace",
	'Source Code Pro': "'Source Code Pro', monospace",
	'Space Mono': "'Space Mono', monospace",
	'PT Mono': "'PT Mono', monospace",
	'JetBrains Mono': "'JetBrains Mono', monospace",
	'Red Hat Mono': "'Red Hat Mono', monospace",
};

export const fontSizeOptions = [
	{ label: '12px', value: 12 },
	{ label: '13px', value: 13 },
	{ label: '14px', value: 14 },
	{ label: '15px', value: 15 },
	{ label: '16px', value: 16 },
	{ label: '17px', value: 17 },
	{ label: '18px', value: 18 },
	{ label: '19px', value: 19 },
	{ label: '20px', value: 20 },
];

export const tabSizeOptions = [
	{ label: '2 spaces', value: 2 },
	{ label: '3 spaces', value: 3 },
	{ label: '4 spaces', value: 4 },
	{ label: '5 spaces', value: 5 },
	{ label: '6 spaces', value: 6 },
];

export const backgroundTypes = [
	{ label: 'Solid', value: 'solid' },
	{ label: 'Gradient', value: 'gradient' },
	{ label: 'Image (Ready-to-use)', value: 'image' },
	{ label: 'No background', value: 'none' },
];

export const gradientColors = [
	{ label: 'Warm flame', value: 'warm-flame' },
	{ label: 'Night fade', value: 'night-fade' },
	{ label: 'Spring warmth', value: 'spring-warmth' },
	{ label: 'Juicy peach', value: 'juice-peach' },
	{ label: 'Young passion', value: 'young-passion' },
	{ label: 'Lady lips', value: 'lady-laps' },
	{ label: 'Sunny morning', value: 'sunny-morning' },
	{ label: 'Rainy ashville', value: 'rainy-ashville' },
	{ label: 'Frozen dreams', value: 'frozen-dreams' },
	{ label: 'Winter neva', value: 'winter-neva' },
	{ label: 'Dusty grass', value: 'dusty-grass' },
	{ label: 'Tempting azure', value: 'tempting-azure' },
];

export const imageBackgrounds = [
	{
		label: 'Abstract v1',
		value: 'abstract-v1',
		images:
			'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Abstract v2',
		value: 'abstract-v2',
		images:
			'https://images.unsplash.com/photo-1636955825879-488411f3277f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Abstract v3',
		value: 'abstract-v3',
		images:
			'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Abstract v4',
		value: 'abstract-v4',
		images:
			'https://images.unsplash.com/photo-1556691421-cf15fe27a0b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Abstract v5',
		value: 'abstract-v5',
		images:
			'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},

	{
		label: 'Desk v1',
		value: 'desk-v1',
		images:
			'https://images.unsplash.com/photo-1629317422263-9317e911014a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Desk v2',
		value: 'desk-v2',
		images:
			'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Desk v3',
		value: 'desk-v3',
		images:
			'https://images.unsplash.com/photo-1518665750801-883c188a660d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Desk v4',
		value: 'desk-v4',
		images:
			'https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Desk v5',
		value: 'desk-v5',
		images:
			'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},

	{
		label: 'Code v1',
		value: 'code-v1',
		images:
			'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Code v2',
		value: 'code-v2',
		images:
			'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Code v3',
		value: 'code-v3',
		images:
			'https://images.unsplash.com/photo-1592609931095-54a2168ae893?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},

	{
		label: 'Leaves v1',
		value: 'leaves-v1',
		images:
			'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Leaves v2',
		value: 'leaves-v2',
		images:
			'https://images.unsplash.com/photo-1485134532658-d720895a3b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
	{
		label: 'Leaves v3',
		value: 'leaves-v3',
		images:
			'https://images.unsplash.com/photo-1479046934034-119c613579a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100',
	},
];

export function getThemeByValue(value: string) {
	switch (value) {
		case 'dracula-dark':
			return dracula;
		case 'monokai-dark':
			return monokai;
		case 'solarized-dark':
			return solarizedDark;
		case 'solarized-light':
			return solarizedLight;
		case 'github-light':
			return githubLight;
		case 'material-light':
			return materialLight;
		case 'sublime-text-light':
			return sublime;
		case 'nord-dark':
			return nord;
		default:
			return dracula;
	}
}

export function getThemeFilenameBackground(value: string): string {
	const baseColor = themeBackgrounds[value] || '#1e1e1e';

	const isDark = tinycolor(baseColor).isDark();

	return isDark
		? tinycolor(baseColor).lighten(8).toString()
		: tinycolor(baseColor).darken(5).toString();
}

export function getThemeBackgroundColor(value: string): string {
	return themeBackgrounds[value] || '#1e1e1e';
}

export function getTextColor(value: string): string {
	const baseColor = themeBackgrounds[value] || '#1e1e1e';

	const isDark = tinycolor(baseColor).isDark();

	return isDark ? '#ffffff' : '#000000';
}

const themeBackgrounds: Record<string, string> = {
	'dracula-dark': '#282a36',
	'dracula-light': '#f8f8f2',
	'monokai-dark': '#272822',
	'solarized-dark': '#002b36',
	'solarized-light': '#fdf6e3',
	'night-owl-dark': '#011627',
	'github-light': '#ffffff',
	'cobalt2-dark': '#193549',
	'material-light': '#fafafa',
	'pochi-light': '#f7f3ed',
	'sublime-text-light': '#ffffff',
	'nord-dark': '#2e3440',
	'oceanic-next-dark': '#304148',
};

export function getExtensionByLabel(label: string) {
	switch (label) {
		case 'JavaScript':
			return javascript();
		case 'TypeScript':
			return javascript({ typescript: true });
		case 'Python':
			return python();
		case 'Java':
			return java();
		case 'C++':
			return cpp();
		case 'C#':
			return cpp();
		case 'HTML':
			return html();
		case 'CSS':
			return css();
		case 'Go':
			return go();
		case 'SQL':
			return sql();
		case 'PHP':
			return php();
		case 'Rust':
			return rust();
		case 'Markdown':
			return markdown();
		case 'JSON':
			return json();
		case 'YAML':
			return yaml();
		default:
			return javascript();
	}
}