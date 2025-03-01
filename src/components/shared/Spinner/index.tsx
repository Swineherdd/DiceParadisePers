import { FC } from 'react'
import cls from './index.module.css'
interface Props {
	className?: string
	background?: string
}
const Spinner: FC<Props> = ({
	className,
	background = 'rgba(0, 0, 0, 0.9)',
}) => {
	return (
		<div
			className={`${className} ${cls.wrapper}`}
			style={{
				// @ts-ignore
				'--bg': background,
			}}
		>
			<span className={cls.loader}></span>
		</div>
	)
}
export { Spinner }
