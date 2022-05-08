import React, { useState, createContext } from 'react'

const listContext = createContext()

function ListProvider({ children }) {
    const getItems = (count) => Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        title: `item ${k}`,
        bgColor: "default"
    }));


    const [items, setItems] = useState(getItems(2))


    const value = {
        items,
        setItems
    }

    return <listContext.Provider value={value}>{children}</listContext.Provider>
}
export { ListProvider, listContext };
