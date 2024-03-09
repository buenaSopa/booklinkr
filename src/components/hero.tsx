import VideoThumb from '@/../public/images/hero-image.png'
import ModalVideo from '@/components/modal-video'
import { brush, cavier, maely } from '@/lib/fonts'
import Balancer from 'react-wrap-balancer'
import { Button } from './ui/button'
import Image from 'next/image'
import { site } from '@/config/site'
import Link from 'next/link'
import { auth } from '@/auth'
import { useEffect } from 'react'
import { checkBookshelfExist, getUserSlug } from '@/action/db'
import { CreateBookshelf } from './createBookshelfForm'

export default async function Hero() {

	const session = await auth()
	const user_slug = await getUserSlug(session?.user?.id)

	return (
		<section className="relative">

			{/* Illustration behind hero content */}
			{/* <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true"> */}
			{/* 	<svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg"> */}
			{/* 		<defs> */}
			{/* 			<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01"> */}
			{/* 				<stop stopColor="#FFF" offset="0%" /> */}
			{/* 				<stop stopColor="#EAEAEA" offset="77.402%" /> */}
			{/* 				<stop stopColor="#DFDFDF" offset="100%" /> */}
			{/* 			</linearGradient> */}
			{/* 		</defs> */}
			{/* 		<g fill="url(#illustration-01)" fillRule="evenodd"> */}
			{/* 			<circle cx="1232" cy="128" r="128" /> */}
			{/* 			<circle cx="155" cy="443" r="64" /> */}
			{/* 		</g> */}
			{/* 	</svg> */}
			{/* </div> */}

			<div className="max-w-6xl mx-auto px-4 sm:px-6">

				{/* Hero content */}
				<div className="pt-32 pb-12 md:pt-32 md:pb-20">

					{/* Section header */}
					<div className={`text-center pb-12 md:pb-16 ${brush.className}`}>
						<h1 className="text-3xl md:text-3xl leading-tighter tracking-tighter mb-4 font-thin" data-aos="zoom-y-out">
							<Balancer>
								With
								<span className='text-darkbrown'> Booklinkr</span>
								, you can compile all your favorite books into
								<span className='text-darkbrown'> one convenient link</span>
								, making it simple to share your reading recommendations with friends, family, and fellow book lovers.
							</Balancer>

						</h1>
						<div className="max-w-3xl mx-auto">
							<p className={`text-xl text-gray-600 mb-8 ${maely.className}`} data-aos="zoom-y-out" data-aos-delay="150">
								Share your recommended reads with
								{/* ONE LINK */}
								<span className="text-darkbrown"> Booklinkr</span>
							</p>


							<div className={`mx-auto w-fit mb-8 ${brush.className}`} data-aos="zoom-y-out" data-aos-delay="200">
								<div className='relative h-[175px] w-[120px]' data-aos="zoom-y-out" data-aos-delay="250">
									<Image src={"/images/lapin-green.png"} fill alt='cover' />
								</div>
								Lapin the Librarian
							</div>

							<div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
								{/* <Link href={site.formLink} target='_blank'> */}
								{/* 	<Button className={`text-2xl ${maely.className} w-full mb-4 sm:w-auto sm:mb-0`}> */}
								{/* 		Join waiting list */}
								{/* 	</Button> */}
								{/* </Link> */}
								{
									!session ? (
										<Link href='/api/auth/signin'>
											<Button className={`text-2xl ${maely.className} w-full mb-4 sm:w-auto sm:mb-0`}>
												Sign In
											</Button>
										</Link>) : (await checkBookshelfExist(session.user?.id) ? (
											<Link href={`/${user_slug}`}>
												<Button className={`text-2xl ${maely.className} w-full mb-4 sm:w-auto sm:mb-0`}>
													Go to your page
												</Button>
											</Link>
										) : (
											<div className='md:w-1/2'>
												<CreateBookshelf userId={session.user?.id} />
											</div>
										)
									)
								}

								{/* <Button className={`text-2xl ${maely.className} w-full sm:w-auto sm:ml-4`}> */}
								{/* 	Learn More */}
								{/* </Button> */}
							</div>
						</div>
					</div>

					{/* Hero image */}
					{/* <ModalVideo */}
					{/* 	thumb={VideoThumb} */}
					{/* 	thumbWidth={768} */}
					{/* 	thumbHeight={432} */}
					{/* 	thumbAlt="Modal video thumbnail" */}
					{/* 	video="/videos/video.mp4" */}
					{/* 	videoWidth={1920} */}
					{/* 	videoHeight={1080} /> */}

				</div>

			</div >
		</section >
	)
}
