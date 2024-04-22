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
						<h1 className="text-3xl md:text-3xl leading-tighter tracking-tighter mb-2 font-thin" data-aos="zoom-y-out">
							For Book Readers who {' '}
							<Balancer>
							Love Sharing
							</Balancer>
						</h1>

						<p className={`mb-10 text-lg ${simple.className}`} data-aos="zoom-y-out" data-aos-delay="150">
							<Balancer>
								Compile all your favorite books into
							</Balancer>
							<Link href={"https://www.booklinkr.com/bryan-the-founder"} target="_blank" ><span className='text-darkbrown hover:text-darkgreen'> one link</span></Link>
						</p>

						<div className="max-w-3xl mx-auto">
							{/* <div className={`mx-auto w-fit mb-16 ${simple.className} `} data-aos="zoom-y-out" data-aos-delay="200"> */}
							{/* 	<div className='relative h-[175px] w-[120px] animate-bounce mx-auto' data-aos="zoom-y-out" data-aos-delay="250"> */}
							{/* 		<Image src={"/images/lapin-green.png"} fill alt='cover' /> */}
							{/* 	</div> */}
							{/* 	Lapin the Librarian */}
							{/* </div> */}

							<ModalVideo
								thumb={VideoThumb}
								thumbWidth={768}
								thumbHeight={432}
								thumbAlt="Modal video thumbnail"
								video="/videos/video.mp4"
								videoWidth={1920}
								videoHeight={1080} />


							<div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center mt-16" data-aos="zoom-y-out" data-aos-delay="300">
								{/* <Link href={site.formLink} target='_blank'> */}
								{/* 	<Button className={`text-2xl ${maely.className} w-full mb-4 sm:w-auto sm:mb-0`}> */}
								{/* 		Join waiting list */}
								{/* 	</Button> */}
								{/* </Link> */}

								{
									!session ? (
										<div className='flex flex-col'>
											<div className='relative mb-2'>
												<Link href='/api/auth/signin'>
													<Button className={`text-2xl ${maely.className} w-full sm:w-auto sm:mb-0 bg-darkbrown text-lightbrown hover:bg-darkgreen`}>
														Create Bookshelf
													</Button>
												</Link>
											</div>
											<Link href='https://www.booklinkr.com/bryan-the-founder'
												target='_blank'>
												<Button className={`text-2xl ${maely.className} w-full sm:w-auto sm:mb-0 bg-darkgreen text-lightbrown`}>
													Example
												</Button>
											</Link>
										</div>
									)
										: (await checkBookshelfExist(session.user?.id!) ? (
											<div className='relative'>
												<Link href={`/${user_slug}`}>
													<Button className={`text-2xl ${maely.className} w-full sm:w-auto sm:mb-0 bg-darkbrown text-lightbrown hover:bg-darkgreen`}>
														Your Page
													</Button>
												</Link>
												{/* <IconClick color='#FEFAE0' className='absolute bottom-1 right-1 sm:hidden' /> */}
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


				</div>

			</div >
		</section >
	)
}
