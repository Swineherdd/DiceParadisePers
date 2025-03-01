import { TImagesConfig } from '@/types'

export const homeIcon: TImagesConfig = [
	{
		alt: 'home',
		src: '/images/footer/home.png',
		width: 201,
		height: 202,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Ffooter%2Fhome.png&w=640&q=75',
]
export const craftIcon: TImagesConfig = [
	{
		alt: 'craft',
		src: '/images/footer/craft.png',
		width: 201,
		height: 202,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Ffooter%2Fcraft.png&w=640&q=75',
]
export const questionIcon: TImagesConfig = [
	{
		alt: 'question',
		src: '/images/footer/question.png',
		width: 201,
		height: 202,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Ffooter%2Fquestion.png&w=640&q=75',
]

export const footerImages = [homeIcon, craftIcon, questionIcon]
