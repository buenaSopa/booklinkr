import { getBookRandom, getSlugSortByBook } from "@/action/db"
import { IconBook } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";


type BookData = {
	title: string;
	cover_url: string;
	work_key: string;
};

function transformImageURL(originalURL: string): string {
	// Replace "-L.jpg" with "-S.jpg" to transform the URL
	const transformedURL = originalURL.replace("-M.jpg", "-S.jpg");
	return transformedURL;
}

function splitIntoThreeLists(data: BookData[]): [BookData[], BookData[], BookData[]] {
	const numLists = 3;

	// Sort the data by the 'num_book' value (descending order) to distribute larger entries first

	// Initialize three empty lists to hold the split data
	const list1: BookData[] = [];
	const list2: BookData[] = [];
	const list3: BookData[] = [];

	// Round-robin assignment to distribute elements evenly across the three lists
	for (let i = 0; i < data.length; i++) {
		if (i % numLists === 0) {
			list1.push(data[i]);
		} else if (i % numLists === 1) {
			list2.push(data[i]);
		} else {
			list3.push(data[i]);
		}
	}

	return [list1, list2, list3];
}

export default async function DiscoverBook() {
	const books = await getBookRandom()
	// @ts-ignore
	const lists = splitIntoThreeLists(books);

	// console.log(lists)

	const marque = (item: BookData) => {
		return (
			<Link
				href={`https://openlibrary.org${item.work_key}`}
				target="_blank">
				<div className='relative h-[175px] w-[120px] mx-auto'>
					<Image src={item.cover_url} fill alt='cover' />
				</div>
			</Link>
		)
	}


	// console.log(list1, list2, list3)
	return (
		<section className="relative bg-lightbrown">
			<div className="relative max-w-6xl mx-auto px-4 sm:px-6">
				<div className="py-12 md:py-20">

					<div className="max-w-3xl mx-auto text-center">
						<p className="text-xl text-darkgreen">Discover Books</p>
					</div>

					{
						lists.map((list) => {
							return (
								<div className='mb-16'>
									<div className="relative w-full p-16  overflowx-hidden">
										<div className="flex absolute left-0 animate-marquee3">
											{list.map((item) => {
												return (
													marque(item)
												)
											})}
											{list.map((item) => {
												return (
													marque(item)
												)
											})}
										</div>
									</div>
								</div>

							)
						})
					}


				</div>
			</div>
		</section>
	)
}
