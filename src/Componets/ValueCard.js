import React from 'react'

function ValueCard({ data, index }) {
    return (
        <div className='w-full h-fit flex flex-row justify-between items-center gap-3' >
            <div className='text-7xl font-semibold' >
                <p>{`0${index + 1}`}</p>
            </div>
            <div className='w-full h-full flex flex-col justify-between items-start '>
                <p className='card__title uppercase text-left' >
                    {data?.Title}
                </p>
                <p className='small__text' >
                    {data?.Description}
                </p>
            </div>
        </div>
    )
}

export default ValueCard