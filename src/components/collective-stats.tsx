import { getTotalBookCount, getTotalBookshelfCount } from "@/action/db";
import { IconCarrot, IconConfetti, IconInfinity } from "@tabler/icons-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

export default async function CollectiveStats() {

	const total_books_count = await getTotalBookCount()
	const total_bookshelves_count = await getTotalBookshelfCount()


	return (
		<section>
			<div className="w-full mx-auto px-4 sm:px-6">
				<div className="py-12 md:py-20">

					<div className="max-w-3xl text-center pb-12 flex mx-auto ">
						<div className="mx-auto flex gap-3">
							<IconCarrot />
							<p className="text-xl text-darkgreen">Booklinkr community stats </p>
							<IconCarrot />
						</div>
					</div>

					<div className="max-w-sm mx-auto grid gap-6 md:grid-cols-3 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none">
						<Card className="bg-darkgreen text-lightbrown text-center">
							<CardHeader>
								<CardTitle>{total_books_count}</CardTitle>
								<p>Total Books Added</p>
							</CardHeader>
						</Card>
						<Card className="bg-darkgreen text-lightbrown text-center">
							<CardHeader>
								<CardTitle>{total_bookshelves_count}</CardTitle>
								<p>Total Bookshelves</p>
							</CardHeader>
						</Card>
						<Card className="bg-darkgreen text-lightbrown text-center">
							<CardHeader>
								<CardTitle><IconInfinity className="mx-auto" /></CardTitle>
								<p>Loves for Books</p>
							</CardHeader>
						</Card>
						<Card className="bg-darkgreen text-lightbrown text-center">
							<CardHeader>
								<CardTitle>{1}</CardTitle>
								<p>Hard-working Lapin</p>
							</CardHeader>
						</Card>
					</div>

					<div className="max-w-3xl text-center pt-12 flex mx-auto ">
						<div className="mx-auto flex gap-3">
							<IconConfetti />
							<p className="text-xl text-darkgreen">Help us grow</p>
							<IconConfetti />
						</div>
					</div>


					{/* <div className="relative bg-darkgreen rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden flex" data-aos="zoom-y-out"> */}

					{/* </div> */}
				</div>
			</div>
		</section>
	)
}
