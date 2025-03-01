import { FC } from 'react'

interface Props {}
const LightDecor: FC<Props> = ({}) => {
	return (
		<>
			<div
				className='craft-page-light-left absolute -translate-y-[1%] top-0 left-[12%] w-[40%] h-[63%] bg-[linear-gradient(87deg,_rgba(0,0,0,0)_22%,_rgba(82,125,172,0.4)_41%,_rgba(0,0,0,0)_53%)]'
				style={{
					clipPath: `polygon(15% 0, 48% 0, 100% 100%, 0% 100%)`,
				}}
			/>
			<div
				className='craft-page-light-right absolute -translate-y-[1%] top-0 right-[10%] w-[40%] h-[63%] bg-[linear-gradient(102deg,rgba(0,0,0,0),rgba(82,125,172,0.2)_30%,rgba(0,0,0,0))]'
				style={{
					clipPath: `polygon(48% 0, 80% 0, 100% 100%, 0% 100%)`,
				}}
			/>
		</>
	)
}

export { LightDecor }
