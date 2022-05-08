import style from '../styles/colors.module.scss'
import $ from 'jquery'
import { colors } from './data';
export default function Colors({ activeColor, setActiveColor, size, colorGroup }) {

    const handleCheckTarget = (e) => {
        if (typeof activeColor === "string")
            setActiveColor(e.title)
        else {
            setActiveColor((prev) => {
                let id = prev.findIndex((m) => m === e.title);
                if (id < 0)
                    prev.push(e.title)
                else
                    prev.splice(id, 1)
                return [...prev];
            })
        }
    }
    return <div className={`${style.color__parent} ${typeof size !== "undefined" && size === "small" ? style.color__parent__small : style.color__parent__medium}`}>
        {
            colors.map((color, i) => {
                return (
                    <div key={i} style={{ backgroundColor: color.color }} hidden={(typeof color?.colorGroup !== "undefined" && colorGroup !== color.colorGroup)} title={color.title} onClick={(e) => handleCheckTarget(color)}>
                        {
                            typeof activeColor === "string" && color.title === activeColor && (<i className="fa-solid fa-check"></i>)
                        }
                        {typeof activeColor === "object" && activeColor.includes(color.title) && (<i className="fa-solid fa-check"></i>)}
                    </div>
                )
            }
            )
        }
    </div>
}