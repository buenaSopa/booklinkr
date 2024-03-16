import VideoThumb from '@/../public/images/hero-image.png'
import ModalVideo from '@/components/modal-video'
import { brush, cavier, maely, simple } from '@/lib/fonts'
import Balancer from 'react-wrap-balancer'
import { Button } from './ui/button'
import Image from 'next/image'
import { site } from '@/config/site'
import Link from 'next/link'
import { auth } from '@/auth'
import { useEffect } from 'react'
import { checkBookshelfExist, getUserSlug } from '@/action/db'
import { CreateBookshelf } from './createBookshelfForm'
import { IconClick } from '@tabler/icons-react'

export default async function Hero() {

	const session = await auth()
	const user_slug = await getUserSlug(session?.user?.id!)

	return (
		<section className="relative">

			<div className="max-w-6xl mx-auto px-4 sm:px-6">

				{/* Hero content */}
				<div className="pt-32 pb-12 md:pt-32 md:pb-20">

					{/* Section header */}
					<div className={`text-center pb-12 md:pb-16 ${simple.className}`}>
						<h1 className="text-3xl md:text-3xl leading-tighter tracking-tighter mb-16 font-thin" data-aos="zoom-y-out">
							<Balancer>
								With
								<span className='text-darkbrown'> Booklinkr</span>
								, you can compile all your favorite books into
								<span className='text-darkbrown'> one convenient link</span>
								, making it simple to share your reading recommendations with friends, family, and fellow book lovers.
							</Balancer>
						</h1>
						<div className="max-w-3xl mx-auto">
							{/* <p className={`text-xl text-gray-600 mb-8 ${maely.className}`} data-aos="zoom-y-out" data-aos-delay="150"> */}
							{/* 	Share your recommended reads with */}
							{/* 	<span className="text-darkbrown"> Booklinkr</span> */}
							{/* </p> */}


							<div className={`mx-auto w-fit mb-8 ${simple.className}`} data-aos="zoom-y-out" data-aos-delay="200">
								<div className='relative h-[175px] w-[120px] animate-bounce' data-aos="zoom-y-out" data-aos-delay="250">
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
										<div className='relative'>
											<Link href='/api/auth/signin'>
												<Button className={`text-2xl ${maely.className} w-full sm:w-auto sm:mb-0 bg-darkgreen`}>
													Create Your Bookshelf	!!
												</Button>
											</Link>
											<IconClick color='#FEFAE0' className='absolute bottom-1 right-1 sm:hidden' />
										</div>
									)
										: (await checkBookshelfExist(session.user?.id!) ? (
											<div className='relative'>
												<Link href={`/${user_slug}`}>
													<Button className={`text-2xl ${maely.className} w-full sm:w-auto sm:mb-0 bg-darkgreen`}>
														Go to your page
													</Button>
												</Link>
												<IconClick color='#FEFAE0' className='absolute bottom-1 right-1 sm:hidden' />
											</div>
										) : (
											<div className='md:w-1/2'>
												<CreateBookshelf userId={session.user?.id!} />
											</div>
										)
										)
								}
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
