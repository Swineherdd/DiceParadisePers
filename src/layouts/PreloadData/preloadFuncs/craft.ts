import { useAppDispatch } from '@/hooks/redux'
import { getCraftCards } from '@/api/craft/cards'
import { setSliderData } from '@/store/reducers/craft'
import { addRemoteImage } from '@/store/reducers/remoteImages'
export const craftPreloadData = () => {
	const dispatch = useAppDispatch()
	return () => {
		getCraftCards().then(({ data }) => {
			const images = [...new Set(data.map(item => item.image))]

			images.forEach(image => {
				dispatch(
					addRemoteImage({
						path: image,
						endingParams: [
							{
								w: 256,
							},
							{ q: 75 },
						],
					})
				)
			})
			dispatch(setSliderData({ arr: data }))
		})
	}
}
