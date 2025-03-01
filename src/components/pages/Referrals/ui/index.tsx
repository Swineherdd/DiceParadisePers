import { FC } from 'react'
import { Head } from './Head'
import { Boost } from './Boost'
import { Content } from './Content'
import { ReferralLink } from './ReferralLink'
import { Rating } from './Rating'
import { NftModal } from './NftModal'
import { MotionScaleAnim } from '@/components/shared'

interface Props {}
const ReferralsPage: FC<Props> = ({}) => {
	return (
		<MotionScaleAnim className='!will-change-auto'>
			<div className='text-[black] font-bold text-[14px] mt-4'>
				<Head className='' />
				<div className='rounded-[10px] bg-[white] border-[1px] border-solid border-black mt-[20px] '>
					<Boost className='p-[20px] rounded-tr-[8px] rounded-tl-[8px]' />
					<Content className='px-[20px] pt-[10px] pb-[20px]' />
				</div>
				<div className='mt-[30px] bg-[#01172e] rounded-[10px] border-[1px] border-solid border-black overflow-hidden'>
					<ReferralLink className='rounded-[inherit] px-[20px] py-[15px]' />
					<Rating className='' />
				</div>
			</div>
			<NftModal />
		</MotionScaleAnim>
	)
}

export { ReferralsPage }
