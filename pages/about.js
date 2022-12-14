import Head from 'next/head'
import ValueCard from '../src/Componets/ValueCard'
import EditCard from '../src/Componets/EditCard'
import { useContext, useEffect } from 'react';
import { NavContext, SectionsContext } from '../src/Componets/Context';

export default function About() {

    const [sections] = useContext(SectionsContext)
    const [page, setPage] = useContext(NavContext)


    useEffect(() => {
        if (page === "About") return;
        setPage("About")
    }, [])


    return (
        <div>
            <Head>
                <title>Royal Priesthood Dashboard | About</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {
                sections?.map((section) => (
                    <EditCard document={section} collection="About" key={section} cardName="Value" />
                ))
            }
        </div>
    )
}
