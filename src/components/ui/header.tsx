'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import Logo from './logo'
import Dropdown from '@/components/utils/dropdown'
import MobileMenu from './mobile-menu'
import { maely } from '@/lib/fonts'
import { site } from '@/config/site'
import { Button } from './button'
import { useSession } from "next-auth/react"
import { IconCarrot } from '@tabler/icons-react'

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

	const { data: session, status } = useSession()

	return (
		<header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
			<div className="max-w-6xl mx-auto px-5 sm:px-6">
				<div className="flex items-center justify-between h-16 md:h-20">

					{/* Site branding */}
					<div className={`shrink-0 mr-4 ${maely.className} text-3xl`}>
						{/* <Logo /> */}
						<Link href={"/"} className='flex items-center'>
							{site.name}
							<IconCarrot />
						</Link>
					</div>

					{/* Desktop navigation */}
					{/* <nav className="hidden md:flex md:grow"> */}
						{/* Desktop sign in links */}
					{/* 	<ul className="flex grow justify-end flex-wrap items-center"> */}
					{/* 		<li> */}
					{/* 		{!session ? ( */}
					{/* 			<Link href="/api/auth/signin" className="transition duration-150 ease-in-out"> */}
					{/* 				<Button className={`text-lg ${maely.className} w-full sm:w-auto`}> */}
					{/* 					Sign in */}
					{/* 				</Button> */}
					{/* 			</Link> */}
					{/* 			) : ( */}
					{/* 			<Link href="/api/auth/signout" className="transition duration-150 ease-in-out"> */}
					{/* 				<Button className={`text-lg ${maely.className} w-full sm:w-auto`}> */}
					{/* 					Sign Out */}
					{/* 				</Button> */}
					{/* 			</Link> */}
					{/* 			) */}
					{/* 		} */}

					{/* 		</li> */}
					{/* 	</ul> */}

					{/* </nav> */}

					<MobileMenu />

				</div>
			</div>
		</header>
	)
}
