'use client'
import { IChildren } from '@/types'
import { FC, useEffect } from 'react'
import { homePreloadData } from './preloadFuncs/home'
import { referralsPreloadData } from './preloadFuncs/referrals'
import { craftPreloadData } from './preloadFuncs/craft'
import { useAppSelector } from '@/hooks/redux'

interface Props extends IChildren {}
const PreloadData: FC<Props> = ({ children }) => {
	const remoteImages = useAppSelector(state => state.remoteImages.remoteImages)
	const craftData = craftPreloadData()
	const homeData = homePreloadData()
	const referralsData = referralsPreloadData()
	let first = false
	useEffect(() => {
		if (!first) {
			homeData()
			referralsData()
			craftData()
		}
		first = true
	}, [])

	return <>{children}</>
}

export { PreloadData }
