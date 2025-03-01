import { FC } from 'react'
import { Head } from './Head'
import { Content } from './Content'
import { Roulette } from './Roulette'
import { SpinBtns } from './SpinBtns'

interface Props {}
const LotteryPage: FC<Props> = ({}) => {
	return (
		<div className='text-black'>
			<Head className='pt-4 ' />
			<div className=' mt-4 bg-white border-[1px] border-solid border-black rounded-[10px]'>
				<Content className='' />
				<Roulette className='' />
				<SpinBtns className='mt-4 px-[15px] pb-[25px]' />
			</div>
		</div>
	)
}

export { LotteryPage }
