'use client'
import Image from 'next/image'
import { FC } from 'react'
import { Animate } from './Animate'
import { Slider } from './Slider'
import { CraftArea } from './CraftArea'
import { LightDecor } from './LightDecor'
import { Head } from './Head'
import { RubinDecor } from './RubinDecor'
import { AlakazamBtn } from './AlakazamBtn'
import { SliderArrows } from './SliderArrows'
import { background, plus } from '../config/image'

interface Props {
	className?: string
}
const Craft: FC<Props> = ({ className }) => {
	Animate({
		craftArea: '.craft-page-area',
		craftLightLeft: '.craft-page-light-left',
		craftLightRight: '.craft-page-light-right',
		craftRubinDecor: '.craft-page-rubin-decor',
		craftRubinDecorBg: '.craft-page-rubin-decor-bg',
	})

	return (
		<div className={`pt-4 ${className}`}>
			<Head />
			<div className='relative'>
				<div className='w-full mt-[15px]  bg-cover rounded-[20px] border-[1px] border-solid border-black overflow-hidden max-h-[110vw] h-full relative'>
					{/* FLAMES */}
					<div className='absolute left-[4.3%] top-[30.4%] w-[10%] h-[20%]  before:absolute before:left-2/4 before:top-2/4 before:-translate-x-2/4 before:-translate-y-2/4 before:shadow-[0_0_20px_3px_#ffcb00] before:h-full'>
						<Image
							src='/images/craft/flame.gif'
							alt='flame'
							width={30}
							height={100}
							className='w-full h-full'
							priority
						/>
					</div>
					<div className='absolute right-[4%] top-[30.4%] w-[10%] h-[20%]  before:absolute before:left-2/4 before:top-2/4 before:-translate-x-2/4 before:-translate-y-2/4 before:shadow-[0_0_20px_3px_#ffcb00] before:h-full'>
						<Image
							src='/images/craft/flame.gif'
							alt='flame'
							width={30}
							height={100}
							className='w-full h-full'
							priority
						/>
					</div>
					{/* RUBIN */}
					<RubinDecor />
					{/* BACKG */}
					<div className='w-full max-h-[inherit] overflow-hidden'>
						<Image {...background[0]} className='w-full object-fill' />
						{/* LIGHT */}
						<LightDecor />
					</div>
					{/* CARDS */}
					<CraftArea />
					<div className='absolute w-full left-0 bottom-0 bg-[rgba(0,0,0,70%)] '>
						<AlakazamBtn />
						<Slider />
						<button
							rel='noopener noreferrer'
							onClick={() => {
								window.open('https://getgems.io/diceparadise', '_blank')
							}}
							className='absolute right-0 top-0 -translate-x-[2px] -translate-y-2/4 z-[2]'
						>
							<Image {...plus[0]} />
						</button>
					</div>
				</div>
				{/* SLIDER ARROWS */}
				<div className={``}>
					<SliderArrows />
				</div>
			</div>
		</div>
	)
}

export { Craft }
