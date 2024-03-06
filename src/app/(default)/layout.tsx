import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<>
			<Header />
			<main className="grow">
				{children}
			</main>

			{/* Temp Footer */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
					{/* Copyrights note */}
					<div className="text-sm text-gray-600 mr-4">&copy; Booklinkr.com. All rights reserved.</div>
				</div>
			</div>

			{/* <Footer /> */}
		</>
	)
}
