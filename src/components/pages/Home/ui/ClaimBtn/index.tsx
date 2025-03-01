'use client'
import { FC, MouseEvent, useState } from 'react'
import { IClassName } from '@/types'
import { cn } from '@/lib'
import { Typography } from '@/components/shared'
import {
	replaceMainSuccessSubtitle,
	showMainErrorModal,
	showMainSuccessModal,
} from '@/store/reducers/modals'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import Image from 'next/image'
import { DEFAULT_TICKETS } from '../../constants/default-tickets'
import { useClaimDayliHomeMutation } from '@/store/api/balance'
import { ticket } from '@/components/widgets/Header/config/image'

interface Props extends IClassName {}
const ClaimBtn: FC<Props> = ({ className }) => {
	const [isClaimPending, setIsClaimPending] = useState<boolean>()
	const dispatch = useAppDispatch()
	const remainingTime = useAppSelector(state => state.balance.remainingTime)
	const [claimFn] = useClaimDayliHomeMutation()
	const handleClaim = async (e: MouseEvent) => {
		setIsClaimPending(true)

		try {
			if (remainingTime > 0) {
				throw new Error('Таймер не истек')
			}
			const response = await claimFn()
			if (response.data?.error) {
				throw Error(`Ошибка из API:, ${response.data.error}`)
			}
			dispatch({
				type: replaceMainSuccessSubtitle.type,
				payload: {
					text: (
						<div className='flex items-center gap-x-[8px]'>
							<div className='relative size-3'>
								<Image {...ticket[0]} />
							</div>
							{Number(response.data?.total_bonus) + DEFAULT_TICKETS}
						</div>
					),
				},
			})
			dispatch(showMainSuccessModal())
			setIsClaimPending(false)
		} catch (error) {
			setIsClaimPending(false)
			console.error(error)
			dispatch(showMainErrorModal())
		}
	}

	return (
		<button
			disabled={isClaimPending}
			className={cn(
				'shadow-[0px_2px_2px_1px_#00000080] py-[2px] border-solid border-[1px] border-black w-[119px] rounded-[40px] duration-200 hover:shadow-none',
				[className]
			)}
			onClick={handleClaim}
		>
			<Typography size={12} className='font-extrabold'>
				Claim
			</Typography>
		</button>
	)
}

export { ClaimBtn }
