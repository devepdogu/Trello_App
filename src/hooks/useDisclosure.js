import { useState, useEffect } from "react"
const useDisclosure = () => {
    const [isOpen, onOpen] = useState(false)
    const [openedId, setOpenedId] = useState(null)

    const onClose = () => {
        onOpen(false);
        setOpenedId(null)
    }

    const setOptionOpen = (id) => {
        onOpen(true);
        setOpenedId(id)
    }

    return {
        isOpen, onOpen, onClose, setOptionOpen, openedId
    }

}



export default useDisclosure