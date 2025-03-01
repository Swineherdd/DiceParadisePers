'use client'
import { FC, useEffect } from 'react'
import { IClassName } from '@/types'
import { cn } from '@/lib'
import { Typography } from '@/components/shared'
import Image from 'next/image'
import { ticket } from '../../config/image'
import { useGetClaimedBonusQuery } from '@/store/api/balance'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setUnclaimedBonus } from '@/store/reducers/balance'

interface Props extends IClassName {}
const CalculateBlock: FC<Props> = ({ className }) => {
	const { data } = useGetClaimedBonusQuery()
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (data) {
			dispatch(setUnclaimedBonus({ new: data.total_unclaimed_bonus }))
		}
	}, [])

	const unclaimedBonus = useAppSelector(state => state.balance.unclaimedBonus)
	const wrapperCls = 'text-end'
	const itemCls =
		'flex font-bold gap-x-[4px] items-center [&>img]:-translate-y-[3px]'
	const equalCls =
		'relative inline-flex before:right-0 before:top-0 before:absolute before:-rotate-[12deg] before:w-[112px] before:-translate-y-[200%] before:h-[2px] before:bg-black mt-[20px]'

	return (
		<div className={cn(wrapperCls, [className])}>
			<div className={cn(itemCls)}>
				<Typography size={13}>Your 24h income: 10</Typography>
				<Image {...ticket[0]} className='w-[16px] h-[14px]' />
				<Typography size={13}>+</Typography>
			</div>

			<div className={cn(itemCls, ['mt-[12px]'])}>
				<Typography size={13}>
					Unclaimed ref bonus: {unclaimedBonus || 0}
				</Typography>
				<Image {...ticket[0]} className='w-[16px] h-[14px]' />
			</div>

			<div className={cn(itemCls, [equalCls])}>
				<Typography size={13}>= {unclaimedBonus || 0 + 10}</Typography>
				<Image {...ticket[0]} className='w-[16px] h-[14px]' />
			</div>
		</div>
	)
}

export { CalculateBlock }
