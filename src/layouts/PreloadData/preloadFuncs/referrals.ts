import { useAppDispatch } from '@/hooks/redux'
import { getReferralsInfo } from '@/api/referrals/info'
import {
	setActivateBoost,
	setBoostBonuses,
	setReferralLink,
	setReferralsNft,
	setReferralsRating,
	setTeamQuestsRating,
	setYouRatingReferrals,
	setYouRatingTeams,
} from '@/store/reducers/referralsPage'
import {
	getReferralsRating,
	getTeamsRating,
	getYouReferralsRating,
	getYouTeamsRating,
} from '@/api/referrals/rating'
import { getDiceNft, getHeadNft } from '@/api/referrals/nft'
import { addRemoteImage } from '@/store/reducers/remoteImages'

export const referralsPreloadData = () => {
	const dispatch = useAppDispatch()
	return () => {
		getReferralsInfo().then(({ data }) => {
			dispatch({
				type: setBoostBonuses.type,
				payload: {
					data: {
						currentBonus: data.currentBonus || 0,
						referralsQnt: data.referralsQnt,
						totalGames: data.totalGames,
						availableQnt: data.availableQnt,
						paidQnt: data.paidQnt,
					},
				},
			})
			dispatch({
				type: setReferralLink.type,
				payload: {
					data:
						`https://t.me/DiceParadiseBot?start=${data.referralLink}` ||
						'У вас пустая ссылка',
				},
			})
		})
		getHeadNft().then(({ data }) => {
			const images = [...new Set(data.map(item => item.image))]

			images.forEach(image => {
				dispatch(
					addRemoteImage({
						path: image,
						endingParams: [
							{
								w: 256,
							},
							{ q: 75 },
						],
					})
				)
			})
			dispatch({
				type: setReferralsNft.type,
				payload: {
					data: data,
				},
			})
		})
		getDiceNft().then(({ data }) => {
			dispatch({
				type: setActivateBoost.type,
				payload: {
					data: {
						name: data?.name,
						image: data?.image,
						percent: data?.percent,
					},
				},
			})
		})
		getReferralsRating().then(res => {
			dispatch({
				type: setReferralsRating.type,
				payload: { data: res.data },
			})
		})
		getTeamsRating().then(res => {
			dispatch({
				type: setTeamQuestsRating.type,
				payload: { data: res.data },
			})
		})
		getYouReferralsRating().then(({ data }) => {
			dispatch({
				type: setYouRatingReferrals.type,
				payload: { data },
			})
		})
		getYouTeamsRating().then(({ data }) => {
			dispatch({
				type: setYouRatingTeams.type,
				payload: { data },
			})
		})
	}
}
