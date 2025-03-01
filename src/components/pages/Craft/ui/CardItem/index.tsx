'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
	removeCraftCardData,
	setSelectedCardData,
} from '@/store/reducers/craft'
import Image from 'next/image'
import { FC, MouseEventHandler, useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props {
	className?: string
	onClick?: MouseEventHandler
	id: number
	image: string
	slideIndex: number
	name: string
}
const CardItem: FC<Props> = ({ className, onClick, id, image, name }) => {
	const dispatch = useAppDispatch()
	const selectedCardData = useAppSelector(state => state.craft.selectedCardData)
	const cardRef = useRef<any>(null)
	const craftCardsData = useAppSelector(state => state.craft.craftCardsData)
	useEffect(() => {
		let animation: any

		if (selectedCardData?.id === id) {
			animation = gsap.fromTo(
				cardRef.current,
				{
					duration: 1,
					rotateX: 12, // Пример анимации, замените на свою
					rotateY: -8,
					boxShadow: '0 0 5px 0 transparent',
				},
				{
					yoyo: true,
					repeat: -1, // Бесконечное повторение
					duration: 1,
					rotateX: 10, // Пример анимации, замените на свою
					rotateY: 8,
					boxShadow: '0 0 5px 0px white',
					ease: 'power1.inOut',
				}
			)
		}

		return () => {
			if (cardRef.current)
				gsap.to(cardRef.current, {
					boxShadow: '0 0 5px 0 transparent',
				})
			if (animation) {
				animation.kill()
			}
		}
	}, [selectedCardData])

	return (
		<div
			className={`w-full perspective-[150px] duration-200 transform-style-3d ${
				craftCardsData[id] && 'opacity-50'
			} ${className}`}
			onClick={e => {
				onClick && onClick(e)
				if (!craftCardsData[id]) {
					if (id !== selectedCardData?.id) {
						dispatch({
							type: setSelectedCardData.type,
							payload: {
								data: {
									id,
									image,
									name,
								},
							},
						})
					} else {
						dispatch({
							type: setSelectedCardData.type,
							payload: {
								data: undefined,
							},
						})
					}
				} else {
					dispatch({
						type: removeCraftCardData.type,
						payload: {
							id,
						},
					})
				}
			}}
		>
			<Image
				loading='eager'
				priority
				// @ts-ignore
				ref={cardRef}
				src={image}
				alt='card'
				width={100}
				height={130}
				className={`w-full h-auto duration-200 rounded-[5%] ${
					selectedCardData?.id !== id && '!transform-none'
				}`}
			/>
		</div>
	)
}

export { CardItem }
