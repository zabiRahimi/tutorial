import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from 'sweetalert2';

const SelectBookType = () => {
    useChengeDocumentTitle('select book type spell translate');

    const navigate = useNavigate();

    const { setIndex, valBooks, setBook } = useOutletContext();

    useEffect(() => {
        checkHasBook();
    }, [])

    /**
     * چنانچه کتابی ایجاد نشده باشد این متد هشدار داده  
     * و کاربر به صفحه ایجاد کتاب هدایت می‌کند
     */
    const checkHasBook = () => {
        valBooks.length == 0 ?
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'تا کنون کتابی ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then((result) => {
                navigate(`/addTypeSpellTranslate/bookType/add`)
            })
            : '';
    }

    /**
     * انتخاب کتاب و ذخیره اطلاعات کتاب
     * index ذخیره اطلاعات در فایل
     * @param {*} id 
     * @param {*} book
     * @param {*} link 
     */
    const handleSelectBook = (id, book, link) => {

        setIndex(prev => ({ ...prev, book_id: id, book: book }));

        setBook({ id, book, link });
    }

    /**
    * این تابع دیتاهای مربوط به کتاب را که از دیتابیس دریافت شده است
    * را برای نمایش در لیسیت کتابها آماده می‌کند
    * @returns <li/> 
    */
    const setBooks = () => {
        let val = valBooks.map((books, i) => {
            return <li key={i} onClick={() => handleSelectBook(books.id, books.book, books.link)}>{books.book}</li>
        })
        return val;
    }

    /**
     * تنظیم ارتفاع نمایش لیست کتابها
     * @param {*} e 
     */
    const handleChangeOverflowUl = (e) => {
        const parent = e.target.parentNode;
        const child = parent.querySelector('ul');
        const height = child.offsetHeight;
        child.style.overflow = height < 230 ? 'visible' : 'auto';
    }

    return (
        <section className="SAED_content">
            <div className="dropdown select_book">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleChangeOverflowUl}>
                    انتخاب کتاب
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {setBooks()}
                </ul>
            </div>
        </section>
    )
}

export default SelectBookType;