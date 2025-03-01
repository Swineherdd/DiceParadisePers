'use client'

import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// анимации
import { motion } from 'framer-motion'
import { IClassName } from '@/types'
import { craftIcon, homeIcon, questionIcon } from '../config/image'
const variants = {
	hidden: { opacity: 0, scale: 0.5 },
	visible: { opacity: 1, scale: 1 },
}

interface Props extends IClassName {}

const Footer: FC<Props> = ({ className }) => {
	const pathname = usePathname()

	// анимация при нажатии
	const [isBouncing, setIsBouncing] = React.useState<{
		home: boolean
		map: boolean
		command: boolean
		quests: boolean
	}>({ home: false, map: false, command: false, quests: false })
	const handleClick = (btn: {
		home: boolean
		map: boolean
		command: boolean
		quests: boolean
	}) => {
		setIsBouncing(btn)
		setTimeout(
			() =>
				setIsBouncing({
					home: false,
					map: false,
					command: false,
					quests: false,
				}),
			300
		) // Длительность анимации
	}
	return (
		<footer
			className={`relative flex flex-row gap-3 justify-center items-center w-full ${className}`}
		>
			<motion.div
				initial='hidden'
				animate='visible'
				variants={variants}
				transition={{ duration: 0.5 }}
				className='relative z-[1]'
			>
				<Link
					href={'/home'}
					onClick={() => handleClick({ ...isBouncing, home: true })}
					className={`relative z-[1] flex flex-col gap-0 items-center justify-center ${
						isBouncing.home && 'scale-[0.9]'
					} transition-[300]`}
				>
					<div
						className={`relative min-400:w-[90px] min-400:h-[90px] w-[75px] h-[75px] ${
							isBouncing.home
								? 'shadow-none'
								: `${
										pathname == '/home'
											? 'shadow-none'
											: 'drop-shadow-[4px_6px_3px_rgba(0,0,0,0.59)]'
								  }`
						} transition-[300]`}
					>
						<Image {...homeIcon[0]} />
					</div>
					<p className='text-black font-bold text-[15px] min-400:text-[19px]'>
						Home
					</p>
				</Link>
			</motion.div>

			<motion.div
				initial='hidden'
				animate='visible'
				variants={variants}
				transition={{ duration: 0.9 }}
				className='relative z-[1]'
			>
				<Link
					href={'/craft'}
					onClick={() => handleClick({ ...isBouncing, map: true })}
					className={`relative z-[1] flex flex-col gap-0 items-center justify-center ${
						isBouncing.map && 'scale-[0.9]'
					} transition-[300]`}
				>
					<div
						className={`relative min-400:w-[90px] min-400:h-[90px] w-[75px] h-[75px] ${
							isBouncing.map
								? 'shadow-none'
								: `${
										pathname == '/map'
											? 'shadow-none'
											: 'drop-shadow-[4px_6px_3px_rgba(0,0,0,0.59)]'
								  }`
						} transition-[300]`}
					>
						<Image {...craftIcon[0]} />
					</div>
					<p className='text-black font-bold text-[15px] min-400:text-[19px]'>
						Craft
					</p>
				</Link>
			</motion.div>

			<motion.div
				initial='hidden'
				animate='visible'
				variants={variants}
				transition={{ duration: 1.3 }}
				className='relative z-[1]'
			>
				<Link
					href={'/lottery'}
					onClick={() => handleClick({ ...isBouncing, command: true })}
					className={`relative z-[1] flex flex-col gap-0 items-center justify-center ${
						isBouncing.command && 'scale-[0.9]'
					} transition-[300]`}
				>
					<div
						className={`relative min-400:w-[90px] min-400:h-[90px] w-[75px] h-[75px] ${
							isBouncing.command
								? 'shadow-none'
								: `${
										pathname == '/comand'
											? 'shadow-none'
											: 'drop-shadow-[4px_6px_3px_rgba(0,0,0,0.59)]'
								  }`
						} transition-[300]`}
					>
						<Image {...questionIcon[0]} />
					</div>
					<p className='text-black font-bold text-[15px] min-400:text-[19px]'>
						Secret
					</p>
				</Link>
			</motion.div>

			<motion.div
				initial='hidden'
				animate='visible'
				variants={variants}
				transition={{ duration: 1.7 }}
				className='relative z-[1]'
			>
				<Link
					href={'#'}
					onClick={() => handleClick({ ...isBouncing, quests: true })}
					className={`relative z-[1] flex flex-col gap-0 items-center justify-center ${
						isBouncing.quests && 'scale-[0.9]'
					} transition-[300]`}
				>
					<div
						className={`relative min-400:w-[90px] min-400:h-[90px] w-[75px] h-[75px] ${
							isBouncing.quests
								? 'shadow-none'
								: `${
										pathname == '/quests'
											? 'shadow-none'
											: 'drop-shadow-[4px_6px_3px_rgba(0,0,0,0.59)]'
								  }`
						} transition-[300]`}
					>
						<Image {...questionIcon[0]} />
					</div>
					<p className='text-black font-bold text-[15px] min-400:text-[19px]'>
						Secret
					</p>
				</Link>
			</motion.div>

			<div className='bg-[#ece4cf] absolute left-0 bottom-0 h-[50px] w-full blur-[3px]'></div>
		</footer>
	)
}

export { Footer }
