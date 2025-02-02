import './css/style.css'

import { Inter } from 'next/font/google'

import Header from '@/components/ui/header'
import Banner from '@/components/banner'
import { brush, simple } from '@/lib/fonts'
import { GoogleAnalytics } from '@next/third-parties/google'
import ogImage from "@/../public/images/opengraph-image.png"
import { auth } from '@/auth'
import SessionProvider from '@/components/SessionProvider'
import { AOSInit } from '@/lib/aos'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap'
})

export const metadata = {
	title: 'Booklinkr',
	description: 'Your personal online library for sharing',
	metadataBase: new URL("https://www.booklinkr.com/"),
	openGraph: {
		images: [
			{
				url: ogImage.src,
				width: ogImage.width,
				height: ogImage.height
			},
		],
	},
	twitter: {
		images: [
			{
				url: ogImage.src,
				width: ogImage.width,
				height: ogImage.height
			},
		]
	},
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await auth()
	return (
		<html lang="en">
			<AOSInit />
			<body className={`${simple.className} antialiased bg-lightbrown text-darkgreen tracking-tight`}>
				<SessionProvider session={session}>
					<div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
						{/* {JSON.stringify(session)} */}
						{children}
						{/* <Banner /> */}
					</div>
					<Toaster />
				</SessionProvider>
			</body>
			<GoogleAnalytics gaId='G-Y3ERXF2YTE' />
		</html>
	)
}
