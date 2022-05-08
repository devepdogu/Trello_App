import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react';
import { listContext } from './listContext';
import Colors from './colors'
import $ from 'jquery'
export default function Options({ isOpen, onClose, btnRef, itemId }) {
    const { items, setItems } = useContext(listContext)
    const [activeColor, setActiveColor] = useState(items.filter((e) => e?.id === itemId)[0]?.bgColor ?? "default")
    useEffect(() => {
        setItems((prev) => {
            return prev.map((e) => {
                if (e.id === itemId)
                    e.bgColor = activeColor
                return e
            })
        })

    }, [activeColor])

    if (itemId === null)
        return <></>
    const item = items.filter((e) => e.id === itemId)[0]
    if (item.title === null)
        return <></>

    const handleSaveOptions = (e) => {

        $('.chakra-modal__close-btn').trigger("click")
    }


    return <>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{item.title}</DrawerHeader>
                <DrawerBody>
                    <Colors activeColor={items.filter((e) => e.id === itemId)[0].bgColor} setActiveColor={setActiveColor}></Colors>
                </DrawerBody>

                <DrawerFooter>
                    <button className='btn__primary' onClick={handleSaveOptions}>Kaydet</button>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}