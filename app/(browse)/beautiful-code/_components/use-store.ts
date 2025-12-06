import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
	language: string;
	setLanguage: (language: string) => void;
	theme: string;
	setTheme: (theme: string) => void;
	filename: string;
	setFilename: (filename: string) => void;
	font: string;
	setFont: (font: string) => void;
	fontSize: string;
	setFontSize: (fontSize: string) => void;
	tabSize: string;
	setTabSize: (tabSize: string) => void;
	lineNumber: boolean;
	setLineNumber: (lineNumber: boolean) => void;
	foldGutter: boolean;
	setFoldGutter: (foldGutter: boolean) => void;
	backgroundType: string;
	setBackgroundType: (backgroundType: string) => void;
	color: string;
	setColor: (color: string) => void;
	gradient: string;
	setGradient: (gradient: string) => void;
	image: string;
	setImage: (image: string) => void;
};

export const useStore = create<Store>()(
	persist(
		set => ({
			language: 'JavaScript',
			setLanguage: language => set({ language }),
			theme: 'dracula-dark',
			setTheme: theme => set({ theme }),
			filename: '',
			setFilename: filename => set({ filename }),
			font: 'JetBrains Mono',
			setFont: font => set({ font }),
			fontSize: '14',
			setFontSize: fontSize => set({ fontSize }),
			tabSize: '2',
			setTabSize: tabSize => set({ tabSize }),
			lineNumber: true,
			setLineNumber: lineNumber => set({ lineNumber }),
			foldGutter: true,
			setFoldGutter: foldGutter => set({ foldGutter }),
			backgroundType: 'gradient',
			setBackgroundType: backgroundType => set({ backgroundType }),
			color: '#cf54cc',
			setColor: color => set({ color }),
			gradient: 'spring-warmth',
			setGradient: gradient => set({ gradient }),
			image: 'abstract-v1',
			setImage: image => set({ image }),
		}),
		{ name: 'beautiful-code-store' }
	)
);