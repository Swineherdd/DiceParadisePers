'use client'
import Image, { ImageProps } from 'next/image'
import { FC, forwardRef, ReactNode, useState } from 'react'
interface Props extends ImageProps {
	preloader: ReactNode
	onImageLoad?: (e: any) => void
	// Отображать спиннер до тех пор пока spinnerBefore не станет true
	spinnerBefore?: boolean
}
const LoadingImage: FC<Props> = forwardRef(
	(
		{ preloader, className, alt, onImageLoad, spinnerBefore = true, ...other },
		ref
	) => {
		const [loaded, setLoaded] = useState<boolean>(false)
		return (
			<>
				{(!loaded || !spinnerBefore) && preloader}
				<Image
					//@ts-ignore
					ref={ref}
					className={`${
						loaded ? 'opacity-100' : 'opacity-0'
					} duration-[250ms] ${className}`}
					{...other}
					onLoad={e => {
						onImageLoad && onImageLoad(e)
						setLoaded(true)
					}}
					alt={alt}
				/>
			</>
		)
	}
)
LoadingImage.displayName = 'LoadingImage'
export { LoadingImage }
