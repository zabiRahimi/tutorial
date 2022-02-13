import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useOutletContext, Outlet, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Lesson = () => {
    const navigate = useNavigate();

    const { element, setElement, refresh } = useOutletContext();

    const [check, setCheck] = useState('');

    const [valLessons, setValLessons] = useState([]);

    async function getLessons(book_id) {
        await axios.get(`/getLessons/${book_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.lessonCount != 0 ?
                    (
                        setValLessons(response.data.lessons),
                        setElement(prev => ({ ...prev, 'lessonCount': response.data.lessonCount, 'lessonSecCount': response.data.lessonSecCount })),
                        setCheck(1)
                    )
                    :
                    (
                        setElement(prev => ({ ...prev, 'lessonCount': 0, 'lessonSectionCount': 0 })),
                        setCheck(2)
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
            timer: 3500
        }).then((result) => {
            navigate(`/addLessonDeveloper/book`)
        })
    }

    useEffect(() => {
        !element.book_id ? '' : getLessons(element.book_id);
        checkHaslesson();
        deleteAllId();
    }, [element.book_id, check, refresh]);

    const checkHaslesson = () => {
        if (!element.book_id) {
            alertSelectbook()
        } else {

            switch (check) {
                case '': ''
                    break;
                case 2: navigate("add");
                    break;
                default:
                    navigate(`select`);
            }
        }
    }

    /**
     * هرگاه کاربر لینک فصل را کلیک کند
     * این متد تمام آی‌دی‌های ست شده را پاک می‌کند
     * متن و تیتر بخش ست شده را پاک می‌کند
     * در نبود این متد برنامه دچار مشکل می‌شود
     */
     const deleteAllId=()=>{
        setElement(prev => ({...prev , lesson_id:'',lessonSec_id:'',lesson_section:'',des:''}))
    }

    return (

        <section className="sectionAED">

            {check != '' ?
                <>
                    <section className="showNameBook">
                        <div className="line"></div>
                        <div className="nameBook">{element.book}</div>
                    </section> 

                    <nav className="navAED">
                        <NavLink to='select' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}>انتخاب فصل</NavLink>
                        <NavLink to='add' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                            >ایجاد فصل</NavLink>
                        <NavLink to='edit' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                            >ویرایش و حذف فصل</NavLink>
                    </nav>
                    <Outlet context={{ valLessons,setValLessons, element, setElement }} />
                </>
                :
                <div className="d-flex justify-content-center select_spinner">
                    <div className="spinner-border " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

        </section>
    );
}

export default Lesson;