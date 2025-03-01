import axios from 'axios'
import { api_url } from '@/constants/api-url'


export interface IPrize {
	id: number
	name: string
	image: string
}

export const getPrizes = async (page: number = 1, perPage: number = 10) => {
	try {
		const response = await axios.get<IPrize[]>(
			'https://www.dice-paradise.com/get_prizes',
			{
				params: {
					page,
					perPage, 
				},
				baseURL: api_url,
			}
		)
		return response.data
	} catch (error) {
		console.error('Error fetching prizes', error)
		throw error
	}
}
