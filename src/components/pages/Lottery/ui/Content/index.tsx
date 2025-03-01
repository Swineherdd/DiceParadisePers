import { FC } from 'react'
import { Season } from '../Season'
import { Background } from '../Background'

interface Props {
	className?: string
}
const Content: FC<Props> = ({ className }) => {
	return (
		<div className={`p-[15px] relative ${className}`}>
			<Season className='relative z-[2]' />
			<Background className='' />
		</div>
	)
}

export { Content }
