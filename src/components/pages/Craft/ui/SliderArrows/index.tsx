'use client'
import { useAppSelector } from '@/hooks/redux'
import Image from 'next/image'
import { FC } from 'react'
import { arrow } from '../../config/image'

interface Props {}
const SliderArrows: FC<Props> = ({}) => {
	const sliderSlides = useAppSelector(state => state.craft.sliderDataArr)
	return (
		<div className='w-full h-[34.3%] absolute bottom-0 left-0 '>
			<button
				disabled={sliderSlides.length <= 3}
				className={`w-[40px] h-[40px] absolute -translate-x-[20%] left-0 top-2/4 -translate-y-2/4 z-[2] ${
					sliderSlides.length <= 3 && 'opacity-80'
				}`}
				id='craft-card-prev-el'
			>
				<Image {...arrow[0]} className='size-full' />
			</button>
			<button
				disabled={sliderSlides.length <= 3}
				className={`w-[40px] h-[40px] absolute right-0 top-2/4 -translate-y-2/4 -scale-x-[1] translate-x-[20%] z-[2] ${
					sliderSlides.length <= 3 && 'opacity-80'
				}`}
				id='craft-card-next-el'
			>
				<Image {...arrow[0]} className='size-full' />
			</button>
		</div>
	)
}

export { SliderArrows }
