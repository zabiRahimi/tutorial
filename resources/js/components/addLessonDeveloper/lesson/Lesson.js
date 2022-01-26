import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import axios from "axios";
import AddLesson from "./AddLesson";
import { Link,useOutletContext } from "react-router-dom";

const Lesson = forwardRef((props, ref) => {
    const {  handleSaveValInput, lessonSecFun, bookFun, handleChangeOverflowUl } = props;
    const [element , setElement]=useOutletContext();
    // ارسال این متد به والد و از والد به فرزندش بوک
    useImperativeHandle(ref, () => ({ getLessons, deleteAlertLesson }), []);

    const [valLessons, setValLessons] = useState();


    async function getLessons(book_id) {
        await axios.get(`/getLessons/${book_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.countlessons != 0 ?
                    (setValLessons(response.data.lessons),
                        setElement(prev => ({ ...prev, 'lessonCount': response.data.countlessons, 'lessonSectionCount': response.data.countLessonSections })))
                    :
                    (setValLessons('is not'),
                        setElement(prev => ({ ...prev, 'lessonCount': 0, 'lessonSectionCount': 0 }))
                    );
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    const setLessons = () => {
        let val = valLessons.map((lessons, i) => {
            return <li key={i} onClick={() => handleSelectLesson(lessons.id, lessons.lesson)}>{lessons.lesson}</li>
        })
        return val;
    }


    const handleSelectLesson = (id, name) => {

        setElement(prev => ({ ...prev, lesson: '', lessonLink: '', lesson_id: id, lessonName: name }));
        deleteAlertLesson()
        lessonForm.current.reset();//خالی کردن فرم درس ها
        bookFun.current.deleteAlertBook();
        lessonSecFun.current.deleteAlertLessonSec();
    }

    return (

        <section className="sectionAED">
            <nav className="navAED">
                <Link to='/'>انتخاب درس</Link>
                <Link to='/'>ایجاد درس</Link>
                <Link to='/'>ویرایش و حذف درس</Link>
            </nav>
            <AddLesson
                handleSaveValInput={handleSaveValInput}
                element={element}
            />

        </section>

        // <div className="chunk">
        //     <div className="title">
        //         <h6>انتخاب یا ایجاد درس</h6>
        //     </div>
        //     <div className="content">
        //         <div className="Cright">

        //             <div className="contentTitle">انتخاب درس موجود</div>
        //             <div className="dis">{element.bookName ? `گروه ${element.bookName}` : 'ابتدا گروه را انتخاب کنید'}</div>

        //             <div className="dropdown select_book">
        //                 <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleChangeOverflowUl}>
        //                     انتخاب درس
        //                 </button>
        //                 <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        //                     {!element.book_id ? <div className="seletct_alert">ابتدا گروه را انتخاب کنید.</div> : !valLessons ? <div className="d-flex justify-content-center select_spinner">
        //                         <div className="spinner-border " role="status">
        //                             <span className="visually-hidden">Loading...</span>
        //                         </div>
        //                     </div> : (valLessons == 'is not' ? <div className="seletct_alert"> برای این گروه درسی موجود نیست</div> : setLessons())}
        //                 </ul>
        //             </div>
        //         </div>

        //         <div className="Cleft">

        //         </div>
        //     </div>
        // </div>
    );
})

export default Lesson;