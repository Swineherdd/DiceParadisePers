'use client'
import { FC } from 'react'
import { Switcher } from './Switcher'
import { useAppSelector } from '@/hooks/redux'

interface Props {
	className?: string
}
const Rating: FC<Props> = ({ className }) => {
	const ratingType = useAppSelector(state => state.referralsPage.ratingViewType)
	const referralsRating = useAppSelector(
		state => state.referralsPage.referralsRating
	)
	const teamQuestsRating = useAppSelector(
		state => state.referralsPage.teamQuestsRating
	)
	const youRatingReferrals = useAppSelector(
		state => state.referralsPage.youRatingReferrals
	)
	const youRatingTeams = useAppSelector(
		state => state.referralsPage.youRatingTeams
	)

	return (
		<div className={`${className}`}>
			<div className='p-[20px]'>
				<h2 className='text-[white]'>RATING</h2>
				<Switcher
					className='my-[15px] mx-auto w-[90%]'
					ratingType={ratingType}
				/>
				<h3 className='text-[#76818e] text-[12px] text-center'>
					{ratingType === 'teamQuests'
						? `TOP-${teamQuestsRating.length} comand leaders by comands wins`
						: `TOP-${referralsRating.length} referral leaders by wins`}
				</h3>
				<hr className='w-[80%] bg-[black] mx-auto my-[10px] h-[2px] border-none' />
				{/* <ul className='flex flex-wrap gap-y-[10px] min-h-[207px] max-h-[207px] overflow-auto'>
					{(ratingType === 'referrals'
						? referralsRating
						: teamQuestsRating
					).map(({ nickname, ratePosition, ...other }) => {
						return (
							<li
								className='flex w-full min-h-[21px] gap-x-[10px] items-center'
								key={ratePosition}
							>
								<h4 className='text-[#76818e]'>{ratePosition}.</h4>
								<h2 className='text-[white] grow-[1] underline decoration-[#76818e] underline-offset-[4px] decoration-[1.2px]'>
									{nickname}
								</h2>
								<h3 className='text-[#76818e] mr-[15px]'>
									{/*@ts-ignore/}
									{ratingType === 'referrals' ? other.refs : other.wins}{' '}
									{ratingType === 'referrals' ? 'refs' : 'wins'}
								</h3>
							</li>
						)
					})}
				</ul> */}
				<h2 className='text-[#76818e] text-center my-[20px]'>Coming soon...</h2>
			</div>
			{/* <div className='flex w-full gap-x-[10px] items-center bg-[#010e1c] px-[20px] py-[12px] '>
				<h4 className='text-[#76818e]'>
					{ratingType === 'referrals'
						? youRatingReferrals.ratePosition
							? `${youRatingReferrals.ratePosition}.`
							: '-'
						: youRatingTeams.ratePosition
						? `${youRatingTeams.ratePosition}.`
						: '-'}
				</h4>
				<h2 className='text-[white] grow-[1] underline decoration-[#76818e] underline-offset-[4px] decoration-[1.2px]'>
					YOU
				</h2>
				<h3 className='text-[#76818e] mr-[15px]'>
					{ratingType === 'referrals'
						? `${youRatingReferrals.refs} refs`
						: `${youRatingTeams.wins} wins`}
				</h3>
			</div> */}
		</div>
	)
}

export { Rating }
