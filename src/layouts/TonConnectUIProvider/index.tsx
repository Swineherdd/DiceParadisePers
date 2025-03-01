'use client'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

export default function TonProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<TonConnectUIProvider
			manifestUrl={
				'https://gist.githubusercontent.com/Lolobroller/f0bd0117c739ecaceffda4faa3aea17d/raw/a0c7f696ac38883306d1a1eeff9e635d530bff8e/manifest.json'
			}
		>
			{children}
		</TonConnectUIProvider>
	)
}
