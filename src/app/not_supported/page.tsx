import Image from 'next/image'
import React from 'react'

const NotSupportedPage = () => {
  return (
    <section className='absolute top-0 left-0 w-full h-[100vh] bg-white z-[2] flex flex-col justify-center items-center gap-4'>
        <p className='text-center text-black font-bold'>Sorry, <br /> but the app only works <span className='underline'>from a phone</span>.</p>
        <Image src={'/not-supported-qr-code.png'} alt='qr-code' width={300} height={200}/>
        <p className='text-center text-black font-bold'>Scan the QR code from your phone.</p>
        <Image src={'/🦄.png'} alt='icon' width={15} height={15} className='absolute bottom-3 left-3'/>
    </section>
  )
}

export default NotSupportedPage