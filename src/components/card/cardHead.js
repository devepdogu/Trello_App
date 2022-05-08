import '../../styles/list.scss'
import useDisclosure from '../../hooks/useDisclosure'
import Info from './info'
import {
    Tooltip
} from '@chakra-ui/react'
import { colors } from '../data'
import $ from 'jquery'
import React, { useContext, useEffect, useState } from 'react';
import { listContext } from '../listContext';
export default function CardHead({ _provided, _item, cart }) {
    const { items, setItems } = useContext(listContext)
    const { isOpen, onClose, setOptionOpen, openedId } = useDisclosure()

    const getItemStyle = (draggableStyle) => ({
        backgroundColor: colors.find((cl) => cl.title === _item.bgColor).color,
        ...draggableStyle
    });

    const handleSetCard = (e) => {
        // $(e.target).fadeOut(0)
        // $(e.target).parent().find('.list__card__set').fadeIn(0).removeAttr('hidden')
        let $div = $(e.target);
        if ($(e.target).prop('tagName').toLowerCase() !== "i" && $(e.target).prop('tagName').toLowerCase() !== "textarea" && $(e.target).prop('tagName').toLowerCase() !== "button") {
            if ($(e.target).prop('tagName').toLowerCase() === "span")
                $div = $(e.target).parent()

            $div.find('.list__card__title').fadeOut(0)
            $div.find('.list__card__set').fadeIn(0).removeAttr('hidden').find("textarea").focus()

        }
    }


    const saveCard = (e) => {
        let $div = $(e.target).parents('.list__card__item');
        setItems((prev) => {
            return prev.map((m) => {
                if (m.id === cart.id) {
                    m.cart = m.cart.map((k) => {
                        if (k.id === _item.id) {
                            k.title = $div.find('.list__card__set textarea').val()
                        }
                        return k
                    })
                }
                return m
            })
        })
        $div.find('.list__card__title').fadeIn(0)
        $div.find('.list__card__set').fadeOut(0).attr('hidden', true).find("textarea")
        $('.focusLoseInput').focus()
    }

    const closeSetCard = (e) => {
        let $div = $(e.target).parents('.list__card__item');
        $div.find('.list__card__title').fadeIn(0)
        $div.find('.list__card__set').fadeOut(0).attr('hidden', true).find("textarea")
        $('.focusLoseInput').focus()
    }
    return <>
        <div

            ref={_provided.innerRef}
            {..._provided.draggableProps}
            {..._provided.dragHandleProps}
            style={getItemStyle(
                _provided.draggableProps.style
            )}
            onClick={handleSetCard}
            className={`list__card__item`}>
            {
                typeof _item?.tags !== "undefined" && _item?.tags.length > 0 && (
                    _item.tags.map((t, i) => (
                        <Tooltip key={i} label={t.tag} aria-label='A tooltip'><span className='list__card__tag' style={{ backgroundColor: colors.find((cl) => cl.title === t.bgColor).color }}></span></Tooltip>
                    ))
                )
            }
            <span className="list__card__title">
                {_item.title}
            </span>
            
            <div hidden className='list__card__set'>
                <textarea defaultValue={_item.title}></textarea>
                <div>
                    <button className='btn__primary' onClick={saveCard}>Kaydet</button>
                    <i className="fa-solid fa-xmark" onClick={closeSetCard}></i>
                </div>
            </div>
            {
                typeof _item?.detail !== "undefined" && _item?.detail !== "" && (<i className="fa-solid fa-circle-info list__card__detail"></i>)
            }
            <button onClick={() => setOptionOpen(_item.id)}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>

        </div>
        <Info isOpen={isOpen} onClose={onClose} _item={_item} cart={cart}></Info>
    </>

}