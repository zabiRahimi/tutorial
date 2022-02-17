import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router";

const BookType = () => {
    const [valBooks, setValBooks] = useState([]);

    const [check, setCheck] = useState('');

    let navigate = useNavigate();

    const { index, setIndex, refresh } = useOutletContext();
    
    /**
     * اشتراک بین کامپوننت‌های فرزند
     */
    const [book, setBook] = useState({
        id: '',
        book: '',
        link: ''
    })
    async function getAllBooks() {
        await axios.get('/getAllBookTypes', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.books.length != 0 ? (setValBooks(response.data.books), setCheck(1)) : setCheck(2);
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            await getAllBooks();
            checkHasBook();
            deleteAllId();
        }
        fetchData()
    }, [check, refresh]);

    const checkHasBook = () => {
        switch (check) {
            case '': ''
                break;
            case 2: navigate("add");
                break;
            default:
                navigate(`select`);
        }
    }

    /**
     * هرگاه کاربر لینک کتاب را کلیک کند
     * این متد تمام آی‌دی‌های ست شده را پاک می‌کند
     * نام کتاب و لینک کتاب ست شده را پاک می‌کند
     * نام فصل و لینک فصل ست شده را پاک می‌کند
     * در نبود این متد برنامه دچار مشکل می‌شود
     */
    const deleteAllId = () => {
        setIndex(prev => ({ ...prev, Book_id: '', lesson_id: '', word_id: '', sentence_id: '', Book: '', lesson: '', word: '', sentence: '' }));
    }

    return (
        <section className="sectionAED">
            {check != '' ?
                <>
                    <nav className="navAED">
                        <NavLink to={'select'} className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                        >انتخاب کتاب</NavLink>
                        <NavLink to={'add'} className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                        >ایجاد کتاب</NavLink>
                        <NavLink to={'edit'} className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                        >ویرایش و حذف کتاب</NavLink>
                    </nav>
                    <Outlet context={{ index, setIndex, valBooks, setValBooks, book, setBook }} />
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

export default BookType;