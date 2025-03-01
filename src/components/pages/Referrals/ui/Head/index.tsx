'use client'
import { FC } from 'react'
import { CloseButton } from '@/components/shared'

interface Props {
	className?: string
}
const Head: FC<Props> = ({ className }) => {
	return (
		<div className={`flex items-center gap-x-[10px] ${className}`}>
			<div
				className={`bg-white border-[1px] border-solid border-black rounded-lg text-black text-[12px] min-400:text-[14px] font-bold w-[300px] min-400:w-[365px] py-2 grow-[1] text-center`}
			>
				Referrals
			</div>
			<CloseButton />
		</div>
	)
}

export { Head }
