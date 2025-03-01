'use client'
import { cn } from '@/lib'
import { IClassName } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface Props extends IClassName {}
const CloseButton: FC<Props> = ({ className }) => {
	const router = useRouter()
	return (
		<button
			onClick={() => {
				router.push('/home')
			}}
			className={cn(
				'relative size-[27px] min-w-[27px] my-auto cursor-pointer flex items-center',
				[className]
			)}
		>
			<Image
				src={'/images/shared/close.png'}
				className='drop-shadow-[4px_5px_3px_rgba(0,0,0,0.59)] hover:drop-shadow-none transition-[300] static size-full'
				alt='icon'
				width={27}
				height={27}
			/>
		</button>
	)
}

export { CloseButton }
