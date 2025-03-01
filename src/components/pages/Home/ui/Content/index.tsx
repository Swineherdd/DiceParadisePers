import { cn } from '@/lib'
import { IClassName } from '@/types'
import { FC } from 'react'
import { Timer } from '../Timer'
import { ClaimBtn } from '../ClaimBtn'
import { CalculateBlock } from '../CalculateBlock'

interface Props extends IClassName {}
const Content: FC<Props> = ({ className }) => {
	const wrapperCls =
		'bg-white p-[20px] rounded-[8px] border-solid border-[1px] border-black shadow-[2px_3px_3px_2px_#00000080]'
	const contentCls = 'flex justify-between items-center'

	return (
		<div className={cn(wrapperCls, [className])}>
			<div className={cn(contentCls)}>
				<Timer />
				<ClaimBtn />
			</div>
			<CalculateBlock className='mt-[12px]' />
		</div>
	)
}

export { Content }
