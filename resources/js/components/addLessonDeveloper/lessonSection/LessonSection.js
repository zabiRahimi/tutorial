import axios from "axios";
import {  useEffect, useState } from "react";
import { NavLink,useOutletContext,Outlet ,useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const LessonSection = () => {
    const navigate = useNavigate();
    const { element, setElement } = useOutletContext();
    const [check, setCheck] = useState('');
    const [valLessonSecs, setValLessonSecs] = useState([]);
    
    async function getLessonSecs(lesson_id) {
        await axios.get(`/getLessonSections/${lesson_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.lessonSecCount != 0 ?
                    (
                        setValLessonSecs(response.data.lessonSections),
                        setCheck(1)
                    )
                    :
                    setCheck(2);
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    const alertSelectbook = () => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'ابتدا لازم است کتاب و سپس فصل کتاب را انتخاب کنید',
            showConfirmButton: false,
            timer: 3500
        }).then((result) => {
            navigate(`/addLessonDeveloper/book`)
        })
    }

    const alertSelectLesson = () => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'لطفا فصل کتاب را انتخاب کنید',
            showConfirmButton: false,
            timer: 3000
        }).then((result) => {
            navigate(`/addLessonDeveloper/lesson`)
        })
    }

    useEffect(() => {
        !element.lesson_id ? '' : getLessonSecs(element.lesson_id);
        checkHaslesson();
    }, [element.lesson_id, check]);

    const checkHaslesson = () => {
        if (!element.book_id) {
            alertSelectbook()
        }else if(!element.lesson_id){
            alertSelectLesson()
        } else {
            navigate("add");
            // switch (check) {
            //     case '': ''
            //         break;
            //     case 2: navigate("add");
            //         break;
            //     default:
            //         navigate(`select`);
            // }
        }
    }

    return (

        <section className="sectionAED">

{check != '' ?
                <>
            <section className="showNameBook">
                        <div className="line"></div>
                        <div className="nameBook">{element.book} {element.lesson}</div>
                    </section> 
            <nav className="navAED">
                <NavLink to='select' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}>انتخاب بخش</NavLink>
                <NavLink to='add' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}>ایجاد بخش</NavLink>
                <NavLink to='edit' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}>ویرایش و حذف بخش</NavLink>
            </nav>
            <Outlet context={{ valLessonSecs,setValLessonSecs, element, setElement }} />
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
        //         <h6>ایجاد بخش درس</h6>
        //     </div>

        //     <div className="content">
        //         <div className="Ccenter">

        //         </div>
        //     </div>
        // </div>
    );
}

export default LessonSection;