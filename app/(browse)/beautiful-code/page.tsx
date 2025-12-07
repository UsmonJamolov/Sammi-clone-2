import { Separator } from '@/components/ui/separator';
import HighlightLanguage from './_components/highlight-language';
import Theme from './_components/theme';
import Filename from './_components/filename';
import Settings from './_components/settings';
import BackgroundColor from './_components/background-color';
import Editor from './_components/editor';
import Head from 'next/head';

const Page = () => {
	return (
		<>
			<Head>
				{/* eslint-disable-next-line @next/next/no-page-custom-font */}
				<link href='https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=PT+Mono&family=Red+Hat+Mono&family=Roboto+Mono&family=Source+Code+Pro&family=Space+Mono&display=swap'
					rel='stylesheet'/>
			</Head>
			<h1 className='text-2xl font-space-grotesk font-semibold'>Beautiful Code</h1>
			<Separator />

			<div className='grid grid-cols-4 gap-2 mt-4'>
				<HighlightLanguage />
				<Theme />
				<Filename />
				<Settings />
			</div>
			<div className='grid grid-cols-4 gap-2 mt-4'>
				<BackgroundColor />
				<Editor />
			</div>
		</>
	);
};

export default Page;