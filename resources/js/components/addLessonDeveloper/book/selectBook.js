import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useOutletContext } from "react-router";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from 'sweetalert2';

const SelectBook=()=>{
useChengeDocumentTitle('select book');
const navigate = useNavigate();

    
const {valBooks,setElement} = useOutletContext();

useEffect(()=>{
    checkHasBook()
},[])

const checkHasBook=()=>{
    valBooks.length==0?
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'تا کنون کتابی ایجاد نشده است',
        showConfirmButton: false,
        timer: 3000,

    }).then((result) => {
        navigate(`/addLessonDeveloper/book/add`)

    })
    :'';
}

 /**
  * انتخاب کتاب و ذخیره اطلاعات کتاب
  * index ذخیره اطلاعات در فایل
  * @param {*} id 
  * @param {*} book 
  * @param {*} bookLink 
  */
  const handleSelectBook = (id, book,bookLink) => {
    setElement(prev => ({ ...prev,  book_id: id, book: book, bookLink:bookLink }));
}

/**
* این تابع دیتاهای مربوط به کتاب را که از دیتابیس دریافت شده است
* را برای نمایش در لیسیت کتابها آماده می‌کند
* @returns <li/> 
*/
const setBooks = () => {
    let val = valBooks.map((books, i) => {
        return <li key={i} onClick={() => handleSelectBook(books.id, books.book,books.bookLink)}>{books.book}</li>
    })
    return val;
}
// const result=valBooks.find(({id})=>id===94)
// console.log(valBooks.indexOf(result));
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
                         انتخاب گروه
                     </button>
                     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                         {!valBooks ? <div className="d-flex justify-content-center select_spinner">
                                <div className="spinner-border " role="status">
                                 <span className="visually-hidden">Loading...</span>
                             </div>
                            </div> : (valBooks == 'is not' ? <div className="seletct_alert">تا کنون گروهی ایجاد نشده است</div> : setBooks())}
                        </ul>
                 </div>
        </section>
    )
}

export default SelectBook;

