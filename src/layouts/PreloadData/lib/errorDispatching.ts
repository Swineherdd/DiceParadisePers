import { setErrorData } from '@/store/reducers/error'

export const errorDispatching = (dispatch: any) => {
	return (error: any) => {
		dispatch(setErrorData({ hasError: true, error }))
	}
}
