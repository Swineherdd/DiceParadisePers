'use client'
import { FC, useEffect, useState } from 'react'
import { IClassName } from '@/types'
import { cn } from '@/lib'
import Image from 'next/image'
import { Typography } from '@/components/shared'
import { timeClock } from '../../config/image'
import { secondsConverter } from '../../lib/secondsConverter'
import { useGetRemainingTimeQuery } from '@/store/api/balance'
import { setRemainingTime } from '@/store/reducers/balance'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

interface Props extends IClassName {}
const Timer: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const { data } = useGetRemainingTimeQuery()
	const remainingTime = useAppSelector(state => state.balance.remainingTime)

	useEffect(() => {
		if (data) dispatch(setRemainingTime({ new: data.wait_time_seconds }))
	}, [data, dispatch])

	useEffect(() => {
		const interval = setInterval(() => {
			if (remainingTime - 1 > 0)
				dispatch(setRemainingTime({ new: remainingTime - 1 }))
			else clearInterval(interval)
		}, 1000)

		return () => clearInterval(interval)
	}, [dispatch, remainingTime])

	const wrapperCls = 'flex gap-x-[8px] items-center'

	return (
		<div className={cn(wrapperCls, [className])}>
			<Image {...timeClock[0]} className='w-[25px] h-[27px]' />
			<Typography size={17} className='font-bold text-[rgb(120_75_57_/_1)]'>
				{secondsConverter(remainingTime)}
			</Typography>
		</div>
	)
}

export { Timer }
