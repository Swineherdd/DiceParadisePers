import { FC } from 'react'
import cls from './index.module.css'
import { useTranslations } from 'next-intl'

interface Props {
	currentDay: number
}
const Head: FC<Props> = ({ currentDay }) => {
	const t = useTranslations('predictionPage')
	return (
		<div className={`${cls.container}`}>
			<h1 className={`${cls.mainText} ${cls.dayTitle}`}>
				{currentDay} {t('title')}
			</h1>
			<h2 className={`${cls.mainText} ${cls.daySubtitle}`}>{t('subtitle')}</h2>
		</div>
	)
}

export default Head
