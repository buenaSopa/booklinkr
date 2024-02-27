'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import Logo from './logo'
import Dropdown from '@/components/utils/dropdown'
import MobileMenu from './mobile-menu'
import { maely } from '@/lib/fonts'
import { site } from '@/config/site'
import { Button } from './button'

export default function Header() {

	const [top, setTop] = useState<boolean>(true)

	// detect whether user has scrolled the page down by 10px
	const scrollHandler = () => {
		window.pageYOffset > 10 ? setTop(false) : setTop(true)
	}

	useEffect(() => {
		scrollHandler()
		window.addEventListener('scroll', scrollHandler)
		return () => window.removeEventListener('scroll', scrollHandler)
	}, [top])

	return (
		<header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
			<div className="max-w-6xl mx-auto px-5 sm:px-6">
				<div className="flex items-center justify-between h-16 md:h-20">

					{/* Site branding */}
					<div className={`shrink-0 mr-4 ${maely.className} text-3xl`}>
						{/* <Logo /> */}
						<Link href={"/"}>
							{site.name}
						</Link>
					</div>

					{/* Desktop navigation */}
					<nav className="hidden md:flex md:grow">
						{/* Desktop sign in links */}
						<ul className="flex grow justify-end flex-wrap items-center">
							<li>
								<Button className={`text-lg ${maely.className} w-full sm:w-auto`}>
									Coming Soon
								</Button>
							</li>
							{/* <li> */}
							{/* 	<Button className={`text-lg ${maely.className} w-full sm:w-auto`}> */}
							{/* 		<Link href="/signin" className="transition duration-150 ease-in-out">Sign in</Link> */}
							{/* 	</Button> */}

							{/* </li> */}
							{/* <li> */}
							{/* 	<Button className={`text-lg ${maely.className} w-full sm:w-auto ml-3`}> */}
							{/* 		<Link href="/signup" className=""> */}
							{/* 			<span>Sign up</span> */}
							{/* 		</Link> */}
							{/* 	</Button> */}
							{/* </li> */}
						</ul>

					</nav>

					{/* <MobileMenu /> */}

				</div>
			</div>
		</header>
	)
}
