import TonProvider from '@/layouts/TonConnectUIProvider'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { getUserLocale } from '@/api/user/language'
import { WebAppInitialization } from '@/layouts/WebAppInitialization'
import { QRCodeRedirect } from '@/layouts/QRCodeRedirect'
import { ReduxProvider } from '@/layouts/ReduxProvider'
import { PreloadImages } from '@/layouts/PreloadImages'
import { Poppins } from 'next/font/google'
import { RedirectLoad } from '@/layouts/RedirectLoad'
import { PreloadData } from '@/layouts/PreloadData'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const user_locale = (await getUserLocale()) || 'en'
	const locale =
		user_locale === 'ru' || user_locale === 'en' ? user_locale : 'en'
	const messages = await getMessages()
	return (
		<html lang={locale}>
			<head>
				<link rel='manifest' href='/manifest.json' />
			</head>
			<body className={`${poppins.className}`}>
				<NextIntlClientProvider messages={messages}>
					<TonProvider>
						<ReduxProvider>
							<WebAppInitialization>
								<PreloadData>
									<PreloadImages>
										<RedirectLoad>
											<QRCodeRedirect>{children}</QRCodeRedirect>
										</RedirectLoad>
									</PreloadImages>
								</PreloadData>
							</WebAppInitialization>
						</ReduxProvider>
					</TonProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
