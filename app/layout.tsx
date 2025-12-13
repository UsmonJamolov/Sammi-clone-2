import type { Metadata } from 'next';
import { Geist, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme.provider';
import AuthProvider from '@/components/providers/auth.provider';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
	variable: '--font-space-grotesk',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Sammi',
	description: 'Sammi',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<html lang='en' suppressHydrationWarning={true}>
				<body className={`${geistSans.variable} ${spaceGrotesk.variable} antialiased`}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
						storageKey='sammi-theme'
					>
						{children}
						<Toaster position='top-right' />
					</ThemeProvider>
				</body>
			</html>
		</AuthProvider>
	);
}
