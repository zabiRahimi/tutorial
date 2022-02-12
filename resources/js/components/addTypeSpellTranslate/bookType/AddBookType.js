import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from "sweetalert2";

const AddBookType=()=>{
    useChengeDocumentTitle('add book type spell translate');

    let navigate = useNavigate();

    const [input, setInput] = useState({
        bookType: '',
        bookTypeLink: '',
    });

    const bookTypeForm = useRef(null),
        bookTypeAlert = useRef(null),
        bookTypeError = useRef(null),
        bookTypeLinkError = useRef(null);

    const { setElement,valBookTypes,setValBookTypes } = useOutletContext();

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
    const deleteAlertBookType = () => {
        bookTypeError.current.innerHTML = '';
        bookTypeLinkError.current.innerHTML = '';
        bookTypeAlert.current.innerHTML = '';
    }

    const handleAddBookType = (e) => {
        e.preventDefault();
        axios.post('/saveBookType', { 'book': input.bookType, 'bookLink': input.bookTypeLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then( response => {
                 bookTypeForm.current.reset();
                 setElement(prev => ({ ...prev, bookType_id: response.data.book_id, bookType: input.bookType ,bookTypeLink:input.bookTypeLink }));
                 setInput(prev => ({ ...prev, bookType: '', bookTypeLink: '' }));
                 //کتاب ایجاد شده را به آرایه کتابها اضافه می‌کند
                 valBookTypes.push({id:response.data.book_id, book: input.bookType ,bookLink:input.bookTypeLink})
                setValBookTypes(valBookTypes)
                 Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'ثبت کتاب با موفقیت انجام شد .',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
            .catch(error => {
                bookTypeAlert.current.innerHTML = ''
                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'book':
                            divError = bookTypeError.current
                            break;
                        case 'bookLink':
                            divError = bookTypeLinkError.current
                    }
                    divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                    divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
                else {
                    bookTypeAlert.current.innerHTML = `<div class='error'>'خطایی رخ داده است، مطمعن شوید دیتابیس فعال است.'</div>`
                    bookTypeAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
            })
    }

    return (
        <section className="SAED_content">
            <form className='AE_Form' ref={bookTypeForm} method="post" onSubmit={handleAddBookType} onFocus={deleteAlertBookType}>

                <div className="formAlert" ref={bookTypeAlert} ></div>

                <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'bookType')} placeholder='نام کتاب' autoComplete="off" />

                <div className="formError" ref={bookTypeError} ></div>

                <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'bookTypeLink')} placeholder='لینک کتاب' autoComplete="off" />

                <div className="formError" ref={bookTypeLinkError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت' />
            </form>

        </section>
    )
}

export default AddBookType;