import axios from "axios";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Link,useOutletContext } from "react-router-dom";
import AddLessonSec from "./AddLessonSec";
// import EditorALD from "../tinymce/EditorAddLessonDev";

const LessonSection = forwardRef((props, ref) => {
    const {  bookFun, lessonFun, handleSaveValInput } = props;
    useImperativeHandle(ref, () => ({ deleteAlertLessonSec }), []);




    return (

        <section className="sectionAED">
            <nav className="navAED">
                <Link to='/'>انتخاب بخش</Link>
                <Link to='/'>ایجاد بخش</Link>
                <Link to='/'>ویرایش و حذف بخش</Link>
            </nav>
            <AddLessonSec
                handleSaveValInput={handleSaveValInput}
                // element={element}
            />

        </section>
        // <div className="chunk">
        //     <div className="title">
        //         <h6>ایجاد بخش درس</h6>
        //     </div>

        //     <div className="content">
        //         <div className="Ccenter">

        //         </div>
        //     </div>
        // </div>
    );
})

export default LessonSection;