import {
	backgroundTypes,
	gradientColors,
	highlightLanguages,
	imageBackgrounds,
	themes,
} from './constants';

export function getLanguageByLabel(label: string) {
	const language = highlightLanguages.find(item => item.label === label);
	return language ? language : highlightLanguages[0];
}

export function getThemeByLabel(label: string) {
	const theme = themes.find(item => item.value === label);
	return theme ? theme : themes[0];
}

export function getBgTypeByLabel(label: string) {
	const bgType = backgroundTypes.find(item => item.value === label);
	return bgType ? bgType : backgroundTypes[0];
}

export function getGradientByLabel(label: string) {
	const gradient = gradientColors.find(item => item.value === label);
	return gradient ? gradient : gradientColors[0];
}

export function getImageByLabel(label: string) {
	const image = imageBackgrounds.find(item => item.value === label);
	return image ? image : imageBackgrounds[0];
}