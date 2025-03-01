'use client'
import { IChildren } from '@/types'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { background } from '../config/images'
import { useAppSelector } from '@/hooks/redux'

interface Props extends IChildren {}
const MainBackgroundLayout: FC<Props> = ({ children }) => {
	const isLoadPageLoaded = useAppSelector(
		state => state.preloadStates.isLoadPageLoaded
	)
	const [visible, setVisible] = useState<boolean>(false)

	useEffect(() => {
		if (isLoadPageLoaded) {
			setTimeout(() => {
				setVisible(true)
			}, 10)
		}
	}, [isLoadPageLoaded])

	return (
		<div
			className={`duration-300 h-full  ${
				!visible ? 'opacity-0 pointer-events-none' : 'opacity-100 '
			}`}
		>
			{children}
			<Image
				{...background[0]}
				className={`fixed left-0 top-0 w-full h-full -z-[1] duration-200 ${
					!isLoadPageLoaded && 'opacity-0'
				}`}
			/>
		</div>
	)
}

export { MainBackgroundLayout }
