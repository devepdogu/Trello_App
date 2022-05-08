import { reorder, uniqid } from './../../utils/functions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useContext } from 'react';
import { listContext } from './../listContext';
import $ from 'jquery'
import useDisclosure from './../../hooks/useDisclosure';
import './../../styles/list.scss'
import Options from './../options';
import { colors } from './../data';
import Card from './../card/card';
import NewList from './newList';
import NewCard from './../card/newCard';
import ListHead from './listHead';

export default function List() {
    const { items, setItems } = useContext(listContext)


    const { isOpen, onClose, setOptionOpen, openedId } = useDisclosure()
    const btnRef = React.useRef()

    const handleNewCard = (e) => {
        let $this = $(e.target)
        if (!$(e.target).hasClass('new__item__a'))
            $this = $(e.target).parent()
        $this.fadeOut(0);
        $this.next().slideDown(1).find('textarea').focus()

    }
    const disableTextArea = () => {
        $('div[data-auto-click=1],.new__list').each(function () {
            $(this).find("textarea").attr("data-disabled", 1)
            return false;
        })

        $('.focusLoseInput').focus()
    }

    const handleAddCard = (e) => {
        let text = $(e.target).parent().prev();


        if (text.val().length === 0 || text.val() === "") {
            text.focus()
            return;
        }
        setItems((prev) => [...prev, { id: uniqid(10), title: text.attr("data-value"), bgColor: "default", createdTime: Math.floor(new Date().getTime() / 1000), isFilteredShowen: true }])
        text.val("")
        $(e.target).parents('.new__list__body').fadeOut(0).prev().slideDown(0)
    }

    const handleAddInsertCard = (e, id, closeImmediately = false) => {
        let text = e.parent().prev();


        if (text.val().length === 0 || text.val() === "") {
            text.focus()
            return;
        }
        setItems((prev) => {
            return prev.map((a) => {
                if (a.id === id) {
                    if (typeof a?.cart?.length !== "undefined" && a?.cart?.length > 0)
                        a["cart"] = [...a?.cart, {
                            id: uniqid(12),
                            title: text.attr("data-value"),
                            bgColor: "cart__default"
                        }]
                    else
                        a["cart"] = [{
                            id: uniqid(12),
                            title: text.attr("data-value"),
                            bgColor: "cart__default"
                        }]
                }

                return a
            })
        })
        text.val("").focus()
    }
    const deleteList = (id) => {
        setItems((prev) => {
            return prev.filter((e) => e.id !== id);
        })
    }
    const handleCloseNewCard = (e) => {
        e.parent().parent().fadeOut(0);
        e.parent().parent().prev().slideDown(1)
    }


    const onDragEnd = (result) => {
        $('.list__item__holder,.card__item__holder').remove()
        disableTextArea()

        if ((!result.destination) || (result.source.droppableId === result.destination.droppableId && result.source.index === result.destination.index)) {
            return;
        }

        if (result.destination.droppableId === "LIST__DROP")
            setItems((prev) => reorder(prev, result.source.index, result.destination.index));
        else {
            setItems((prev) => {
                let id = prev.findIndex((e) => e.id === result.source.droppableId),
                    nextId = prev.findIndex((e) => e.id === result.destination.droppableId);
                if (result.destination.droppableId === result.source.droppableId) {
                    prev[id].cart = reorder(prev[id].cart, result.source.index, result.destination.index)
                    return prev;
                }
                else {

                    const [removed] = prev[id].cart.splice(result.source.index, 1);
                    if (typeof prev[nextId]?.cart?.length !== "undefined")
                        prev[nextId].cart.splice(result.destination.index, 0, removed);
                    else
                        prev[nextId].cart = [removed]

                }
                return prev;
            });

        }

    }

    $(document).ready(() => {
        $('textarea[data-auto-click=1]').attr("readonly", true)
        $(document.body).on("input", 'textarea,input', function () {
            $(this).attr("data-value", $(this).val())
        })

        $(document.body).on("click", 'button', function () {

            if (typeof $(this).attr("data-clicked") === "string")
                $(this).removeAttr("data-clicked")
            else
                $(this).attr("data-clicked", 1)
        })
        $('div[data-auto-click=1]').on("click", function (e) {
            $(this).find("textarea").removeAttr("data-disabled").focus()

        }).on('focusout', function () {
            $(this).find("textarea").attr("data-disabled", 1)
            if ($(this).find("textarea").attr("data-value") !== "")
                setItems((prev) => {
                    return prev.map((a) => {
                        if (a.id === $(this).parents('.list__item').attr('data-rbd-draggable-id') && a.title !== $(this).find("textarea").attr("data-value"))
                            a.title = $(this).find("textarea").attr("data-value")
                        return a
                    })
                })
            else
                $(this).find("textarea").val(items.find((a) => a.id === $(this).parents('.list__item').attr('data-rbd-draggable-id'))?.title)
        })

        $('.list__card__body textarea').on('focusout', function () {
            if ($(this).val() !== "") {
                // handleAddInsertCard($(this).next().find('button'), $(this).parents('.list__item').attr('data-rbd-draggable-id'))
            }
        })



    })



    const onDragUpdate = (update, provided) => {
        if (typeof update?.destination?.index !== "undefined") {
            disableTextArea()
            $('.list__item__holder,.card__item__holder').remove()
            if (update.source.droppableId === "LIST__DROP")
                $(`.list__item__wrapper:nth-child(${update.destination.index > update.source.index ? update.destination.index + 2 : update.destination.index + 1})`).append('<div class="list__item__holder"></div>')
        }

    }
    const onDragStart = (start, provided) => {
        disableTextArea()
        if (start.source.droppableId === "LIST__DROP")
            $(`.list__item__wrapper:nth-child(${start.source.index + 1})`).append('<div class="list__item__holder"></div>')
    }

    const newProps = {
        handleNewCard: handleNewCard,
        handleCloseNewCard: handleCloseNewCard,
        handleAddCard: handleAddCard,
        length: items.length
    }
    const getItemStyle = (isDragging, draggableStyle, item) => {
        return {
            backgroundColor: colors.find((cl) => cl.title === item.bgColor).color,
            ...draggableStyle
        }
    };
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}
                onDragUpdate={onDragUpdate}>
                <Droppable droppableId="LIST__DROP" direction="horizontal" type="COLUMN"

                    isCombineEnabled={false}>
                    {(provided, snapshot) => (
                        <>
                            <div
                                ref={provided.innerRef}
                                className={"droppable__wrap"}
                                {...provided.droppableProps}
                            >
                                {items.length > 0 && items.filter((e) => e.isFilteredShowen).map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div className={`list__item__wrapper ${snapshot.isDragging ? "list__is__dragging" : ''}`}>
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`list__item`}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style,
                                                        item
                                                    )}
                                                >
                                                    <ListHead provided={provided} item={item} btnRef={btnRef} setOptionOpen={setOptionOpen} deleteList={deleteList}></ListHead>
                                                    <Card item={item}></Card>
                                                    <NewCard {...newProps} item={item} handleAddInsertCard={handleAddInsertCard}></NewCard>

                                                </div>
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}

                                <NewList {...newProps}></NewList>

                            </div>
                        </>
                    )}
                </Droppable>
            </DragDropContext>
            <Options isOpen={isOpen} onClose={onClose} btnRef={btnRef} itemId={openedId}></Options>
            <textarea className='focusLoseInput' ></textarea>
        </>
    )
}