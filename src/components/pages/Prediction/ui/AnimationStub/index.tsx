'use client'
import { FC, useEffect } from 'react'
import { Animate } from './animate'
import { useAppDispatch } from '@/hooks/redux'
import { setMagicBallTimeoutFn } from '@/store/reducers/gifts'
import headCls from '../Head/index.module.css'
import predictionPreviewCls from '../Prediction/Preview/index.module.css'
import predictionCls from '../Prediction/index.module.css'
import daysCls from '../Days/index.module.css'
import predictionMessageCls from '../Prediction/Message/index.module.css'
import todayBonusCls from '../TodayBonus/index.module.css'
import collectBonusesCls from '../CollectBonuses/index.module.css'

const AnimationStub: FC = ({}) => {
	const { magicBallBtnTimeout } = Animate({
		dayTitle: headCls.dayTitle,
		daySubtitle: headCls.daySubtitle,
		magicBallBtn: predictionPreviewCls.magicBallBtn,
		predictionSubtitle: predictionCls.predictionSubtitle,
		daysItem: daysCls.daysItem,
		daysItemActive: daysCls.active,
		predictionContent: predictionMessageCls.predictionContent,
		predictionWrapper: predictionMessageCls.predictionWrapper,
		todayBonus: todayBonusCls.todayBonus,
		collectBonusesBtn: collectBonusesCls.collectBonusesBtn,
	})
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch({
			type: setMagicBallTimeoutFn.type,
			payload: {
				state: magicBallBtnTimeout,
			},
		})
	}, [])

	return <></>
}

export default AnimationStub
