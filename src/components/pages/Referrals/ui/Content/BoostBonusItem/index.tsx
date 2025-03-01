import { FC } from 'react'

interface Props {
	className?: string
	children: string
	percent: {
		current: number
		next: number | 'infinite'
	}
	activePercent: number
}
const BoostBonusItem: FC<Props> = ({
	children,
	percent,
	activePercent,
	className,
}) => {
	const isActive =
		activePercent >= percent.current &&
		(percent.next === 'infinite' || activePercent < percent.next)
	return (
		<li className='flex items-center gap-x-[6px]'>
			<div
				className={`rounded-[50%] bg-[#d8855f] p-[3px] border-[0.5px] duration-100 border-solid border-black ${
					!isActive && 'opacity-0'
				}`}
			/>

			<h2 className={`${className}`}>{children}</h2>
		</li>
	)
}

export { BoostBonusItem }
