import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { money, ticket } from '../../config/image'

interface Props {
	className?: string
}
const Season: FC<Props> = ({ className }) => {
	return (
		<div
			className={`font-bold text-[13px] inline-flex flex-col flex-wrap ${className} `}
		>
			<h2 className='underline text-center decoration-black underline-offset-[3px] '>
				Season 2
			</h2>
			<div className='inline-flex gap-x-[10px] mt-[10px] justify-center'>
				<div className='flex flex-wrap flex-col items-center'>
					<h3 className=''>PRIZES</h3>
					<div className='flex items-center gap-x-[2px] -mt-[2px]'>
						<h4 className='text-purple-700'>≈ 2500</h4>
						<Image className='size-[15px]' {...money[0]} />
					</div>
				</div>
				<div className='flex flex-wrap flex-col items-center'>
					<h3 className=''>ATTEMPT</h3>
					<div className='flex items-center gap-x-[2px] -mt-[2px]'>
						<h4 className='text-sky-500'>600</h4>
						<Image className='-translate-y-[2px] size-[15px]' {...ticket[0]} />
					</div>
				</div>
			</div>
			<div className='flex mt-[15px] flex-col flex-wrap w-[85%] gap-y-[15px]'>
				<Link
					href={'#'}
					className='bg-[#e2f5ff] shadow-[2px_2px_2px_1px_#00000080] hover:shadow-none transition-[300] text-center rounded-[40px] border-solid border-[1px] border-black'
				>
					Prizes
				</Link>
				<Link
					href={'#'}
					className='bg-[#ddd9f2] shadow-[2px_2px_2px_1px_#00000080] hover:shadow-none transition-[300] text-center rounded-[40px] border-solid border-[1px] border-black'
				>
					Last wins
				</Link>
			</div>
		</div>
	)
}

export { Season }
