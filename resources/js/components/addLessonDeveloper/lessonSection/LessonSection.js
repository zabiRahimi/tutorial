import axios from "axios";
import {  useEffect, useState } from "react";
import { NavLink,useOutletContext,Outlet ,useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const LessonSection = () => {

    const navigate = useNavigate();

    const { index, setIndex, refresh } = useOutletContext();

    const [check, setCheck] = useState('');

    const [valLessonSecs, setValLessonSecs] = useState([]);

    const [lessonSec, setLessonSec] = useState({
        id:'',
        lesson_section:'',
        des:''
    })
    
    async function getLessonSecs(lesson_id) {
        await axios.get(`/getAllLessonSections/${lesson_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.lessonSections.length != 0 ?
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
        !index.lesson_id ? '' : getLessonSecs(index.lesson_id);
        checkHaslesson();
    }, [index.lesson_id, check,refresh]);

    const checkHaslesson = () => {
        if (!index.book_id) {
            alertSelectbook()
        }else if(!index.lesson_id){
            alertSelectLesson()
        } else {
            navigate("add");
        }
    }

    return (

        <section className="sectionAED">

{check != '' ?
                <>
            <section className="showNameBook">
                        <div className="line"></div>
                        <div className="nameBook">{index.book} {index.lesson}</div>
                    </section> 
            <nav className="navAED">
                <NavLink to='select' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}>انتخاب بخش</NavLink>
                <NavLink to='add' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}>ایجاد بخش</NavLink>
                <NavLink to='edit' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}>ویرایش و حذف بخش</NavLink>
            </nav>
            <Outlet context={{index, setIndex, valLessonSecs, setValLessonSecs, lessonSec, setLessonSec  }} />
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

export default LessonSection;