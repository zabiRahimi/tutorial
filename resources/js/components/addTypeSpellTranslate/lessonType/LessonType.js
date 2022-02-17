import { useEffect, useState } from "react";
import { NavLink, useOutletContext, Outlet, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const LessonType=()=>{

    const navigate = useNavigate();

    const { index, setIndex, refresh } = useOutletContext();

    const [check, setCheck] = useState('');

    const [valLessons, setValLessons] = useState([]);

    const [lesson, setLesson] = useState({
            id:'',
            lesson:'',
            link:''
        });

    async function getLessons(id) {
        await axios.get(`/getAllLessonTypes/${id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.lessonCount != 0 ?
                    (
                        setValLessons(response.data.lessons),
                        setCheck(1)
                    )
                    :
                    (
                        setCheck(2)
                    );
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    const alertSelect = () => {
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
        !index.book_id ? '' : getLessons(index.book_id);
        checkHaslesson();
        deleteAllId();
    }, [index.book_id, check, refresh]);

    const checkHaslesson = () => {
        if (!index.book_id) {
            alertSelect()
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
        setIndex(prev => ({...prev , lesson_id:'',word_id:'',sentence_id:'',lesson:'',  word:'', sentence:''}));
    }
    return (
        <section className="sectionAED">

            {check != '' ?
                <>
                    <section className="showNameBook">
                        <div className="line"></div>
                        <div className="nameBook">{index.book}</div>
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
                    <Outlet context={{index, setIndex, valLessons, setValLessons, lesson, setLesson }} />
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