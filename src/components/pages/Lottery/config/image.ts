import { TImagesConfig } from '@/types'

export const money: TImagesConfig = [
	{
		alt: 'money',
		src: '/images/lottery/money.png',
		width: 38,
		height: 39,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fcraft%2Farrow.png&w=48&q=75',
]
export const ticket: TImagesConfig = [
	{
		alt: 'ticket',
		src: '/images/lottery/ticket.png',
		width: 39,
		height: 34,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fcraft%2Farrow.png&w=48&q=75',
]
export const magicHat: TImagesConfig = [
	{
		alt: 'magicHat',
		src: '/images/lottery/magic-hat.png',
		width: 90,
		height: 90,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fcraft%2Farrow.png&w=48&q=75',
]
export const lotteryBg: TImagesConfig = [
	{
		alt: 'lotteryBg',
		src: '/images/lottery/lottery-bg.png',
		width: 454,
		height: 453,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fcraft%2Farrow.png&w=48&q=75',
]

export default [money, ticket, magicHat, lotteryBg]
