import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useOutletContext, Outlet, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const LessonType=()=>{

    const navigate = useNavigate();

    const { element, setElement, refresh } = useOutletContext();

    const [check, setCheck] = useState('');

    const [valLessonTypes, setValLessonTypes] = useState([]);

    async function getLessonTypes(bookType_id) {
        await axios.get(`/getAllLessonTypes/${bookType_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.lessonTypeCount != 0 ?
                    (
                        setValLessonTypes(response.data.lessonTypes),
                        // setElement(prev => ({ ...prev, 'lessonTypeCount': response.data.lessonTypeCount })),
                        setCheck(1)
                    )
                    :
                    (
                        // setElement(prev => ({ ...prev, 'lessonTypeCount': 0})),
                        setCheck(2)
                    );
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    const alertSelectbookType = () => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'ابتدا لازم است کتاب را انتخاب کنید',
            showConfirmButton: false,
            timer: 3500
        }).then((result) => {
            navigate(`/addTypeSpellTranslate/bookType`)
        })
    }

    useEffect(() => {
        !element.bookType_id ? '' : getLessonTypes(element.bookType_id);
        checkHaslessonType();
        deleteAllId();
    }, [element.bookType_id, check, refresh]);

    const checkHaslessonType = () => {
        if (!element.bookType_id) {
            alertSelectbookType()
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
        setElement(prev => ({...prev , lessonType_id:'',wordType_id:'',sentenceType_id:'',wordType:''}))
    }
    return (
        <section className="sectionAED">

            {check != '' ?
                <>
                    <section className="showNameBook">
                        <div className="line"></div>
                        <div className="nameBook">{element.bookType}</div>
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
                    <Outlet context={{ valLessonTypes,setValLessonTypes, element, setElement }} />
                </>
                :
                <div className="d-flex justify-content-center select_spinner">
                    <div className="spinner-border " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

        </section>
    )
}

export default LessonType;