import { FC } from 'react'
import { MainBackgroundLayout } from '@/layouts/MainBackground'
import { IChildren } from '@/types'
import { BaseModals } from '@/layouts/BaseModals'

interface Props extends IChildren {}
const MainBackground: FC<Props> = ({ children }) => {
	return (
		<MainBackgroundLayout>
			<BaseModals>{children}</BaseModals>
		</MainBackgroundLayout>
	)
}

export default MainBackground
