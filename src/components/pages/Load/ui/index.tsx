import { IClassName } from '@/types'
import Image from 'next/image'
import { FC } from 'react'
import { logo } from '../config/image'
import { cn } from '@/lib'
import { LoadBar } from './LoadBar'

interface Props extends IClassName {}
const LoadPage: FC<Props> = ({ className }) => {
	const wrapperCls =
		'fixed left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col flex-wrap gap-y-[15px]'

	return (
		<div className={cn(wrapperCls, [className])}>
			<Image
				{...logo[0]}
				className='w-[210px] h-[205.8px] mx-auto'
				loading='eager'
			/>
			<LoadBar className='' />
		</div>
	)
}

export { LoadPage }
