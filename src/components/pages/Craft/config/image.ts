import { TImagesConfig } from '@/types'

export const arrow: TImagesConfig = [
	{
		alt: 'arrow',
		src: '/images/craft/arrow.png',
		width: 40,
		height: 40,
	},
	'/_next/image?url=%2Fimages%2Fcraft%2Farrow.png&w=96&q=75',
]
export const craft: TImagesConfig = [
	{
		alt: 'craft',
		src: '/images/craft/craft.png',
		width: 22,
		height: 30,
	},
	'/_next/image?url=%2Fimages%2Fcraft%2Fcraft.png&w=48&q=75',
]
export const alakazamIcon: TImagesConfig = [
	{
		alt: 'alakazam',
		src: '/images/craft/alakazam.png',
		width: 20,
		height: 20,
		loading: 'eager',
	},
	'/_next/image?url=%2Fimages%2Fcraft%2Falakazam.png&w=48&q=75',
]

export const plus: TImagesConfig = [
	{
		alt: 'plus',
		src: '/images/craft/plus.png',
		width: 25,
		height: 25,
		loading: 'eager',
	},
	'/_next/image?url=%2Fimages%2Fcraft%2Fplus.png&w=64&q=75',
]
export const plusInvert: TImagesConfig = [
	{
		alt: 'plus-invert',
		src: '/images/craft/plus-invert.png',
		width: 40,
		height: 40,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fcraft%2Fplus-invert.png&w=48&q=75',
]
export const preloadImage: TImagesConfig = [
	{
		alt: 'card',
		src: '/images/craft/card.png',
		width: 100,
		height: 130,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fcraft%2Fcard.png&w=128&q=75',
]
export const star: TImagesConfig = [
	{
		alt: 'star',
		src: '/images/craft/star.svg',
		width: 25,
		height: 25,
		loading: 'eager',
		decoding: 'sync',
	},
	'/images/craft/star.svg',
]
export const background: TImagesConfig = [
	{
		alt: 'background',
		src: '/images/craft/background.png',
		width: 318,
		height: 400,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fcraft%2Fbackground.png&w=640&q=75',
]

export default [
	arrow,
	craft,
	alakazamIcon,
	plus,
	plusInvert,
	preloadImage,
	background,
	star,
]
