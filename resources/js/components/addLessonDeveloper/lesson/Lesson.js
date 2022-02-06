import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import axios from "axios";
import AddLesson from "./AddLesson";
import { NavLink, Outlet, useOutletContext, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Lesson = forwardRef((props, ref) => {
    // const {  handleSaveValInput, lessonSecFun, bookFun, handleChangeOverflowUl } = props;
    let navigate = useNavigate();

    const [element, setElement] = useOutletContext();

    let { state } = useLocation();

    const [valLessons, setValLessons] = useState();


    async function getLessons(book_id) {
        console.log(`bookId : ${book_id}`);
        await axios.get(`/getLessons/${book_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.lessonCount != 0 ?
                    (
                        console.log('part 1'),
                        setValLessons(response.data.lessons),
                        setElement(prev => ({ ...prev, 'lessonCount': response.data.lessonCount, 'lessonSecCount': response.data.lessonSecCount }))
                    )
                    :
                    (
                        console.log('part 2'),
                        setValLessons('is not'),
                        setElement(prev => ({ ...prev, 'lessonCount': 0, 'lessonSectionCount': 0 }))
                    );
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    

    const alertSelectbook = () => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'ابتدا لازم است کتاب را انتخاب کنید',
            showConfirmButton: false,
            timer: 3500,

        }).then((result) => {
            navigate(`select`, { state: { re_index: 1, link: 'book', link2: 'select' } })

        })

    }
    const alertSelectLesson = () => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'برای ویرایش و یا حذف فصل کتاب، ابتدا لازم است فصل کتاب مودر نظر را انتخاب کنید',
            showConfirmButton: false,
            timer: 4500,

        }).then((result) => {
            navigate(`book`, { state: { re_index: 1, link: 'book', link2: 'select' } })

        })

    }

    useEffect(() => {

        !element.book_id ? '' : (getLessons(element.book_id), console.log(element.book_id));
        checkHaslesson();
    }, [state.link2, state.re_lesson]);

    const checkHaslesson = () => {
        if (!element.book_id) {
            alertSelectbook()
        } else {
            console.log(`raha ${valLessons}`);
            valLessons == 'is not' ?
               ( navigate("add", { state: {re_index: 2, link: 'lesson', link2: 'add' } }),console.log('oook'))
                : state.link2 == 'edit' && !element.lesson_id ?
                    alertSelectLesson()
                    :

                    navigate(`${state.link2}`, { state: { re_index: 2, link: 'lesson', link2: state.link2 } });
        }
    }

    // const setLessons = () => {
    //     let val = valLessons.map((lessons, i) => {
    //         return <li key={i} onClick={() => handleSelectLesson(lessons.id, lessons.lesson)}>{lessons.lesson}</li>
    //     })
    //     return val;
    // }


    // const handleSelectLesson = (id, name) => {

    //     setElement(prev => ({ ...prev, lesson: '', lessonLink: '', lesson_id: id, lessonName: name }));
    //     deleteAlertLesson()
    //     lessonForm.current.reset();//خالی کردن فرم درس ها
    //     bookFun.current.deleteAlertBook();
    //     lessonSecFun.current.deleteAlertLessonSec();
    // }

    return (

        <section className="sectionAED">

            {valLessons ?
                <>
                    <nav className="navAED">
                        <NavLink to='select' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                            state={{ re_index: 1, re_lesson: 1, link: 'lesson', link2: 'select' }}>انتخاب فصل</NavLink>
                        <NavLink to='add' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                            state={{ re_index: 1, re_lesson: 1, link: 'lesson', link2: 'add' }}>ایجاد فصل</NavLink>
                        <NavLink to='edit' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                            state={{ re_index: 1, re_lesson: 1, link: 'lesson', link2: 'edit' }}>ویرایش و حذف فصل</NavLink>
                    </nav>
                    <Outlet context={{ valLessons, element, setElement }} />
                </>
                :
                <div className="d-flex justify-content-center select_spinner">
                    <div className="spinner-border " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

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