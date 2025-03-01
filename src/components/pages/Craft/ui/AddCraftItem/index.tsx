'use client'
import Image from 'next/image'
import { FC } from 'react'
import { plusInvert, preloadImage } from '../../config/image'

interface Props {
	className?: string
}
const AddCraftItem: FC<Props> = ({ className }) => {
	return (
		<button
			className={`relative w-full ${className} block`}
			rel='noopener noreferrer'
			onClick={() => {
				window.open('https://getgems.io/diceparadise', '_blank')
			}}
		>
			<div className='absolute left-0 top-0 size-full bg-[rgba(255,255,255,70%)] flex justify-center items-center rounded-[5%] '>
				<Image {...plusInvert[0]} className='w-[35%] h-auto' />
			</div>
			<Image loading='eager' {...preloadImage[0]} className={`w-full h-auto`} />
		</button>
	)
}

export { AddCraftItem }
