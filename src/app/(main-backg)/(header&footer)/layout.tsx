import { HeaderAndFooterLayout } from '@/layouts/HeaderAndFooterLayout'
import { IChildren } from '@/types'
import { FC } from 'react'

interface Props extends IChildren {}
const HeaderAndFooter: FC<Props> = ({ children }) => {
	return <HeaderAndFooterLayout>{children}</HeaderAndFooterLayout>
}

export default HeaderAndFooter
