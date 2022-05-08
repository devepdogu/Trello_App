import './../../styles/list.scss'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react'
export default function ListHead({ provided, item, btnRef, setOptionOpen, deleteList }) {
    return <>
        <div className='list__head'   {...provided.dragHandleProps}>
            <div data-auto-click="1">
                <textarea defaultValue={item.title} spellCheck="false" data-disabled={true}></textarea>
            </div>
            <div>

                <Menu>
                    <MenuButton>
                        <i className="fa-solid fa-ellipsis"></i>
                    </MenuButton>
                    <MenuList>
                        <MenuItem ref={btnRef} onClick={() => setOptionOpen(item.id)}>Ayarlar</MenuItem>
                        <MenuItem onClick={() => deleteList(item.id)}>Sil</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>

    </>
}