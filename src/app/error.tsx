'use client'

import { useRouter } from 'next/navigation'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	const router = useRouter()
	console.log(error)

	return (
		<div className='flex-col flex-wrap flex justify-center items-center min-h-screen max-w-[90%] m-auto'>
			<h2 className='font-poppins text-1xl'>Something went wrong!</h2>
			<button
				onClick={() => {
					router.refresh()
					reset()
				}}
				className='font-montserrat text-xl text-sky-500 underline decoration-sky-500 underline-offset-[6px] decoration-2 active:text-sky-700 active:decoration-sky-700 duration-100'
			>
				Try again
			</button>
		</div>
	)
}
