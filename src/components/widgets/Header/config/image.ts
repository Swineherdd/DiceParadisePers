import { TImagesConfig } from '@/types'

export const logo: TImagesConfig = [
	{
		alt: 'logo',
		src: '/images/layouts/header-logo.png',
		width: 299,
		height: 292,
		loading: 'eager',
	},
	'/_next/image?url=%2Fimages%2Flayouts%2Fheader-logo.png&w=640&q=75',
]
export const wallet: TImagesConfig = [
	{
		alt: 'wallet',
		src: '/images/header/wallet-icon.png',
		width: 50,
		height: 40,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fheader%2Fwallet-icon.png&w=128&q=75',
]
export const ticket: TImagesConfig = [
	{
		alt: 'ticket',
		src: '/images/header/ticket-icon.png',
		width: 43,
		height: 37,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fheader%2Fticket-icon.png&w=96&q=75',
]
export const ton: TImagesConfig = [
	{
		alt: 'ton',
		src: '/images/header/ton-icon.png',
		width: 47,
		height: 47,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fheader%2Fton-icon.png&w=96&q=75',
]
export const lvl: TImagesConfig = [
	{
		alt: 'lvl',
		src: '/images/header/lvl-icon.png',
		width: 102,
		height: 132,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fheader%2Flvl-icon.png&w=256&q=75',
]

export default [logo, lvl, ticket, ton, wallet]
