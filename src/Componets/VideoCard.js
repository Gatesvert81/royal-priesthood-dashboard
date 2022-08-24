import React from 'react'
import whitePreach from '../../public/white-preach.jpg'
import Image from 'next/image'

function VideoCard({ data }) {
    return (
        <div className='w-full h-40 relative ' >
            <div className='w-full h-full relative ' >
                <Image src={whitePreach} layout="fill" className="object-cover " alt="Preaching" />
            </div>
            <div className='absolute w-full h-fit bottom-0 left-0 bg-faded-white backdrop-blur p-2 flex justify-between' >
                <div className='w-full  ' >
                    <p className='card__title text-left font-semibold' >{data?.Title}</p>
                    <p className='normal__text'>{data?.Link}</p>
                </div>
                <div className='w-6 h-3 bg-red-500  self-center' />
            </div>
        </div>
    )
}

export default VideoCard