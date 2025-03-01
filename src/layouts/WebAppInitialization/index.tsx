'use client'
import { FC, ReactNode, useEffect } from 'react'

interface Props {
	children: ReactNode
}
const WebAppInitialization: FC<Props> = ({ children }) => {
	useEffect(() => {
		const initializeWebApp = async () => {
			try {
				const WebAppModule = await import('@twa-dev/sdk')
				const WebApp = WebAppModule.default
				WebApp.disableVerticalSwipes()
				WebApp.enableClosingConfirmation()
				WebApp.expand()
			} catch (error) {
				console.error('Ошибка при инициализации WebApp:', error)
			}
		}

		initializeWebApp()
	}, [])
	return <>{children}</>
}

export { WebAppInitialization }
