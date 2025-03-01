import {
	getClaimedBonus,
	getLevel,
	getRemainingTime,
	getTicketsBalance,
	getTonBalance,
} from '@/api/user/balance'
import { useAppDispatch } from '@/hooks/redux'
import {
	setLevel,
	setRemainingTime,
	setTicketsBalance,
	setTonBalance,
	setUnclaimedBonus,
} from '@/store/reducers/balance'
import { errorDispatching } from '../lib/errorDispatching'

export const homePreloadData = () => {
	const dispatch = useAppDispatch()
	return () => {
		getRemainingTime().then(({ data: { wait_time_seconds } }) => {
			dispatch(setRemainingTime({ new: wait_time_seconds }))
		})
		getLevel().then(({ data: { client_level } }) => {
			dispatch(setLevel({ new: client_level }))
		})

		typeof window !== 'undefined' &&
			localStorage.getItem('ton-wallet-address') &&
			getTonBalance({
				userWalletAddress: localStorage.getItem('ton-wallet-address') || '',
			}).then(({ data: { balance } }) => {
				dispatch(setTonBalance({ new: balance }))
			})
		getTicketsBalance()
			.then(({ data: { total_amount } }) => {
				dispatch(setTicketsBalance({ new: total_amount }))
			})
			.catch(errorDispatching(dispatch))
		getClaimedBonus().then(({ data: { total_unclaimed_bonus } }) => {
			dispatch(setUnclaimedBonus({ new: total_unclaimed_bonus }))
		})
	}
}
