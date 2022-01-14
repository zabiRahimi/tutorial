
import axios from "axios";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
const Book = forwardRef((props,ref) => {
    const { element, setElement, handleElement, lessonFun, wordFun, sentenceFun, handleChangeOverflowUl } = props;
    // ارسال این متد به والد و از والد به فرزندش بوک
    useImperativeHandle(ref, () => ({ deleteAlertBook }), []);
    const [valBooks, setValBooks] = useState();
    const bookForm = useRef(null),
        bookAlert = useRef(null),
        bookError = useRef(null),
        bookLinkError = useRef(null)

    async function getBooks() {
        await axios.get('/getBookType', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
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
    * این متد همه اعلانهای فرم ایجاد گروه را پاک می‌کند
    */
    const deleteAlertBook = () => {
        bookError.current.innerHTML = '';
        bookLinkError.current.innerHTML = '';
        bookAlert.current.innerHTML = '';
    }

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
        setElement(prev => ({ ...prev,book: '', book_id: id, bookName: name }));
        bookForm.current.reset();//خالی کردن فرم کتابها
        deleteAlertBook();
        // ارجا از پدر، پدر نیز این متد را از فرزند لیسن ارجا گرفته
        lessonFun.current.getLessons(id);
        lessonFun.current.deleteAlertLesson();
        wordFun.current.deleteAlertWord();
        sentenceFun.current.deleteAlertSentence();
    }

    const handleAddBook = (e) => {
        e.preventDefault();
        axios.post('/saveBookType', { 'book': element.book, 'bookLink': element.bookLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                getBooks();
                handleSelectBook(response.data.book_id, element.book);
                bookAlert.current.innerHTML = `<div class='success'>گروه جدید با موفقیت ایجاد شد</div>`
                bookAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
            })
            .catch(error => {
                bookAlert.current.innerHTML = ''
                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'book':
                            divError = bookError.current
                            break;
                        case 'bookLink':
                            divError = bookLinkError.current
                    }
                    divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                    divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
                else {
                    bookAlert.current.innerHTML = `<div class='error'>'خطایی رخ داده است، مطمعن شوید دیتابیس فعال است.'</div>`
                    bookAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
            })
    }
    return (
        <div className="chunk">
            <div className="title">
                <h6>انتخاب یا ایجاد گروه درس</h6>
            </div>
            <div className="content">
                <div className="Cright">
                    <div className="contentTitle">انتخاب گروه موجود</div>
                    <div className="dropdown select_book">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleChangeOverflowUl}>
                            انتخاب گروه
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {!valBooks ? 'loging' : (valBooks == 'is not' ? 'هیچ گروهی موجود نیست.' : setBooks())}
                        </ul>
                    </div>
                </div>
                <div className="Cleft">
                    <div className="contentTitle">ایجاد گروه جدید</div>

                    <form className='addBookForm' method="post" ref={bookForm} onSubmit={handleAddBook} onFocus={deleteAlertBook}>

                        <div className="formAlert" ref={bookAlert}></div>

                        <input type="text" dir="auto" className="form-control input_text"  onChange={e => handleElement(e, 'book')} placeholder='نام گروه' autoComplete="off" />
                        <div className="formError" ref={bookError}></div>

                        <input type="text" dir="auto" className="form-control input_text"  onChange={e => handleElement(e, 'bookLink')} placeholder='لینک گروه' autoComplete="off" />
                        <div className="formError" ref={bookLinkError}></div>

                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                    </form>
                </div>
            </div>
        </div>
    );
})

export default Book;