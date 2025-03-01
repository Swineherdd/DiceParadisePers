import { useLayoutEffect } from 'react'
import gsap from 'gsap'

export const Animate = (cls: Record<string, string>) => {
	const {
		craftArea,
		craftLightLeft,
		craftLightRight,
		craftRubinDecor,
		craftRubinDecorBg,
	} = cls

	useLayoutEffect(() => {
		if (typeof window !== undefined) {
			const tl = gsap.timeline()

			tl.fromTo(
				craftArea,
				{
					boxShadow: '0 0 10px 3px rgba(255,255,255,1)',
					duration: 1,
					delay: 1000,
				},
				{
					boxShadow: '0 0 10px 3px rgba(255,255,255,0.65)',
					duration: 0.7,
					yoyo: true,
					repeat: -1,
				}
			)
				.fromTo(
					craftLightLeft,
					{
						backgroundImage:
							'linear-gradient(87deg, rgba(0, 0, 0, 0) 0%, rgba(82, 125, 172, 0.35) 27%, rgba(0, 0, 0, 0) 45%)',
						duration: 3,
					},
					{
						backgroundImage:
							'linear-gradient(87deg, rgba(0, 0, 0, 0) 26%, rgba(82, 125, 172, 0.2) 43%, rgba(0, 0, 0, 0) 91%)',
						duration: 2,
						repeat: -1,
						yoyo: true,
					}
				)
				.fromTo(
					craftLightRight,
					{
						delay: 1000,
						backgroundImage:
							'linear-gradient(-87deg, rgba(0, 0, 0, 0) 0%, rgba(82, 125, 172, 0.35) 27%, rgba(0, 0, 0, 0) 45%)',
						duration: 3,
					},
					{
						backgroundImage:
							'linear-gradient(-87deg, rgba(0, 0, 0, 0) 26%, rgba(82, 125, 172, 0.2) 43%, rgba(0, 0, 0, 0) 91%)',
						duration: 2,
						repeat: -1,
						yoyo: true,
					}
				)
				.fromTo(
					craftRubinDecor,
					{
						opacity: 1,
						scale: 0.7,
					},
					{
						opacity: 0.4,
						yoyo: true,
						repeat: -1,
						scale: 1.2,
						duration: 0.7,
						ease: 'power3.in',
					},
					0
				)
				.fromTo(
					craftRubinDecorBg,
					{
						backgroundImage:
							'linear-gradient(45deg, transparent 100%, #ffffff, transparent 130%)',
					},
					{
						duration: 1.5,
						ease: 'power4.in',
						repeat: -1,
						backgroundImage:
							'linear-gradient(45deg, transparent -30%, #ffffff, transparent 0%)',
					},
					0
				)

			return () => {
				tl.kill()
			}
		}
	}, [])
}
