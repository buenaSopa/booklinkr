import Link from "next/link";
import { Button } from "./ui/button";
import { site } from "@/config/site";
import { maely } from "@/lib/fonts";

export default function Newsletter() {
	return (
		<section>
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pb-12 md:pb-20 pt-16 md:pt-32">

					{/* CTA box */}
					<div className="relative bg-darkgreen rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden flex" data-aos="zoom-y-out">

						{/* Background illustration */}
						<div className="relative flex flex-col lg:flex-row justify-between items-center">

							{/* CTA content */}
							<div className="text-center lg:text-left lg:max-w-xl">
								<h3 className="text-2xl text-lightbrown mb-2">Ready to dive into a world of endless reading possibilities?</h3>
								<p className=" text-lightbrown text-lg mb-6"> Join our waiting list now to be among the first to know anything related to BookLinkr update.</p>
								<Link href={site.formLink} target="_blank">
									<Button className={`text-2xl ${maely.className} w-full mb-4 sm:w-auto sm:mb-0 bg-lightbrown text-darkgreen hover:bg-warmgreen`}>
										Join waiting list
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
