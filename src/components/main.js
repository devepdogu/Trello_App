
import Header from "./header"
import List from "./list/list"
import $ from 'jquery'
export default function Main() {
    $(document).ready(() => {
        $('textarea[data-auto-click=1]').attr("readonly", true)
        $(document.body).on("input", 'textarea,input', function () {
            $(this).attr("data-value", $(this).val())
            if ($(this).data('auto-height')) {
                var el = this;
                setTimeout(function () {
                    el.style.cssText = 'height:auto; padding:0';
                    // for box-sizing other than "content-box" use:
                    // el.style.cssText = '-moz-box-sizing:content-box';
                    el.style.cssText = 'height:' + el.scrollHeight + 'px';
                }, 0);
            }
        })

        $(document.body).on("click", 'button', function () {

            if (typeof $(this).attr("data-clicked") === "string")
                $(this).removeAttr("data-clicked")
            else
                $(this).attr("data-clicked", 1)
        })





       


    })

    return (
        <>
            <Header></Header>
            <List></List>
        </>
    )
}