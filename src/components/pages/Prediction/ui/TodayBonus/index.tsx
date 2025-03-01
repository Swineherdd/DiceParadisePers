import { FC } from 'react'
import cls from './index.module.css'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface Props {
	todayBonus: number
}
const TodayBonus: FC<Props> = ({ todayBonus }) => {
	const t = useTranslations('predictionPage')
	return (
		<h2 className={`${cls.mainText} ${cls.todayBonus}`}>
			<span>
				{t.raw('todayBonus')[0]} {todayBonus}
				<Image src='/images/ticket.png' alt='Ticket' width={25} height={20} />
			</span>
			<span>{t.raw('todayBonus')[1]}</span>
		</h2>
	)
}

export default TodayBonus
