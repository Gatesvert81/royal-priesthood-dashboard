import React, { createContext, useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Firebase/firebaseConfig';

export const NavContext = createContext()
export const SectionsContext = createContext()
function Context({ children }) {

    const [page, setPage] = useState("Home")
    const [sections, setSections] = useState([])

    useEffect(() => {

        console.log('here')
        const colRef = collection(db, page );
        const docSnap = getDocs(colRef)
        docSnap.then((snapshot) => {
            let home = []
            snapshot.docs.forEach((doc) => (
                home.push(doc.id)
            ))
            setSections([...home])
        })
            .catch((error) => {
                console.log(error)
            });

    }, [page])

    return (
        <NavContext.Provider value={[page, setPage]}>
            <SectionsContext.Provider value={[sections, setSections]}>
                {children}
            </SectionsContext.Provider>
        </NavContext.Provider>
    )
}

export default Context