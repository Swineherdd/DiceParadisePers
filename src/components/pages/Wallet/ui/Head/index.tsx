import { CloseButton, Typography } from '@/components/shared'
import { cn } from '@/lib'
import { IClassName } from '@/types'
import { FC } from 'react'

interface Props extends IClassName {}
const Head: FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex items-center gap-x-[20px]', [className])}>
			<Typography
				size={13}
				className='font-extrabold bg-white py-[7px] duration-200 rounded-lg border-black border-[1px] border-solid text-center w-[270px]'
			>
				Your TON Wallet
			</Typography>
			<CloseButton className='' />
		</div>
	)
}

export { Head }
