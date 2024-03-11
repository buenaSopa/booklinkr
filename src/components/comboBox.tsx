import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { ScrollArea } from './ui/scroll-area'
import Image from 'next/image'
import { Book } from '@/types/book'

export type ComboBoxItemType = {
	value: string
	url?: string
	label: string
	book: Book
}


type ComboboxProps = {
	value?: string
	onSelect: (value: Book) => void
	items: ComboBoxItemType[]
	searchPlaceholder?: string
	noResultsMsg?: string
	selectItemMsg?: string
	className?: string
	unselect?: boolean
	unselectMsg?: string
	loading: boolean
	onSearchChange?: (e: string) => void
}

const popOverStyles = {
	width: 'var(--radix-popover-trigger-width)'
}

export function Combobox({
	value,
	onSelect,
	items,
	searchPlaceholder = 'Book Name',
	noResultsMsg = 'No Result',
	selectItemMsg = 'Search Book Name',
	className,
	unselect = false,
	unselectMsg = 'None',
	loading = false,
	onSearchChange
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false)

	const handleOnSearchChange = useDebouncedCallback((e: string) => {
		if (e === '') {
			return
		}

		if (onSearchChange) {
			onSearchChange(e)
		}
	}, 900)

	return (
		<Popover open={open} onOpenChange={setOpen} modal={true}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className={cn('justify-between text-xl', className)}
				>
					{selectItemMsg}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				style={popOverStyles}
				className='p-0 popover-content-width-same-as-its-trigger'
			>
				<Command>
					<CommandInput
						className='text-xl'
						placeholder={searchPlaceholder}
						onValueChange={handleOnSearchChange}
					/>
					<ScrollArea className='max-h-[420px] overflow-auto'>
						<CommandEmpty >
							{
								!loading ? noResultsMsg :
									<div className='flex flex-col gap-2'>
										<div
											className="inline-block mx-auto h-6 w-6 animate-spin rounded-full border-4 border-solid border-darkgreen border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
											role="status">
											<span
												className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
											>Loading...</span>
										</div>
										Pls wait while Lapin is fetching the books<br />
										Might take awhile :)
									</div>
							}
						</CommandEmpty>
						<CommandGroup>
							{items.map(item => (
								<CommandItem
									key={item.value}
									value={item.label}
									onSelect={currentValue => {
										onSelect(
											currentValue === item.label.toLowerCase()
												? item.book
												: ''
										)
										setOpen(false)
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === item.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{item.label}
									<div className='relative h-[50px] w-[35px] ml-5' data-aos="zoom-y-out" data-aos-delay="250">
										<Image src={item.url} fill alt='cover' />
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</ScrollArea>
				</Command>
			</PopoverContent>
		</Popover >
	)
}
