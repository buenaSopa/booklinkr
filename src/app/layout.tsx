import './css/style.css'

import { Inter } from 'next/font/google'

import Header from '@/components/ui/header'
import Banner from '@/components/banner'
import { brush } from '@/lib/fonts'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap'
})

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`${brush.className} antialiased bg-lightbrown text-darkgreen tracking-tight`}>
				<div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
					<Header />
					{children}
					{/* <Banner /> */}
				</div>
			</body>
			<GoogleAnalytics gaId='G-Y3ERXF2YTE' />
		</html>
	)
}
