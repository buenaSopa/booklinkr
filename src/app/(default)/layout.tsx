'use client'

import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

import Footer from '@/components/ui/footer'

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode
}) {

	useEffect(() => {
		AOS.init({
			once: true,
			disable: 'phone',
			duration: 700,
			easing: 'ease-out-cubic',
		})
	})

	return (
		<>
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
