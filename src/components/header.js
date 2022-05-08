import {
    Avatar, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,

    PopoverArrow,
    PopoverCloseButton,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { listContext } from './listContext';
import Colors from './colors';
export default function Header() {
    const { items, setItems } = useContext(listContext)
    const [search, setSearch] = useState("");
    const [activeColor, setActiveColor] = useState([])

    const filteredItems = useMemo(() => {
        if (search.length > 0 || activeColor.length > 0)
            return items.map((a) => {
                a.isFilteredShowen = true;

                if (typeof a?.cart === "undefined") {
                    a.isFilteredShowen = false;
                    return a
                }
                let have = a.cart.filter((c) => {
                    if (
                        (search.length > 0 && c.title.toLowerCase().includes(search.toLowerCase())) ||
                        (search.length > 0 && typeof c?.detail !== "undefined" && c.detail.toLowerCase().includes(search.toLowerCase())) ||
                        (activeColor.includes(c.bgColor)) ||
                        (search.length > 0 && typeof c?.tags !== "undefined" && c.tags.some((a) => a.tag.toLowerCase().includes(search.toLowerCase())))
                    )
                        return c

                })
                if (have.length === 0) {
                    a.isFilteredShowen = false;
                    return a
                }

                return a
            })
        else
            return items.map((k) => {
                k.isFilteredShowen = true
                return k
            })
    }, [search, activeColor])

    useEffect(() => {
        setItems(filteredItems)
    }, [search, activeColor])
    return (
        <div className="app__header">
            <h1>Trello APP</h1>
            <div className="app__header__right">
                <div className='app__header__search'>
                    <i className="fa-solid fa-magnifying-glass"></i>

                    <Popover>
                        <PopoverTrigger>
                            <input type={"text"} spellCheck={false} placeholder="Bir şeyler ara" onClick={(e) => e.target.focus()} onInput={(e) => setSearch(e.target.value)} />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Renk ile ara</PopoverHeader>
                            <PopoverBody>
                                <Colors activeColor={activeColor} setActiveColor={setActiveColor}></Colors>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </div>
                <Menu>
                    <MenuButton>
                        <Avatar name='Doğukan Demir' />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>My Profile</MenuItem>
                        <MenuItem>Log out</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    )
}