import axios from "axios";
import { useEffect, useState } from "react";
import useScrollTo from "../hooks/useScrollTo";
const Book = (props) => {
    const { element, setElement, handleElement, lessonFun, lessonSecFun, handleChangeOverflowUl } = props;
    const [valBooks, setValBooks] = useState();

    async function getBook() {
        await axios.get('/getBook', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                setValBooks(response.data.book);
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    const setBook = () => {
        let val = valBooks.map((books, i) => {
            return <li key={i} onClick={() => handleSelectBook(books.id, books.book)}>{books.book}</li>
        })
        return val;
    }

    useEffect(() => {
        getBook();
    }, []);

    /**
    * این متد همه اعلانهای فرم ایجاد گروه را پاک می‌کند
    */
    const deleteAlertBook = () => {
        document.getElementById('bookError').innerHTML = '';
        document.getElementById('bookLinkError').innerHTML = '';
        document.getElementById('bookAlert').innerHTML = '';
    }

    /**
     * انتخاب گروه و ست کردن استیت گروه از لیست گروهای موجود 
     * @param {} id 
     */
    const handleSelectBook = (id, name) => {
        setElement(prev => ({ ...prev, book_id: id, bookName: name }));
        // ارجا از پدر، پدر نیز این متد را از فرزند لیسن ارجا گرفته
        lessonFun.current.getLessons(id);
        lessonFun.current.deleteAlertLesson();
        lessonSecFun.current.deleteAlertLessonSec();
    }

    const handleAddBook = (e) => {
        e.preventDefault();
        axios.post('/saveBook', { 'book': element.book, 'bookLink': element.bookLink}, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                setElement(prev => ({ ...prev, book: '', book_id: response.data.book_id, bookName: element.book }));
                getBook();
                document.getElementById('book').value = '';
                document.getElementById('bookLink').value = '';
                lessonFun.current.deleteAlertLesson();
                lessonSecFun.current.deleteAlertLessonSec();
                document.getElementById('bookAlert').innerHTML = `<div class='success'>گروه جدید با موفقیت ایجاد شد</div>`
                useScrollTo('bookAlert');
            })
            .catch(error => {
                document.getElementById('bookAlert').innerHTML = '';
                if (error.response.status == 422) {
                    const firstElementError = Object.keys(error.response.data.errors)[0];
                    if (firstElementError == 'book') {
                        document.getElementById('bookError').innerHTML = `<div class="error">${error.response.data.errors['book'][0]}</div>`
                        useScrollTo('bookError');
                    } else if (firstElementError == 'bookLink') {
                        document.getElementById('bookLinkError').innerHTML = `<div class="error">${error.response.data.errors['bookLink'][0]}</div>`
                        useScrollTo('bookLinkError');
                    }
                }
                else {
                    const errorMessage = 'خطایی رخ داده است، مطمعن شوید دیتابیس فعال است.'
                    document.getElementById('bookAlert').innerHTML = `<div class='error'>${errorMessage}</div>`
                    useScrollTo('bookAlert');
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
                            {!valBooks ? 'loging' : setBook()}
                        </ul>
                    </div>
                </div>
                <div className="Cleft">
                    <div className="contentTitle">ایجاد گروه جدید</div>
                    <form className='addBookForm' id="addBookForm" method="post" onSubmit={handleAddBook} onFocus={deleteAlertBook}>
                        <div className="formAlert" id='bookAlert'></div>
                        <input type="text" dir="auto" className="form-control input_text" id="book" onChange={handleElement} placeholder='نام گروه' autoComplete="off" />
                        <div className="formError" id='bookError'></div>
                        <input type="text" dir="auto" className="form-control input_text" id="bookLink" onChange={handleElement} placeholder='لینک گروه' autoComplete="off" />
                        <div className="formError" id='bookLinkError'></div>
                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Book;