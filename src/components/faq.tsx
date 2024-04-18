import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"

export default function Faq() {
	return (

		<section>
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pb-8 md:pb-10 pt-16 md:pt-32">
					<div className="text-2xl text-center mb-5">Founder's note</div>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-2">
							<AccordionTrigger>Preface</AccordionTrigger>
							<AccordionContent>
								Hi, I'm Bryan, the sole founder of Booklinkr. The idea originated from conversations with friends who would often ask for book
								recommendations. I found myself repeatedly answering these queries, and it dawned on me that there should be a platform where
								people can share their book recommendations socially.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-1">
							<AccordionTrigger>Team and pricing</AccordionTrigger>
							<AccordionContent>
								This is a solo man project and I'm glad if it provides value to you as a user. I've to monetize this project to make it sustainable
								at least to support itself. I'll be testing some monetization method but existing user will be able to enjoy for free. New users can
								<a href="https://twitter.com/officialbkyh" className="underline" target="_blank">DM me</a> for discount code if they like the app but
								can't afford it. The end goal is still make it financially sustainable to prevent close down of Booklinkr.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>Problems</AccordionTrigger>
							<AccordionContent>
								I try to work on it every time I have free, but due to a lack of manpower, I can't find all the existing bugs. Here are a few though:<a className="font-bold">
									since I'm using a third-party API to retrieve books and cover images, if it's down, the cover image won't appear. Additionally, the results
									of the search query might be wrong at first, but if you add on the author name it should show u the right result</a> My apologies for any
								inconvenience, but I would also be grateful if you could let me know of any issues or bugs. I will fix them as soon as possible. You can contact me via
								<a href="mailto:bryankoh17102@gmail.com" className="underline" target="_blank"> email</a> or
								<a href="https://twitter.com/officialbkyh" className="underline" target="_blank"> Twitter </a>.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-5">
							<AccordionTrigger>Support</AccordionTrigger>
							<AccordionContent>
								If you want to update your link or any request, <a href="https://twitter.com/officialbkyh" className="underline" target="_blank"> DM me </a>.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-4">
							<AccordionTrigger>More</AccordionTrigger>
							<AccordionContent>
								Check out my <a href="https://lifeofamoh.substack.com/" className="underline" target="_blank">Substack</a>, I try to write blogs that help first time founder. Check out my <a href="https://twitter.com/officialbkyh" className="underline" target="_blank"> Twitter </a>to follow my journey of a indie dev if interested. Thanks :)
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</section>


	)
}
