import { FC } from 'react'
import cls from './index.module.css'
import Image from 'next/image'

interface Props {
	setLoadGifImg: (state: boolean) => void
}
const Animate: FC<Props> = ({ setLoadGifImg }) => {
	return (
		<div className={`${cls.container}`}>
			<div className={`${cls.animateImage}`}>
				<Image
					onLoad={() => {
						setLoadGifImg(true)
					}}
					priority
					src='/images/magicBall.gif'
					alt='Click animation'
					width={195}
					height={195}
				/>
			</div>
		</div>
	)
}

export default Animate
