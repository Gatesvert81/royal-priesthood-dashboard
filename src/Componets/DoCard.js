import React from 'react'

function DoCard({title, descripton}) {
    return (
        <div className='w-full h-fit flex flex-col justify-between p-3  gap-2 rounded shadow bg-slate-200' >
            <div className='w-8 h-8 bg-blue-300 rounded-full' ></div>
            <div className="card__title text-left" >
                <p>{title}</p>
            </div>
            <div className="normal__text" >
                <p>
                    {descripton}
                </p>
            </div>
        </div>
    )
}

export default DoCard