import { TImagesConfig } from '@/types'

export const addNft: TImagesConfig = [
	{
		alt: 'add nft',
		src: '/images/referrals/add-nft.png',
		width: 27,
		height: 27,
	},
	'/_next/image?url=%2Fimages%2Freferrals%2Fadd-nft.png&w=32&q=75',
]
export const addNftText: TImagesConfig = [
	{
		alt: 'add nft text',
		src: '/images/referrals/add-nft-text.png',
		width: 70,
		height: 17.5,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Freferrals%2Fadd-nft-text.png&w=96&q=75',
]
export const arrow: TImagesConfig = [
	{
		alt: 'arrow',
		src: '/images/referrals/arrow.png',
		width: 70,
		height: 17.5,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Freferrals%2Farrow.png&w=256&q=75',
]
export const copy: TImagesConfig = [
	{
		alt: 'copy',
		src: '/images/referrals/copy.png',
		width: 15,
		height: 18,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Freferrals%2Fcopy.png&w=32&q=75',
]
export const preloadImage: TImagesConfig = [
	{
		alt: 'preload',
		src: '/images/referrals/preload-nft.png',
		width: 110,
		height: 165,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Freferrals%2Fpreload-nft.png&w=256&q=75',
]

export default [addNft, addNftText, arrow, copy, preloadImage]
