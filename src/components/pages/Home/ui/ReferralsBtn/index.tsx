'use client'
import { FC, MouseEvent, useState } from 'react'
import { IClassName } from '@/types'
import { cn } from '@/lib'
import { Typography } from '@/components/shared'
import { useRouter } from 'next/navigation'

interface Props extends IClassName {}
const ReferralsBtn: FC<Props> = ({ className }) => {
	const router = useRouter()
	const [isClaimPending, setIsClaimPending] = useState<boolean>(false)
	const handleClick = (e: MouseEvent) => {
		setIsClaimPending(true)
		router.push('/referrals')
	}

	return (
		<button
			disabled={isClaimPending}
			className={cn(
				'bg-white w-full py-[8px] duration-200 rounded-lg border-black border-[1px] shadow-[2px_3px_3px_2px_#00000080] border-solid hover:scale-[1.03] hover:shadow-none cursor-pointer',
				[className]
			)}
			onClick={handleClick}
		>
			<Typography size={12} className='font-bold'>
				Referrals
			</Typography>
		</button>
	)
}

export { ReferralsBtn }
