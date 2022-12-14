import Head from 'next/head'
import EventCard from '../src/Componets/EventCard'
import EditCard from '../src/Componets/EditCard'
import { useContext, useEffect } from 'react';
import { NavContext, SectionsContext } from '../src/Componets/Context';

export default function Events() {

    const [sections] = useContext(SectionsContext)
    const [page, setPage] = useContext(NavContext)


    useEffect(() => {
        if (page === "Events") return;
        setPage("Events")
    }, [])


    return (
        <div>
            <Head>
                <title>Royal Priesthood Dashboard | Events</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {
                sections?.map((section) => (
                    <EditCard document={section} collection="Events" key={section} />
                ))
            }
        </div>
    )
}
