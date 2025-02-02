"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "./button";
import { IconCopy, IconHome } from "@tabler/icons-react";
import { useToast } from "./use-toast";
import Link from "next/link";

export default function HeaderSlug({ shelf }: { shelf: string }) {
	const { toast } = useToast()


	return (
		<>
			<div className="flex bg-darkgreen text-lightbrown justify-between sm:px-10 py-3 items-center px-2">
				<div>
					<CopyToClipboard text={`booklinkr.com/${shelf}`}
						onCopy={() => {
							toast({
								duration: 3000,
								className: "text-2xl",
								description: "bookshelf copied",
							})
						}}>
						<Button className="text-2xl border-lightbrown text-darkgreen bg-lightbrown border-2 rounded-full gap-2 hover:text-lightbrown">
							{shelf}
							<IconCopy className="h-4 w-4" />
						</Button>
					</CopyToClipboard>
				</div>
				<div>
					<Link
						href={"/"}>
						<IconHome className="w-7 h-7" />
					</Link>
				</div>
			</div>
		</>
	)
}
