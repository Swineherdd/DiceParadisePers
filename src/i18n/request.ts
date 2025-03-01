import { getUserLocale } from '@/api/user/language'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
	// Provide a static locale, fetch a user setting,
	// read from `cookies()`, `headers()`, etc.
	const user_locale = (await getUserLocale()) || 'en'
	const locale =
		user_locale === 'ru' || user_locale === 'en' ? user_locale : 'en'

	return {
		locale,
		messages: (await import(`../../messages/${locale}.json`)).default,
	}
})
