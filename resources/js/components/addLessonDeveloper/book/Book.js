import axios from "axios";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import AddBook from "./AddBook";

const Book = (props, ref) => {
    useImperativeHandle(ref, () => ({ deleteAlertBook }), []);

    const { element, setElement, handleSaveValInput, lessonFun, lessonSecFun, handleChangeOverflowUl } = props;
    const bookForm = useRef(null),
        bookAlert = useRef(null),
        bookError = useRef(null),
        bookLinkError = useRef(null);
    const [valBooks, setValBooks] = useState();

    async function getBooks() {
        await axios.get('/getBooks', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.books.length != 0 ? setValBooks(response.data.books) : setValBooks('is not');
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    /**
    * این تابع دیتاهای مربوط به کتاب را که از دیتابیس دریافت شده است
    * را برای نمایش در لیسیت کتابها آماده می‌کند
    * @returns <li/> 
    */
    const setBooks = () => {
        let val = valBooks.map((books, i) => {
            return <li key={i} onClick={() => handleSelectBook(books.id, books.book)}>{books.book}</li>
        })
        return val;
    }

    useEffect(() => {
        getBooks();
    }, []);

   

    /**
     * انتخاب گروه و ست کردن استیت گروه از لیست گروهای موجود
     *  (این نام در فرم درس نمایش داده می‌شود)
     * ست کردن استیت آی‌دی گروه
     * (از این آی‌دی برای فراخوانی دیتای درس مربوط به کتاب استفاده می‌شود)
     * فراخوانی درسهای مربوط به گروه یا همان کتاب
     * پاک کردن همه خطاهای و هشدارهای فرم درس، فرم کلمه و فرم جمله 
    * @param {*} id آی‌دی رکورد گروه یا همان کتاب 
    * @param {*} name نام گروه یا کتاب
    */
    const handleSelectBook = (id, name) => {
        setElement(prev => ({ ...prev, book: '', book_id: id, bookName: name }));
        bookForm.current.reset();//خالی کردن فرم کتابها
        deleteAlertBook();
        // ارجا از پدر، پدر نیز این متد را از فرزند لیسن ارجا گرفته
        lessonFun.current.getLessons(id);
        lessonFun.current.deleteAlertLesson();
        lessonSecFun.current.deleteAlertLessonSec();
    }

    function deleteBook(id) {
        Swal.fire({
            title: 'آیا مایل به حذف این گروه هستید؟',
            color: '#aa4f0f',
            html: `<div class='swalDelete'><div class="bold">توجه</div><div class="text">این گروه شامل<br /> ${element.lessonCount} درس و ${element.lessonSectionCount} بخش است.</div></div>`,

            showCancelButton: true,
            confirmButtonText: 'delete',
            confirmButtonColor: '#ffd600',
            preConfirm: () => {
                return axios.delete(`/deleteBook/${id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                    .then(response => {
                        setElement(prev => ({ ...prev, book_id: '', bookName: '' }));
                        getBooks();
                    })
                    .catch(error => {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'گروه حذف نشد !!',
                            showConfirmButton: false,
                            timer: 4000
                        })
                    })
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'گروه با موفقیت حذف شد',
                    showConfirmButton: false,
                    timer: 4000
                })
            }
        })

    }
    
    return (
        <section className="sectionAED">
                 <nav className="navAED">
     <Link to='/'>انتخاب کتاب</Link>
     <Link to='/'>ایجاد کتاب</Link>
     <Link to='/'>ویرایش و حذف کتاب</Link>
 </nav>
        <AddBook 
            handleSaveValInput={handleSaveValInput}
        />

        </section>
    //     <nav className="navBook">
    //     <Link to='/'>انتخاب کتاب</Link>
    //     <Link to='/'>ایجاد کتاب</Link>
    //     <Link to='/'>ویرایش و حذف کتاب</Link>
    // </nav>


        // <div className="chunk">
        //     <div className="title">
        //         <h6>انتخاب یا ایجاد گروه درس</h6>
        //     </div>

        //     <div className="content">
        //         <div className="Cright">
        //             <div className="contentTitle">انتخاب گروه موجود</div>
        //             <div className="dropdown select_book">
        //                 <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleChangeOverflowUl}>
        //                     انتخاب گروه
        //                 </button>
        //                 <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        //                     {!valBooks ? <div className="d-flex justify-content-center select_spinner">
        //                         <div className="spinner-border " role="status">
        //                             <span className="visually-hidden">Loading...</span>
        //                         </div>
        //                     </div> : (valBooks == 'is not' ? <div className="seletct_alert">تا کنون گروهی ایجاد نشده است</div> : setBooks())}
        //                 </ul>
        //             </div>
        //             {element.bookName ? <div className="editDelete"><div className="whichGroup">edit and delete group <span>{element.bookName}</span></div>
        //                 <div className="buttonEditDelete">
        //                     <button type="button" className="btn btn-info edit_group" >edit</button>
        //                     <button type="button" className="btn btn-warning delete_group" onClick={() => deleteBook(element.book_id)}>delete</button>
        //                 </div>
        //             </div> : ''}

        //         </div>
        //         <div className="Cleft">
        //             <div className="contentTitle">ایجاد گروه جدید</div>
        //             <form className='addBookForm' ref={bookForm} method="post" onSubmit={handleAddBook} onFocus={deleteAlertBook}>

        //                 <div className="formAlert" ref={bookAlert} ></div>

        //                 <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'book')} placeholder='نام گروه' autoComplete="off" />

        //                 <div className="formError" ref={bookError} ></div>

        //                 <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'bookLink')} placeholder='لینک گروه' autoComplete="off" />

        //                 <div className="formError" ref={bookLinkError}></div>

        //                 <input type="submit" className='btn btn-success btn_form' value='ثبت' />
        //             </form>
        //         </div>
        //     </div>
        // </div>
    );
}

export default forwardRef(Book);