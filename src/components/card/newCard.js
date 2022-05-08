import '../../styles/list.scss'
import $ from 'jquery'
export default function NewCard({ handleCloseNewCard, handleNewCard, handleAddInsertCard, item }) {
    return <>
        <div className='list__body'>
            <a href='#' className='body__new__card new__item__a' onClick={handleNewCard}>
                <i className="fa-solid fa-plus"></i>
                <span>Kart ekle</span>
            </a>
            <div className='list__card__body'>
                <textarea placeholder='Bu kart için başlık girin...' rows={2}></textarea>
                <div>
                    <button className='btn__primary' onClick={(e) => handleAddInsertCard($(e.target), item.id)}>Kart Ekle</button>
                    <i onClick={(e) => handleCloseNewCard($(e.target))} className="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>
    </>
}