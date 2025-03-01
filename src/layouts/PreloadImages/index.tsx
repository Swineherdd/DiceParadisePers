'use client'
import usePreload from '@/hooks/usePreload'
import { IChildren, TImagesConfig } from '@/types'
import { FC, useEffect } from 'react'
import { MainBackgroundImages } from '@/layouts/MainBackground'
import { LoadImages } from '@/components/pages/Load'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
	setIsAllPagesLoaded,
	setIsLoadPageLoaded,
} from '@/store/reducers/preloadStates'
import { HeaderImages } from '@/components/widgets/Header'
import { HomeImages } from '@/components/pages/Home'
import { WalletImages } from '@/components/pages/Wallet'
import { sharedImages } from '@/config/sharedImage'
import { ReferralsImages } from '@/components/pages/Referrals'
import { CraftImages } from '@/components/pages/Craft'
import { modalsImage } from '@/components/modals/images'
import { footerImages } from '@/components/widgets/Footer'
import { LotteryImages } from '@/components/pages/Lottery'

interface Props extends IChildren {}
const PreloadImages: FC<Props> = ({ children }) => {
	const remoteImages = useAppSelector(state => state.remoteImages.remoteImages)
	const allImages: TImagesConfig[] = [
		...HeaderImages,
		...HomeImages,
		...WalletImages,
		...sharedImages,
		...ReferralsImages,
		...CraftImages,
		...modalsImage,
		...footerImages,
		...LotteryImages,
		...remoteImages,
	]
	const loadImages: TImagesConfig[] = [...MainBackgroundImages, ...LoadImages]
	const isLoadImagePreloaded = usePreload(loadImages)
	const isAllImageIPreloaded = usePreload(allImages)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (isLoadImagePreloaded)
			dispatch({
				type: setIsLoadPageLoaded.type,
				payload: {
					newState: true,
				},
			})
	}, [isLoadImagePreloaded])

	useEffect(() => {
		if (isAllImageIPreloaded)
			dispatch({
				type: setIsAllPagesLoaded.type,
				payload: {
					newState: true,
				},
			})
	}, [isAllImageIPreloaded])

	return <>{children}</>
}

export { PreloadImages }
