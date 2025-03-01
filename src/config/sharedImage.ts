import { TImagesConfig } from '@/types'

export const ticketGold: TImagesConfig = [
	{
		alt: 'ticket gold',
		src: '/images/shared/ticket-icon-gold.png',
		width: 18,
		height: 18,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fshared%2Fticket-icon-gold.png&w=48&q=75',
]
export const ticketGoldFill: TImagesConfig = [
	{
		alt: 'ticket gold fill',
		src: '/images/shared/ticket-icon-gold-filled.png',
		width: 18,
		height: 18,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fshared%2Fticket-icon-gold-filled.png&w=32&q=75',
]
export const question: TImagesConfig = [
	{
		alt: 'ticket gold fill',
		src: '/images/shared/question.png',
		width: 18,
		height: 18,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fshared%2Fquestion.png&w=48&q=75',
]
export const close: TImagesConfig = [
	{
		alt: 'close',
		src: '/images/shared/close.png',
		width: 33,
		height: 33,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fshared%2Fclose.png&w=64&q=75',
]

export const sharedImages = [ticketGold, ticketGoldFill, question, close]
