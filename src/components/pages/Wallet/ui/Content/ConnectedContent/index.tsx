import { cn } from '@/lib'
import { IClassName } from '@/types'
import { FC } from 'react'
import { WalletActions } from './WalletActions'
import { WalletAddress } from './WalletAddress'
import { DisconnectBtn } from './DisconnectBtn'

interface Props extends IClassName {}
const ConnectedContent: FC<Props> = ({ className }) => {
	const wrapperCls =
		'bg-white w-[270px] border-black border-[1px] border-solid rounded-[10px] overflow-hidden'

	return (
		<div className={cn(wrapperCls, [className])}>
			<WalletActions />
			<WalletAddress />
			<DisconnectBtn />
		</div>
	)
}

export { ConnectedContent }
