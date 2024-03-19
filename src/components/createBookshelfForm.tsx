"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation';;

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createBookshelf } from "@/action/db"

const slugSchema = z
	.string()
	.trim() // Remove leading/trailing whitespace
	.regex(/^[a-z0-9]+(?:(?:-|_)+[a-z0-9]+)*$/, {
		message: "lowercase, numbers, hyphens and underscore in between",
	}).min(1, {
		message: "Link must be at least 1 characters.",
	}).max(24, {
		message: "Link must be within 24 characters"
	});

const formSchema = z.object({
	slug: slugSchema
})

export function CreateBookshelf({ userId }: { userId: string }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			slug: "",
		},
	})

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			const res = await createBookshelf(values.slug, userId)
			if (!res) {
				setError(true)
			} else {
				setError(false)
				startTransition(() => {
					// Refresh the current route and fetch new data from the server without
					// losing client-side browser or React state.
					router.refresh();
				});
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-1" >
					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem className="grow">
								<FormControl>
									<Input placeholder="Create your bookshelf link" {...field} />
								</FormControl>
								<FormMessage />
								<FormDescription>
									{error ? (
										<div className="text-red-500">
											name taken, try again
										</div>
									) : (
										<div>
											ex. lapin-rabbit, rabbit24, la_pin
										</div>
									)}
								</FormDescription>
							</FormItem>
						)}
					/>
					<Button type="submit">
						Submit
					</Button>
				</form>
			</Form>
		</>
	)
}
