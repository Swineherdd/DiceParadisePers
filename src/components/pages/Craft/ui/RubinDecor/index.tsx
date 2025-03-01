import Image from 'next/image'
import { FC } from 'react'
import { star } from '../../config/image'

interface Props {}
const RubinDecor: FC<Props> = ({}) => {
	return (
		<>
			<div
				className='craft-page-rubin-decor-bg w-[8%] h-[9%] absolute left-2/4 -translate-x-2/4 top-[7.2%] opacity-30'
				style={{
					clipPath:
						'polygon(50% 0px, 100% 40%, 100% 65%, 50% 100%, 0px 68%, 0px 36%)',
				}}
			/>
			<Image
				{...star[0]}
				className='craft-page-rubin-decor absolute left-2/4 -translate-x-2/4 top-[7.9%] size-[8%]'
			/>
		</>
	)
}

export { RubinDecor }
