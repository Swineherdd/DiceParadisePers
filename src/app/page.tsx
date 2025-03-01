'use client'
import { PredictionPage as Prediction } from '@/components/pages/Prediction'
import { getUserBonus, IGetUserBonusResponse } from '@/api/user/bonuses'
import { redirect, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Script from 'next/script'

const PredictionPage: FC = () => {
	const router = useRouter()
	const [data, setData] = useState<IGetUserBonusResponse | undefined>(undefined)
	useEffect(() => {
		const fetchData = async () => {
			getUserBonus()
				.then(res => {
					setData(res.data)
				})
				.catch(e => {
					console.log(e)
					router.push('/load')
				})
		}
		fetchData()
	}, [router])

	if (data?.status === 'visited_today') return redirect('/load')

	if (data)
		return (
			<>
				<Prediction
					currentDay={data.currentDay}
					todayBonus={data.currentDay}
					prediction={data.prediction}
				/>
				<Script
					src='https://telegram.org/js/telegram-web-app.js'
					strategy='beforeInteractive'
				/>
			</>
		)
	return null
}

export default PredictionPage
