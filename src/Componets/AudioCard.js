import React from 'react'

function AudioCard({data}) {
    return (
        <div className='w-full h-20 flex flex-row justify-between items-center gap-5 px-2' >
            <div className='w-16 h-12 rounded-full flex flex-col bg-slate-400 text-white font-bold' >
                {/* <p className="self-center" >&#62;</p> */}
            </div>
            <div className="w-full h-fit flex flex-col justify-between items-start gap-3 normal__text font-semibold" >
                <div>
                    <p>{data?.Title}</p>
                </div>
                <div className="w-full h-fit" >
                    <div className="w-full h-2 rounded-full bg-slate-400 overflow-hidden" >
                        <div className="w-1/2 h-full bg-main-blue" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AudioCard