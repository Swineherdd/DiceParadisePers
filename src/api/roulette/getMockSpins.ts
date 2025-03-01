
import { IRouletteSpinResponse } from './getSpins' 
import { getTicketsBalance } from '../user/balance' 
import { getChatId } from '../user/chatId' 


export const mockSpinRoulette = async ({
	chat_id,
	spins_qnt,
}: {
	chat_id: number
	spins_qnt: number
}): Promise<IRouletteSpinResponse> => {

	const balanceResponse = await getTicketsBalance()
	const balance = balanceResponse.data.total_amount


	const costPerSpin = 1 


	const totalCost = costPerSpin * spins_qnt


	if (balance < totalCost) {
		return {
			error: {
				type: 'notEnough',
				message: 'Недостаточно средств для участия.',
			},
		}
	}


	console.log(`Списано ${totalCost} билетов с баланса пользователя ${chat_id}`)

	
	return {
		prizes: [
			{ name: 'Lucky Potion ' },
			{ name: "Dead Man's Chest" },
			{ name: "Dead Man's Third" },
		],
	}
}
