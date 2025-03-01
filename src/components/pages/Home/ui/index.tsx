import { FC } from 'react'
import { ReferralsBtn } from './ReferralsBtn'
import { Content } from './Content'
import { MotionScaleAnim } from '@/components/shared'

interface Props {}
const HomePage: FC<Props> = ({}) => {
	return (
		<MotionScaleAnim className='grow-[1] mt-[40px] w-[300px] text-black'>
			<ReferralsBtn />
			<Content className='mt-[20px]' />
		</MotionScaleAnim>
	)
}

export { HomePage }
