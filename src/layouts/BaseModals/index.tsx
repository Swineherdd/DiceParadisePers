import MainError from '@/components/modals/main-error'
import MainSuccess from '@/components/modals/main-success'
import { IChildren } from '@/types'
import { FC } from 'react'

interface Props extends IChildren {}
const BaseModals: FC<Props> = ({ children }) => {
	return (
		<>
			{children}
			<MainError />
			<MainSuccess />
		</>
	)
}

export { BaseModals }
