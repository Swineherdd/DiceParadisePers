import { CloseButton } from '@/components/shared'
import { FC } from 'react'

interface Props {}
const Head: FC<Props> = ({}) => {
	return (
		<div className='flex gap-x-[10px]'>
			<button
				disabled={true}
				className='w-full bg-white text-black font-extrabold border-[1px] border-solid border-black rounded-[10px] py-[6px] text-[12px] min-360:text-[13.5px] min-400:text-[14px]'
			>
				Craft
			</button>
			<div className='grow-[1] flex justify-center'>
				<CloseButton />
			</div>
		</div>
	)
}

export { Head }
