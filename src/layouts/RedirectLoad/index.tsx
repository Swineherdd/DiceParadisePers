'use client'
import { useAppSelector } from '@/hooks/redux'
import { IChildren } from '@/types'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

interface Props extends IChildren {}
const RedirectLoad: FC<Props> = ({ children }) => {
	const router = useRouter()
	const isLoad = useAppSelector(state => state.modals.loading_page)
	const path = usePathname()

	useEffect(() => {
		if (isLoad && path !== '/load' && path !== '/' && path !== '/not_supported')
			router.push('/load')
		if (!isLoad && path === '/load') router.push('/home')
	}, [isLoad, path, router])

	return (
		<>
			{(!isLoad ||
				path === '/' ||
				(isLoad && path === '/load') ||
				path === '/not_supported') &&
				children}
		</>
	)
}

export { RedirectLoad }
