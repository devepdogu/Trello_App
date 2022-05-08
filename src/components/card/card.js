import './../../styles/list.scss'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CardHead from './cardHead';
export default function Card({ item }) {
    return (
        <div className='list__card__items'>
            <Droppable
                droppableId={`${item.id}`}
            >
                {
                    ((dropProvided, dropSnapshot) => (
                        <>
                            <div
                                ref={dropProvided.innerRef}
                                className={"__drop__list__card"}
                                {...dropProvided.droppableProps}
                            >
                                {
                                    typeof item?.cart !== "undefined" && item.cart.map((_item, i) => (
                                        <Draggable
                                            draggableId={_item.id}
                                            key={_item.id}
                                            index={i}
                                            type="TASK"
                                        >
                                            {
                                                ((_provided, dragSnapshot) => (
                                                    <>
                                                        <CardHead _provided={_provided} _item={_item} cart={item}></CardHead>
                                                    </>
                                                ))
                                            }
                                        </Draggable>
                                    ))
                                }
                                {dropProvided.placeholder}
                            </div>
                        </>
                    ))
                }
            </Droppable>

        </div>
    )
}