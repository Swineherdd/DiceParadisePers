import { TImagesConfig } from '@/types'
import { getImageProps } from 'next/image'
import { useState, useEffect } from 'react'

const useImagesLoaded = (images: TImagesConfig[]) => {
	const [allImagesLoaded, setAllImagesLoaded] = useState(false)
	useEffect(() => {
		const imagePromises = images.map(image => {
			return new Promise(resolve => {
				const path = getImageProps(image[0])
				const img = new Image()
				img.src = path.props.src
				img.onload = () => resolve(true)
				img.onerror = () => {
					resolve(true)
				}
			})
		})

		Promise.all(imagePromises).then(results => {
			setAllImagesLoaded(results.every(loaded => loaded))
		})
	}, [images])

	return allImagesLoaded
}

export default useImagesLoaded
