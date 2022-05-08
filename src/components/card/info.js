import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Textarea,
    Tag,
    Input,
    TagLabel, TagCloseButton, Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,

    PopoverArrow,
    PopoverCloseButton,

} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react';
import { listContext } from '../listContext';
import style from '../../styles/info.module.scss'
import Colors from '../colors'
import $ from 'jquery'
import { uniqid } from '../../utils/functions';
export default function Info({ onClose, isOpen, _item, cart }) {
    const { items, setItems } = useContext(listContext)
    const [activeColor, setActiveColor] = useState(_item?.bgColor ?? "default")

    const [tempTags, setTempTags] = useState(_item?.tags ?? []);
    useEffect(() => {
        setItems((prev) => {
            return prev.map((e) => {
                if (e.id === cart.id) {
                    e.cart = e.cart.map((k) => {
                        if (k.id === _item.id) {
                            k.bgColor = activeColor
                        }
                        return k
                    })
                }
                return e
            })
        })
    }, [activeColor])


    if (typeof _item?.title === "undefined")
        return <></>

    const handleSaveOptions = (e) => {

        $('.chakra-modal__close-btn').trigger("click")

        setItems((prev) => {
            return prev.map((e) => {
                if (e.id === cart.id) {
                    e.cart = e.cart.map((k) => {
                        if (k.id === _item.id) {
                            k["detail"] = $('.info__detail__area').val()
                            k["tags"] = tempTags
                        }
                        return k
                    })
                }
                return e
            })
        })
    }

    const handleDeleteCard = () => {
        $('.chakra-modal__close-btn').trigger("click")

        setItems((prev) => {
            return prev.map((e) => {
                if (e.id === cart.id) {
                    e.cart = e.cart.filter((_e) => _e.id !== _item.id)
                }
                return e
            })
        })
        console.log(items, _item.id)
    }
    const handleAddTag = (e) => {
        if (e.key === "Enter") {
            if ($(e.target).val() != "") {
                setTempTags((prev) => [...prev, { tag: $(e.target).attr("data-value"), bgColor: "default__tag", id: uniqid(5) }]);
                $(e.target).val("")
            }
            else
                $(e.target).focus()
        }
    }
    return <>
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"outside"} size={"3xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {_item.title}
                    <small>{cart.title} listesinde</small>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormLabel>Arka Plan</FormLabel>
                    <Colors activeColor={activeColor} size={"small"} setActiveColor={setActiveColor}></Colors>

                    <div className={style.info__comment}>
                        <FormControl>
                            <FormLabel>Açıklama</FormLabel>
                            <Textarea
                                placeholder='Açıklama gir'
                                size='sm'
                                className='info__detail__area'
                                resize={"vertical"}
                                defaultValue={_item?.detail ?? ""}
                            />
                        </FormControl>
                    </div>

                    <div className={style.info__tags}>
                        <FormControl>
                            <FormLabel>Etiketler</FormLabel>
                            <FormControl>
                                <Tooltip label="Kaydetmek için Enter ' a bas." aria-label='A tooltip'>
                                    <Input placeholder='Etiket Gir' onKeyDown={(e) => handleAddTag(e)} />
                                </Tooltip>
                            </FormControl>
                            <div className={style.tag__con}>
                                {
                                    tempTags.map((e, i) => (
                                        <Tag
                                            size={"md"}
                                            borderRadius='full'
                                            variant='solid'
                                            colorScheme={'green'}
                                            key={i}
                                        >
                                            <TagLabel>{e.tag}</TagLabel>

                                            <TagCloseButton onClick={() => setTempTags((prev) => {
                                                return prev.filter((_e) => _e.id !== e.id)
                                            })} />
                                        </Tag>
                                    ))
                                }
                            </div>
                        </FormControl>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <button className='btn__danger' onClick={handleDeleteCard}>Sil</button>
                    <button className='btn__primary' onClick={handleSaveOptions}>Kaydet</button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}