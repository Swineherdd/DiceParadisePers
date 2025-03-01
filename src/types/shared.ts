import { ImageProps } from 'next/image'
import { ReactNode } from 'react'

export interface IClassName {
	className?: string
}
export interface IChildren {
	children?: ReactNode
}
export type TImagesConfig = [ImageProps, string]
