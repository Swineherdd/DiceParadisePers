import { FC } from 'react'
import cls from './index.module.css'
import Image from 'next/image'

interface Props {
	setIsGifAnimate: (state: boolean) => void
}
const Preview: FC<Props> = ({ setIsGifAnimate }) => {
	return (
		<div className={`${cls.container}`}>
			<button
				className={`${cls.magicBallBtn}`}
				onClick={() => {
					setIsGifAnimate(true)
				}}
			>
				<Image
					src='/images/magicBall.png'
					alt='Magic Ball'
					width={170}
					height={195}
				/>
				<Image
					alt='Arrow to Magic Ball'
					src='/images/magicBall-arrow.png'
					width={100}
					height={90}
				/>
			</button>
		</div>
	)
}

export default Preview
