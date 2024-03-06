"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function HeaderSlug({ shelf }: { shelf: string }) {


	return (
		<>
			<div className="flex bg-darkgreen text-lightbrown justify-between sm:px-10 py-3 items-center px-2">
				<div>
					copy slug
				</div>
				<div>
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</>
	)
}
