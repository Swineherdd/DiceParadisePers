import { TImagesConfig } from '@/types'

export const logo: TImagesConfig = [
	{
		alt: 'logo',
		src: '/images/load/logo.png',
		width: 299,
		height: 292,
		loading: 'eager',
	},
	'/_next/image?url=%2Fimages%2Fload%2Flogo.png&w=384&q=75',
]
export const play: TImagesConfig = [
	{
		alt: 'play',
		src: '/images/load/play-button.png',
		width: 512,
		height: 126,
		loading: 'eager',
	},
	'/_next/image?url=%2Fimages%2Fload%2Fplay-button.png&w=640&q=75',
]

export const progressBg: TImagesConfig = [
	{
		alt: 'progress',
		src: '/images/load/progress-bg.png',
		width: 613,
		height: 130,
		loading: 'eager',
	},
	'/_next/image?url=%2Fimages%2Fload%2Fprogress-bg.png&w=640&q=75',
]

export default [logo, play, progressBg]
