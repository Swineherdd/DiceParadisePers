import { useLayoutEffect } from 'react'
import { objPrefixer } from '../../lib/objPrefixer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const Animate = (classes: Record<string, string>) => {
	const classesID = objPrefixer({ object: classes, prefix: '.' })

	const {
		dayTitle,
		daySubtitle,
		magicBallBtn,
		predictionSubtitle,
		daysItem,
		daysItemActive,
		predictionContent,
		predictionWrapper,
		todayBonus,
		collectBonusesBtn,
	} = classesID

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger)
		gsap
			.timeline()
			.fromTo(
				dayTitle,
				{
					opacity: 0,
					y: -15,
					duration: 0.2,
				},
				{
					opacity: 1,
					y: 0,
				}
			)
			.fromTo(
				daySubtitle,
				{
					opacity: 0,
					y: 15,
					duration: 0.2,
				},
				{
					opacity: 1,
					delay: 0.1,
					y: 0,
				},
				0.2
			)
			.fromTo(
				`${magicBallBtn}>img:first-child`,
				{
					scale: 0.6,
					opacity: 0,
				},
				{
					scale: 1,
					opacity: 1,
				},
				0.3
			)
			.fromTo(
				`${magicBallBtn}>img:first-child`,
				{
					scale: 1,
					opacity: 1,
				},
				{
					scale: 0.96,
					opacity: 0.9,
					yoyo: true,
					repeat: -1,
					duration: 0.8,
					delay: 0.4,
				}
			)
			.fromTo(
				`${magicBallBtn}>img:last-child`,
				{
					transform: 'rotate(-40deg)',
					opacity: 0,
				},
				{
					transform: 'rotate(2deg)',
					opacity: 1,
				},
				0.35
			)
			.fromTo(
				`${magicBallBtn}>img:last-child`,
				{
					transform: 'rotate(2deg)',
					duration: 0.8,
					transitionProperty: 'ease',
				},
				{
					transform: 'rotate(-2deg)',
					yoyo: true,
					duration: 0.8,
					transitionProperty: 'ease',
					repeat: -1,
					delay: 1,
				},
				0.35
			)
			.fromTo(
				predictionSubtitle,
				{
					opacity: 0,
					y: 10,
				},
				{ opacity: 1, y: 0, delay: 0.4 },
				0.4
			)
			.fromTo(
				daysItem,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, stagger: 0.15 },
				0.2
			)
			.fromTo(
				`${daysItem}${daysItemActive}`,
				{
					scale: 1,
				},
				{
					scale: 0.92,
					yoyo: true,
					repeat: -1,
					duration: 0.8,
					delay: 1,
				}
			)
		gsap.set(todayBonus, {
			y: -20,
			opacity: 0,
		})
		gsap.to(todayBonus, {
			scrollTrigger: {
				trigger: todayBonus,
				start: 'top bottom',
			},
			y: 0,
			opacity: 1,
			duration: 0.2,
		})

		gsap.set(collectBonusesBtn, {
			y: -20,
			opacity: 0,
		})
		gsap.to(collectBonusesBtn, {
			scrollTrigger: {
				trigger: collectBonusesBtn,
				start: 'top bottom',
			},
			y: 0,
			delay: 0.3,
			opacity: 1,
			duration: 0.2,
		})
	}, [])

	return {
		magicBallBtnTimeout: () => {
			gsap
				.timeline()
				.to(predictionContent, {
					clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					duration: 0.4,
				})
				.to(
					predictionContent,
					{
						duration: 1.2,
						opacity: 1,
					},
					'<'
				)
				.fromTo(
					predictionWrapper,
					{
						clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
						opacity: 0,
					},
					{
						clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)',
						opacity: 1,
						duration: 0.5,
					},
					'-=0.6'
				)
				.fromTo(
					`${predictionWrapper} h2`,
					{
						opacity: 0,
					},
					{ opacity: 1 },
					'-=0.1'
				)
		},
	}
}
