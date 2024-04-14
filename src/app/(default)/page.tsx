export const metadata = {
	title: 'BookLinkr',
	description: 'Cultivate your love for reading with BookLinkr - the ultimate platform for sharing and discovering your favorite books. Easily curate your personalized digital bookshelf and share it with friends, family, and fellow book enthusiasts. Join our vibrant community, explore curated book recommendations, and connect with like-minded readers.',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import FeaturesBlocks from '@/components/features-blocks'
import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import Image from 'next/image'
import { auth } from '@/auth'
import CollectiveStats from '@/components/collective-stats'
import Faq from '@/components/faq'
import DiscoverBookshelf from '@/components/discoverBookshelf'
import DiscoverBook from '@/components/discoverBook'

export default async function Home() {
	const session = await auth()

	return (
		<>
			<Hero />
			<DiscoverBookshelf />
			<DiscoverBook />
			{/* <Features /> */}
			<CollectiveStats />
			<FeaturesBlocks />
			<Faq />
			{/* <Testimonials /> */}
			{/* <Newsletter /> */}
		</>
	)
}
