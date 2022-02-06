import { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";

const EditDelBook = () => {
    useChengeDocumentTitle('edit or delete book');

    let navigate = useNavigate();

    const bookForm = useRef(null),
        bookAlert = useRef(null),
        bookError = useRef(null),
        bookLinkError = useRef(null);

    const { element, setElement, valBooks, setValBooks } = useOutletContext();

    const [input, setInput] = useState({
        book_id: element.book_id,
        book: element.book,
        bookLink: element.bookLink
    });

    const [count, setCount] = useState({
        lessonCount: 0,
        lessonSecCount: 0
    })

    /**
     * دریافت تعداد فصلها و بخشهای کتاب
     * مورد استفاده هنگام حذف کتاب برای هشدار به کاربر
     * @param {*} book_id 
     */
    async function getLessons(book_id) {
        await axios.get(`/getLessons/${book_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.lessonCount != 0 ?
                    setCount(prev => ({ ...prev, 'lessonCount': response.data.lessonCount, 'lessonSecCount': response.data.lessonSecCount }))
                    :
                    setCount(prev => ({ ...prev, 'lessonCount': 0, 'lessonSecCount': 0 }));
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    useEffect(() => {
        checkHasBookId()
        getLessons(input.book_id)
    }, [input.book_id])

    /**
     * این متد چک می‌کند که کاربر یک کتاب را برای ویرایش و حذف انتخاب کرده باشد
     */
    const checkHasBookId = () => {
        if (input.book_id) { } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'هیچ کتابی انتخاب و یا ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then((result) => {
                valBooks.length == 0 ?
                    //چنانچه هیچ کتابی از قبل ایجاد نشده باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addLessonDeveloper/book/add`) :
                    //چنانچه کتابی وجود داشته باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addLessonDeveloper/book/select`);
            });
        }
    }

    /**
   * این متد همه اعلانهای فرم ایجاد گروه را پاک می‌کند
   */
    const deleteAlertBook = () => {
        bookError.current.innerHTML = '';
        bookLinkError.current.innerHTML = '';
        bookAlert.current.innerHTML = '';
    }

    /**
     * هنگامی که کاربر مقدار یک باکس را وارد می‌کند، این متد آن را ذخیره می‌کند
     * @param {*} e 
     * @param {*} input 
     */
    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        setInput(prev => ({ ...prev, [input]: value }));
    }

    const handleEditBook = (e) => {
        e.preventDefault();
        axios.put(`/editBook/${input.book_id}`, { 'book': input.book, 'bookLink': input.bookLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                deleteAlertBook();
                // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
                let newBooks = valBooks.map((valBook) => {
                    if (valBook.id == input.book_id) return Object.assign({}, valBook, { book: input.book, 'bookLink': input.bookLink });
                    return valBook;
                });
                setValBooks(newBooks);
                bookAlert.current.innerHTML = `<div class='success'>کتاب با موفقیت ویرایش شد.</div>`
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

    function deleteBook(bookId) {
        Swal.fire({
            title: 'آیا مایل به حذف این گروه هستید؟',
            color: '#aa4f0f',
            html: `<div class='swalDelete'><div class="bold">توجه</div><div class="text">این گروه شامل<br /> ${count.lessonCount} درس و ${count.lessonSecCount} بخش است.</div></div>`,

            showCancelButton: true,
            confirmButtonText: 'delete',
            confirmButtonColor: '#ffd600',
            preConfirm: () => {
                return axios.delete(`/deleteBook/${bookId}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                    .then(response => {
                        const index = valBooks.findIndex(({ id }) => id === bookId)
                        valBooks.splice(index, 1)
                        setValBooks(valBooks)
                        setElement(prev => ({ ...prev, book_id: '', book: '', bookLink: '' }));
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'گروه با موفقیت حذف شد',
                            showConfirmButton: false,
                            timer: 4000
                        }).then((result) => {
                            valBooks.length == 0 ? navigate(`/addLessonDeveloper/book/add`) :
                                navigate(`/addLessonDeveloper/book/select`);
                        })
                    })
                    .catch(error => {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'گروه حذف نشد !!',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    })
            }
        })

    }

    return (
        <section className="SAED_content">
            <form className='AE_Form' ref={bookForm} method="post" onSubmit={handleEditBook} onFocus={deleteAlertBook}>

                <div className="formAlert" ref={bookAlert} ></div>

                <input type="text" dir="auto" className="form-control input_text" value={input.book} onChange={e => handleSaveValInput(e, 'book')} placeholder='نام گروه' autoComplete="off" />

                <div className="formError" ref={bookError} ></div>

                <input type="text" dir="auto" className="form-control input_text" value={input.bookLink} onChange={e => handleSaveValInput(e, 'bookLink')} placeholder='لینک گروه' autoComplete="off" />

                <div className="formError" ref={bookLinkError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت ویرایش' />
                <input type="button" className='btn btn-danger btn_form' onClick={() => deleteBook(input.book_id)} value='حذف کتاب' />
            </form>
        </section>
    )
}

export default EditDelBook;