import './../../styles/list.scss'
import $ from 'jquery'
export default function NewList({ handleCloseNewCard, handleNewCard, handleAddCard, length }) {
    return <>
        <div className='new__list'>
            <a href='#' className='body__new__list new__item__a' onClick={handleNewCard}>
                <i className="fa-solid fa-plus"></i>
                <span>{length === 0 ? 'Liste' : 'Başka liste'} ekle</span>
            </a>
            <div className='new__list__body'>
                <textarea placeholder='Liste başlığı girin...' rows={1}></textarea>
                <div>
                    <button className='btn__primary' onClick={handleAddCard}>Listeye Ekle</button>
                    <i onClick={(e) => handleCloseNewCard($(e.target))} className="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>
    </>
}