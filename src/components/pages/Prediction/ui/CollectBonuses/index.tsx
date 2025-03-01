'use client'
import { FC, MouseEvent } from 'react'
import { claimBonus } from '@/api/user/bonuses'
import { useRouter } from 'next/navigation'
import cls from './index.module.css'
import { useTranslations } from 'next-intl'

const CollectBonusesBtn: FC = ({}) => {
	const router = useRouter()
	const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
		await claimBonus()
		router.push('/load')
	}
	const t = useTranslations('predictionPage')

	return (
		<button className={`${cls.collectBonusesBtn}`} onClick={handleClick}>
			<p className={`${cls.mainText}`}>{t('collectBonus')}</p>
		</button>
	)
}

export default CollectBonusesBtn
