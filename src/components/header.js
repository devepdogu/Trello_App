import {
    Avatar, Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'

export default function Header() {

    return (
        <div className="app__header">
            <h1>Trello APP</h1>
            <div className="app__header__right">
                <div className='app__header__search'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type={"text"} placeholder="Bir şeyler ara" />
                </div>
                <Menu>
                    <MenuButton>
                        <Avatar name='Doğukan Demir' src='https://bit.ly/tioluwani-kolawole' />
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