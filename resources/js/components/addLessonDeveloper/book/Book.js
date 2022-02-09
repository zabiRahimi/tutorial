import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate} from "react-router-dom";
import { useOutletContext } from "react-router";

const Book = () => {
    const [valBooks, setValBooks] = useState([]);
    const [check, setCheck] = useState('');

    let navigate = useNavigate();

    const {element, setElement ,refresh } = useOutletContext();

    async function getBooks() {
        await axios.get('/getBooks', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then( response => {
                 response.data.books.length != 0 ? (setValBooks(response.data.books), setCheck(1)) : setCheck(2);
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            await getBooks();
            checkHasBook();
            deleteAllId();
        }
        fetchData()
    }, [ check,refresh]);

    const checkHasBook = () => {
        switch (check) {
            case '': ''
                break;
            case 2 : navigate("add"); 
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
    const deleteAllId=()=>{
        setElement(prev => ({...prev ,book_id:'', lesson_id:'',lessonSec_id:'',book:'',bookLink:'',lesson:'',lessonLink:''}))
    } 

    return (
        <section className="sectionAED">
            {check != '' ?
                <>
                    <nav className="navAED">
                        <NavLink to={'select'}  className={({ isActive }) =>
                            isActive  ? 'SAED_active' : 'SAED_passive'}
                            >انتخاب کتاب</NavLink>
                        <NavLink to={'add'} className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                            >ایجاد کتاب</NavLink>
                        <NavLink to={'edit'} className={({ isActive }) =>
                            isActive  ? 'SAED_active' : 'SAED_passive'}
                            >ویرایش و حذف کتاب</NavLink>
                    </nav>
                    <Outlet context={{ valBooks,setValBooks, element, setElement}} />
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

export default Book;