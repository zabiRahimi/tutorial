import { useEffect, useState } from "react";
import { NavLink, useOutletContext, Outlet, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const WordType=()=>{
    const navigate = useNavigate();

    const { index, setIndex, refresh } = useOutletContext();

    const [check, setCheck] = useState('');

    const [valWords, setValWords] = useState([]);

    const [word, setWord] = useState({
        id:'',
        word: '',
        link: '',
        mean: '',
        pronounceEn:'',
        pronounceFa:'',
    })

    async function getAllWords(lesson_id) {
        await axios.get(`/getAllWordTypes/${lesson_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.wordCount != 0 ?
                    (
                        setValWords(response.data.words),
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

    const alertSelectlesson = () => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'ابتدا لازم است کتاب و سپس فصل را انتخاب کنید',
            showConfirmButton: false,
            timer: 4000
        }).then((result) => {
            navigate(`/addTypeSpellTranslate/lessonType`)
        })
    }

    useEffect(() => {
        !index.lesson_id ? '' : getAllWords(index.lesson_id);
        checkHasword();
        deleteAllId();
    }, [index.lesson_id, check, refresh]);

    const checkHasword = () => {
        if (!index.lesson_id) {
            alertSelectlesson()
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
     * هرگاه کاربر لینک کلمه را کلیک کند
     * این متد تمام آی‌دی‌های ست شده را پاک می‌کند
     * متن و تیتر فصل ست شده را پاک می‌کند
     * در نبود این متد برنامه دچار مشکل می‌شود
     */
     const deleteAllId=()=>{
        setIndex(prev => ({...prev , word_id: '', sentence_id: '', word: '', sentence: ''}))
    }
    return (
        <section className="sectionAED">

            {check != '' ?
                <>
                    <section className="showNameBook">
                        <div className="line"></div>
                        <div className="nameBook">{index.book} --- {index.lesson}</div>
                    </section> 

                    <nav className="navAED">
                        <NavLink to='select' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}>انتخاب کلمه</NavLink>
                        <NavLink to='add' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                            >ایجاد کلمه</NavLink>
                        <NavLink to='edit' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                            >ویرایش و حذف کلمه</NavLink>
                    </nav>
                    <Outlet context={{index, setIndex, valWords, setValWords, word, setWord}} />
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

export default WordType;