import { FC, ReactNode } from 'react'

interface Props {
	className?: string
	title: string
	content: ReactNode
}
const BoostInfoItem: FC<Props> = ({ content, title, className }) => {
	return (
		<li
			className={`flex gap-y-[10px] flex-wrap py-[10px] ${className}`}
			style={{
				borderTop: '1px solid #d9d9d9',
			}}
		>
			<h2 className='w-full text-[13px]'>{title}</h2>
			<div className='flex gap-x-[7px] items-center text-[#d8855f] text-[17px]'>
				{content}
			</div>
		</li>
	)
}

export { BoostInfoItem }
