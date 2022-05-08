import React, { useState, createContext, useEffect } from 'react'

const listContext = createContext()

function ListProvider({ children }) {

    const __storage = JSON.parse(localStorage.getItem('items')) ?? []
    const [items, setItems] = useState(__storage)
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
    }, [items])

    const value = {
        items,
        setItems
    }

    return <listContext.Provider value={value}>{children}</listContext.Provider>
}
export { ListProvider, listContext };
