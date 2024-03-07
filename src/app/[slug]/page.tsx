import AddButton from "@/components/addButton"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header"
import HeaderSlug from "@/components/ui/header-slug"

export default function Page({ params }: { params: { slug: string } }) {



	return (
		<section className="text-2xl">
			<HeaderSlug shelf={params.slug} />
			<div className="">
				My Post: {params.slug}
			</div>
			<AddButton />
		</section>

	)
}
