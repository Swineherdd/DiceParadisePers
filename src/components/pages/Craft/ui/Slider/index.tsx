import { FC } from 'react'
import { Navigation } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'
import { CardItem } from '../CardItem'
import 'swiper/css'
import { useAppSelector } from '@/hooks/redux'
import { AddCraftItem } from '../AddCraftItem'

interface Props {
	className?: string
}
const Slider: FC<Props> = ({ className }) => {
	const cardsData = useAppSelector(state => state.craft.sliderDataArr)

	return (
		<>
			<Swiper
				allowTouchMove={false}
				slidesPerGroup={3}
				slidesPerView={3}
				spaceBetween={12}
				className={`w-[77%] mx-auto h-full !py-[9px] !px-[1%] ${className}`}
				navigation={{
					enabled: cardsData.length > 3,
					nextEl: '#craft-card-next-el',
					prevEl: '#craft-card-prev-el',
				}}
				modules={[Navigation]}
				speed={800}
			>
				{cardsData.length === 0 && (
					<SwiperSlide>
						<div className='w-full aspect-[70/100]' />
					</SwiperSlide>
				)}
				{cardsData.map((el, index) => {
					if (el === null) {
						return (
							<SwiperSlide key={`abc${index * 10}`}>
								<AddCraftItem />
							</SwiperSlide>
						)
					} else
						return (
							<SwiperSlide key={el.id}>
								<CardItem
									name={el.name}
									id={el.id}
									image={el.image}
									slideIndex={index}
								/>
							</SwiperSlide>
						)
				})}
			</Swiper>
		</>
	)
}

export { Slider }
