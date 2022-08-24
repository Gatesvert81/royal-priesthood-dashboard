import React, { useContext, useEffect, useState } from 'react'
import AnchorLink from './AnchorLink'
import Button from './Button'
import { NavContext } from './Context'

function Navigation() {

    const [show, handleShow] = useState(false)

    const [page, setPage] = useContext(NavContext)

    useEffect(() => {
        const myFunc = () => {
            if (window.scrollY > 50) {
                handleShow(true);
            } else handleShow(false);
        }
        window.addEventListener("scroll", myFunc)
        return () => {
            window.removeEventListener("scroll", myFunc)
        }
    }, [])

    return (
        <>
            <nav className={`w-full h-fit fixed top-0 left-0 px-10 py-2 flex flex-row z-10 justify-between items-center ${show ? "bg-faded-white backdrop-blur" : null} `} >
                <div>
                    logo
                </div>
                <div className='medium__text text-main-blue capitalize' >
                    {page}
                </div>
                <div className='flex flex-row justify-between items-center gap-1' >
                    <div className="w-8 h-6 rounded-full bg-blue-300" />
                    <div className='w-full h-fit flex flex-col justify-between small__text'>
                        <p>Dee</p>
                        <p className='small__text font-normal'>Admin 1</p>
                    </div>
                </div>
            </nav>
            <nav className='w-40 h-fit hidden fixed top-14 left-0 bg-white z-10 flex-col justify-start items-start pr-5 rounded-md shadow-lg' >
                <div className='w-full pb-2 medium__text text-center' >Pages</div>
                <div className='grid__items gap-1' >
                    <AnchorLink route="/" >
                        <Button
                            style={`sideNav__btn ${page === "Home" ? "selected" : null}`}
                            click={() => setPage("Home")} >
                            Home
                        </Button>
                    </AnchorLink>
                    <AnchorLink route="/about" >
                        <Button
                            style={`sideNav__btn ${page === "About" ? "selected" : null}`}
                            click={() => setPage("About")}
                        >
                            About
                        </Button>
                    </AnchorLink>
                    <AnchorLink route="/ministry" >
                        <Button
                            style={`sideNav__btn ${page === "Ministry" ? "selected" : null}`}
                            click={() => setPage("Ministry")}
                        >
                            Ministry
                        </Button>
                    </AnchorLink>
                    <AnchorLink route="/events" >
                        <Button
                            style={`sideNav__btn ${page === "Events" ? "selected" : null}`}
                            click={() => setPage("Events")}
                        >
                            Events
                        </Button>
                    </AnchorLink>
                </div>
            </nav>
        </>
    )
}

export default Navigation