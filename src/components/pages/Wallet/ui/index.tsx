import { FC } from 'react'
import { Head } from './Head'
import { Content } from './Content'
import { MotionScaleAnim } from '@/components/shared'
import BuyTicketModal from '@/components/modals/buy-ticket'

interface Props {}
const WalletPage: FC<Props> = ({}) => {
	return (
		<>
			<MotionScaleAnim className='mt-[40px] text-black'>
				<Head className='' />
				<Content className='mt-[12px]' />
			</MotionScaleAnim>
			<BuyTicketModal />
		</>
	)
}

export { WalletPage }
