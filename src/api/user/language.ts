declare global {
	interface Window {
		Telegram: any
	}
}

export const getUserLocale = async () => {
	return 'ru'
	if (typeof window !== 'undefined') {
		return await window.Telegram.WebApp.initDataUnsafe.user?.language_code
	}
}
