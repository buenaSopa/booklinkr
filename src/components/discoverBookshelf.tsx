import { getSlugSortByBook } from "@/action/db"
import { IconBook } from "@tabler/icons-react";
import Link from "next/link";


type BookData = {
	slug: string;
	num_book: string;
};

function splitIntoThreeLists(data: BookData[]): [BookData[], BookData[], BookData[]] {
	const numLists = 3;

	// Sort the data by the 'num_book' value (descending order) to distribute larger entries first
	const sortedData = data.sort((a, b) => parseInt(b.num_book, 10) - parseInt(a.num_book, 10));

	// Initialize three empty lists to hold the split data
	const list1: BookData[] = [];
	const list2: BookData[] = [];
	const list3: BookData[] = [];

	// Round-robin assignment to distribute elements evenly across the three lists
	for (let i = 0; i < sortedData.length; i++) {
		if (i % numLists === 0) {
			list1.push(sortedData[i]);
		} else if (i % numLists === 1) {
			list2.push(sortedData[i]);
		} else {
			list3.push(sortedData[i]);
		}
	}

	return [list1, list2, list3];
}

export default async function DiscoverBookshelf() {
	const slugs = await getSlugSortByBook()
	// @ts-ignore
	const lists = splitIntoThreeLists(slugs);

	const marque = (item: BookData) => {
		return (
			<Link
				target="_blank"
				className="text-xl mx-4"
				href={`https://www.booklinkr.com/${item.slug}`}>
				{item.slug}
				<span className="text-darkgreen">
					-
				</span>
				<span className="text-darkbrown">
					{item.num_book}
					{/* <IconBook /> */}
				</span>
				{/* <div className="text-darkbrown"> */}
				{/* </div> */}
			</Link>

		)
	}


	// console.log(list1, list2, list3)
	return (
		<section className="relative bg-darkgreen">
			<div className="relative max-w-6xl mx-auto px-4 sm:px-6">
				<div className="py-12 md:py-20">

					<div className="max-w-3xl mx-auto text-center pb-12 ">
						<p className="text-xl text-lightbrown">Discover Bookshelves</p>
					</div>


					{
						lists.map((list) => {
							return (
								<div className="relative flex overflow-x-hidden">
									<div className="py-4 animate-marquee whitespace-nowrap text-white">
										{
											list.map((item) => {
												return (
													marque(item)
												)
											})
										}
									</div>
									<div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap text-white">
										{
											list.map((item) => {
												return (
													marque(item)
												)
											})
										}
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
