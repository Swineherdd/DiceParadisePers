'use client'
import { useAppDispatch } from '@/hooks/redux'
import { setRatingViewType, TRatingType } from '@/store/reducers/referralsPage'
import { FC } from 'react'

interface Props {
	className?: string
	ratingType: TRatingType
}
const Switcher: FC<Props> = ({ className, ratingType }) => {
	const dispatch = useAppDispatch()

	return (
		<div
			className={`grid grid-cols-[repeat(2,1fr)] gap-x-[10px] text-[#01172e] text-[13px] ${className}`}
		>
			<button
				className={`text-center rounded-[15px] py-[2px] duration-200 ${
					ratingType === 'teamQuests' ? 'bg-[#76818e]' : 'bg-[white]'
				}`}
				onClick={() => {
					if (ratingType !== 'teamQuests')
						dispatch({
							type: setRatingViewType.type,
							payload: {
								type: 'teamQuests',
							},
						})
				}}
			>
				Team Quests
			</button>
			<button
				className={`text-center rounded-[15px] py-[2px] duration-200 ${
					ratingType === 'referrals' ? 'bg-[#76818e]' : 'bg-[white]'
				}`}
				onClick={() => {
					if (ratingType !== 'referrals')
						dispatch({
							type: setRatingViewType.type,
							payload: {
								type: 'referrals',
							},
						})
				}}
			>
				Referrals
			</button>
		</div>
	)
}

export { Switcher }
