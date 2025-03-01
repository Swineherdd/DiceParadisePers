import { IChildren } from '@/types'
import { FC } from 'react'
import { Header } from '@/components/widgets/Header'
import { Footer } from '@/components/widgets/Footer'

interface Props extends IChildren {}
const HeaderAndFooterLayout: FC<Props> = ({ children }) => {
	return (
		<div className='flex flex-col h-full'>
			<Header className='pl-[19px]' />
			<div className='grow-[1] px-[19px] mb-[16px]'>{children}</div>
			<Footer />
		</div>
	)
}

export { HeaderAndFooterLayout }
