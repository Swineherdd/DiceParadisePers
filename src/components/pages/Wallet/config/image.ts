import { TImagesConfig } from '@/types'

export const wallet: TImagesConfig = [
	{
		alt: 'wallet',
		src: '/images/wallet/wallet.png',
		width: 547,
		height: 386,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fwallet%2Fwallet.png&w=640&q=75',
]

export const connectedBackground: TImagesConfig = [
	{
		alt: 'background',
		src: '/images/wallet/connected-background.png',
		width: 721,
		height: 642,
		loading: 'eager',
		decoding: 'sync',
	},
	'/_next/image?url=%2Fimages%2Fwallet%2Fconnected-background.png&w=1920&q=75',
]

export default [wallet, connectedBackground]
