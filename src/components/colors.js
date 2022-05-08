import style from '../styles/colors.module.scss'
import $ from 'jquery'
import { colors } from './data';
export default function Colors({ activeColor, setActiveColor, size, colorGroup }) {

    const handleCheckTarget = (e) => {
        setActiveColor(e.title)
    }

    return <div className={`${style.color__parent} ${typeof size !== "undefined" && size === "small" ? style.color__parent__small : style.color__parent__medium}`}>
        {
            colors.map((color, i) => {
                return (
                    <div key={i} style={{ backgroundColor: color.color }} hidden={(typeof color?.colorGroup !== "undefined" && colorGroup !== color.colorGroup)} title={color.title} onClick={(e) => handleCheckTarget(color)}>
                        {
                            color.title === activeColor && (<i className="fa-solid fa-check"></i>)
                        }
                    </div>
                )
            }
            )
        }
    </div>
}