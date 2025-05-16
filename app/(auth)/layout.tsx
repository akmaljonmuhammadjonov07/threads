import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import '../globals.css';

export const metadata = {
	title: 'Auth',
	description: 'A Next.js 15 Meta Threads Application',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
		>
			<html lang='en'>
				<body className={`bg-black`}>
					<div className='w-full flex justify-center items-center h-screen'>
						{children}
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
