'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { getNotebyBookonBookshelf, updateNotebyBookonBookshelf } from "@/action/db"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const FormSchema = z.object({
	note: z
		.string()
		.max(1200, {
			message: "Note must be below 1200",
		}),
})

type NoteTextAreaProp = {
	bookId: string
	bookshelfId: string
	isUserBookshelf: boolean
};


export const BookCardNoteTextArea: React.FC<NoteTextAreaProp> = ({ bookId, bookshelfId, isUserBookshelf }) => {

	const [note, setNote] = useState("")

	useEffect(() => {
		(async () => {
			console.log('calling note')
			const res = await getNotebyBookonBookshelf(bookId, bookshelfId)
			form.setValue("note", res?.extra.note);
		})()
	}, [])

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { note: note }
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "Updated",
			// description: (
			// 	<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
			// 		<code className="text-white">{JSON.stringify(data, null, 2)}</code>
			// 	</pre>
			// ),
		})
		await updateNotebyBookonBookshelf(bookId, bookshelfId, data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="note"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder="Note for this book"
									className="h-[400px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{isUserBookshelf &&
					<Button type="submit">Submit</Button>
				}
			</form>
		</Form>
	)
}

