import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from "sweetalert2";

const AddBook = () => {
    useChengeDocumentTitle('add book');

    let navigate = useNavigate();

    const [input, setInput] = useState({
        book: '',
        bookLink: '',
        book_id: '',
    });

    const bookForm = useRef(null),
        bookAlert = useRef(null),
        bookError = useRef(null),
        bookLinkError = useRef(null);

    const { setElement,valBooks,setValBooks } = useOutletContext();

    /**
   * مقدار هر این‌پوت فرم را دخیره می‌کند
   * هنگامی که دکمه ثبت فشرده شد این مقادیر به کنترلر فرستاده می‌شود
   * @param {*} e 
   * @param {*} nameElement 
   */
    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        setInput(prev => ({ ...prev, [input]: value }));
    }

    /**
   * این متد همه اعلانهای فرم ایجاد گروه را پاک می‌کند
   */
    const deleteAlertBook = () => {
        bookError.current.innerHTML = '';
        bookLinkError.current.innerHTML = '';
        bookAlert.current.innerHTML = '';
    }

    const handleAddBook = (e) => {
        e.preventDefault();
        axios.post('/saveBook', { 'book': input.book, 'bookLink': input.bookLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then( response => {
                 bookForm.current.reset();
                 setElement(prev => ({ ...prev, book_id: response.data.book_id, book: input.book ,bookLink:input.bookLink }));
                 setInput(prev => ({ ...prev, book: '', bookLink: '' }));
                 valBooks.push({id:response.data.book_id, book: input.book ,bookLink:input.bookLink})
                setValBooks(valBooks)
                 Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'ثبت نام با موفقیت انجام شد .',
                    showConfirmButton: false,
                    timer: 4500
                }).then((result) => {
                 navigate("/addLessonDeveloper/book/add");
                })
            })
            .catch(error => {
                console.log(error);
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
        <section className="SAED_content">
            <form className='AE_Form' ref={bookForm} method="post" onSubmit={handleAddBook} onFocus={deleteAlertBook}>

                <div className="formAlert" ref={bookAlert} ></div>

                <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'book')} placeholder='نام گروه' autoComplete="off" />

                <div className="formError" ref={bookError} ></div>

                <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'bookLink')} placeholder='لینک گروه' autoComplete="off" />

                <div className="formError" ref={bookLinkError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت' />
            </form>

        </section>
    )
}

export default AddBook;