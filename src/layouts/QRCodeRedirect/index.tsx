'use client'

import { useRouter } from 'next/navigation'

// hooks
import { FC, ReactNode, useEffect } from 'react'

// telegram
import WebApp from '@twa-dev/sdk'
import { getUserBonus } from '@/api/user/bonuses'
import { useAppDispatch } from '@/hooks/redux'
import { setErrorData } from '@/store/reducers/error'

export const QRCodeRedirect: FC<
	Readonly<{
		children: ReactNode
	}>
> = ({ children }) => {
	const dispatch = useAppDispatch()

	const router = useRouter()
	// !Модальное окно для подветрждения выхода из страницы или её обновления
	const handleBeforeUnload = (event: any) => {
		event.preventDefault()
		event.returnValue = 'as'
		return ''
	}

	useEffect(() => {
		// *если пользователь зашёл не с телефона а с компа тогда выдаём ошибку
		if (typeof window !== 'undefined' && WebApp.platform == 'tdesktop') {
			console.log('test qr code')

			return router.push('/not_supported')
		}
		window.addEventListener('beforeunload', handleBeforeUnload)

		const fetchData = async () => {
			getUserBonus()
				.then(res => {
					if (res.data.status !== 'visited_today') router.push('/')
				})
				.catch(error => {
					dispatch({
						type: setErrorData.type,
						payload: {
							error,
							hasError: true,
						},
					})
				})
		}
		fetchData()

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [])

	return <>{children}</>
}
