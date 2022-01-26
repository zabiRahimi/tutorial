import { forwardRef, useRef } from "react";
import { Link } from "react-router-dom";

const AddBook =(props , ref)=>{
    const {handleSaveValInput}=props;
    const bookForm = useRef(null),
    bookAlert = useRef(null),
    bookError = useRef(null),
    bookLinkError = useRef(null);

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
        axios.post('/saveBook', { 'book': element.book, 'bookLink': element.bookLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                // getBooks();
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
        <section className="addBook">
           <div className="contentTitle">ایجاد گروه جدید</div>
                    <form className='addBookForm' ref={bookForm} method="post" onSubmit={handleAddBook} onFocus={deleteAlertBook}>

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

export default forwardRef(AddBook);