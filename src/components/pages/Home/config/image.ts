import { TImagesConfig } from '@/types'

export const timeClock: TImagesConfig = [
	{
		alt: 'time',
		src: '/images/home/time.png',
		width: 47,
		height: 52,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fhome%2Ftime.png&w=96&q=75',
]
export const ticket: TImagesConfig = [
	{
		alt: 'ticket',
		src: '/images/home/ticket.png',
		width: 43,
		height: 37,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fhome%2Fticket.png&w=96&q=75',
]

export default [timeClock, ticket]
