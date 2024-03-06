import Header from "@/components/ui/header"
import HeaderSlug from "@/components/ui/header-slug"

export default function Page({ params }: { params: { slug: string } }) {
	return (
		<section className="text-2xl">
			<HeaderSlug params={"fkkc"}/>
			<div>My Post: {params.slug}</div>
		</section>

	)
}
