import WebApp from '@twa-dev/sdk'
export const getChatId = async () => {
	if (typeof window !== 'undefined') {
		
		return await WebApp.initDataUnsafe?.user?.id
	}
	return 132
}
