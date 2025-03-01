import { CloseButton } from '@/components/shared'
import { FC } from 'react'

interface Props {
	className?: string
}
const Head: FC<Props> = ({ className }) => {
	return (
		<div className={`flex gap-x-[10px] ${className}`}>
			<div className='bg-white border-[1px] border-solid border-black rounded-[10px] text-center w-full text-black font-extrabold py-[6px] text-[12px] min-360:text-[13.5px] min-400:text-[14px]'>
				WIN-WIN Lottery
			</div>
			<CloseButton />
		</div>
	)
}

export { Head }
