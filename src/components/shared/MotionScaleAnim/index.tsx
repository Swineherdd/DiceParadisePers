'use client'
import { IChildren, IClassName } from '@/types'
import { FC } from 'react'
import { motion } from 'framer-motion'

interface Props extends IClassName, IChildren {}
const variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1 },
}
const MotionScaleAnim: FC<Props> = ({ className, children }) => {
	return (
		<motion.section
			initial='hidden'
			animate='visible'
			variants={variants}
			transition={{ duration: 0.5 }}
			className={className}
		>
			{children}
		</motion.section>
	)
}

export { MotionScaleAnim }
