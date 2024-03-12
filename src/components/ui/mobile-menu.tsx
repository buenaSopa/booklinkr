'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { Button } from './button'

export default function MobileMenu() {
	const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

	const trigger = useRef<HTMLButtonElement>(null)
	const mobileNav = useRef<HTMLDivElement>(null)

	// close the mobile menu on click outside
	useEffect(() => {
		const clickHandler = ({ target }: { target: EventTarget | null }): void => {
			if (!mobileNav.current || !trigger.current) return;
			if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
			setMobileNavOpen(false)
		};
		document.addEventListener('click', clickHandler)
		return () => document.removeEventListener('click', clickHandler)
	})

	// close the mobile menu if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: { keyCode: number }): void => {
			if (!mobileNavOpen || keyCode !== 27) return;
			setMobileNavOpen(false)
		};
		document.addEventListener('keydown', keyHandler)
		return () => document.removeEventListener('keydown', keyHandler)
	})

	const { data: session, status } = useSession()


	return (
		<div className="flex">
			{/* Hamburger button */}
			<button
				ref={trigger}
				className={`hamburger ${mobileNavOpen && 'active'}`}
				aria-controls="mobile-nav"
				aria-expanded={mobileNavOpen}
				onClick={() => setMobileNavOpen(!mobileNavOpen)}
			>
				<span className="sr-only">Menu</span>
				<svg className="w-6 h-6 fill-current text-gray-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<rect y="4" width="24" height="2" />
					<rect y="11" width="24" height="2" />
					<rect y="18" width="24" height="2" />
				</svg>
			</button>

			{/*Mobile navigation */}
			<div ref={mobileNav}>
				<Transition
					show={mobileNavOpen}
					as="nav"
					id="mobile-nav"
					className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white"
					enter="transition ease-out duration-200 transform"
					enterFrom="opacity-0 -translate-y-2"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease-out duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<ul className="px-5 py-2">
						<li className='text-center m-2'>
							{!session ? (
								<Button>
									<Link href="/api/auth/signin" className="flex font-medium w-full py-2 justify-center"
										onClick={() => setMobileNavOpen(false)}>
										Sign in
									</Link>
								</Button>
							) : (
								<Button>
									<Link href="/api/auth/signout" className="flex font-medium w-full py-2 justify-center"
										onClick={() => setMobileNavOpen(false)}>
										Sign out
									</Link>
								</Button>
							)
							}
						</li>

						<li className='text-center m-2'>
							<Link href={"https://docs.google.com/document/d/1Uoi9QvFdPp3j6WkdDU3Xp4CbjdLkf8FYzDwCPx1ImYw/edit?usp=sharing"} target='_blank'>
								<Button>
									Product Roadmap
								</Button>
							</Link>
						</li>

						<li className='text-center m-2'>
							<Link href={"https://twitter.com/officialbkyh"}>
								<Button>
									Support: dm me on x
								</Button>
							</Link>
						</li>
					</ul>
				</Transition>
			</div>
		</div>
	)
}
