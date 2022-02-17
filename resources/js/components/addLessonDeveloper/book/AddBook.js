import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from "sweetalert2";

const AddBook = () => {
    useChengeDocumentTitle('add book');

    const { setIndex, valBooks, setValBooks, setBook } = useOutletContext();

    const [input, setInput] = useState({
        book: '',
        link: '',
    });

    const form = useRef(null),
        notify = useRef(null),
        bookError = useRef(null),
        linkError = useRef(null);


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
    const deleteAlert = () => {
        bookError.current.innerHTML = '';
        linkError.current.innerHTML = '';
        notify.current.innerHTML = '';
    }

    const handleAddBook = (e) => {
        e.preventDefault();
        axios.post('/saveBook', { ...input }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {

                const id = response.data.id;

                form.current.reset();

                setIndex(prev => ({ ...prev, book_id: id, book: input.book }));

                setBook({ id, ...input });

                //کتاب ایجاد شده را به آرایه کتابها اضافه می‌کند
                valBooks.push({ id, ...input });

                setValBooks(valBooks);

                setInput({ book: '', link: '' });

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'ثبت کتاب با موفقیت انجام شد .',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
            .catch(error => {
                notify.current.innerHTML = ''
                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'book':
                            divError = bookError.current
                            break;
                        case 'link':
                            divError = linkError.current
                    }
                    divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                    divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
                else {
                    notify.current.innerHTML = `<div class='error'>'خطایی رخ داده است، مطمعن شوید دیتابیس فعال است.'</div>`
                    notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
            })
    }

    return (
        <section className="SAED_content">
            <form className='AE_Form' ref={form} method="post" onSubmit={handleAddBook} onFocus={deleteAlert}>

                <div className="formAlert" ref={notify} ></div>

                <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'book')} placeholder='نام کتاب' autoComplete="off" />

                <div className="formError" ref={bookError} ></div>

                <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'link')} placeholder='لینک کتاب' autoComplete="off" />

                <div className="formError" ref={linkError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت' />
            </form>

        </section>
    )
}

export default AddBook;