import { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";

const EditDelBookType=()=>{
    useChengeDocumentTitle('edit or delete book type spell translate');

    const navigate = useNavigate();

    const form = useRef(null),
        notify = useRef(null),
        bookError = useRef(null),
        linkError = useRef(null);

    const { setIndex, valBooks, setValBooks, book, setBook } = useOutletContext();

    const [input, setInput] = useState({
        book: book.book,
        link: book.link
    });

    const [count, setCount] = useState({
        lesson: 0,
        word: 0,
        sentence: 0
    })

    /**
     * دریافت تعداد فصلها و بخشهای کتاب
     * مورد استفاده هنگام حذف کتاب برای هشدار به کاربر
     * @param {*} bookType_id 
     */
    async function getOneBook(id) {
        await axios.get(`/getOneBookType/${id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            
                .then(response => {
                    const data=response.data;

                    data.book.length != 0 ? setCount({lesson:data.lessonCount, word:data.wordCount, sentence:data.sentenceCount}) 
                    : 
                    setCount({lesson:0, word:0, sentence:0});
                })
                .catch(error => {
                    alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
                })
            
    }

    useEffect(() => {
        checkHasBookId()
        book.id?getOneBook(book.id):'';
    }, [book.id])

    /**
     * این متد چک می‌کند که کاربر یک کتاب را برای ویرایش و حذف انتخاب کرده باشد
     */
    const checkHasBookId = () => {
        if (book.id) { } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'هیچ کتابی انتخاب و یا ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                valBooks.length == 0 ?
                    //چنانچه هیچ کتابی از قبل ایجاد نشده باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addTypeSpellTranslate/bookType/add`) :
                    //چنانچه کتابی وجود داشته باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addTypeSpellTranslate/bookType/select`);
            });
        }
    }

    /**
   * این متد همه اعلانهای فرم ایجاد گروه را پاک می‌کند
   */
    const deleteAlert = () => {
        bookError.current.innerHTML = '';
        linkError.current.innerHTML = '';
        notify.current.innerHTML = '';
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
        axios.put(`/editBookType/${book.id}`, {...input }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                deleteAlert();
                setIndex(prev => ({ ...prev, book: input.book }));

                // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
                let newBooks = valBooks.map((valBook) => {
                    if (valBook.id == book.id) return Object.assign({}, valBook, { ...input});
                    return valBook;
                });
                setValBooks(newBooks);

                notify.current.innerHTML = `<div class='success'>کتاب با موفقیت ویرایش شد.</div>`
                notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
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

    function deleteBook(bookId) {
        Swal.fire({
            title: 'آیا مایل به حذف این کتاب هستید؟',
            color: '#aa4f0f',
            html: `<div class='swalDelete'><div class="bold">توجه</div><div class="text">این گروه شامل<br /> ${count.lesson} فصل و ${count.word} کلمه و ${count.sentence} جمله است .</div></div>`,

            showCancelButton: true,
            confirmButtonText: 'delete',
            confirmButtonColor: '#ffd600',
            preConfirm: () => {
                return axios.delete(`/deleteBookType/${bookId}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                    .then(response => {

                        const index = valBooks.findIndex(({ id }) => id === bookId);
                        
                        valBooks.splice(index, 1);

                        setValBooks(valBooks);

                        setIndex(prev => ({ ...prev, book_id: '', book: '' }));

                        setBook({id:'',book:'',link:''});

                        setInput({book: '', link: ''});
                        
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'کتاب با موفقیت حذف شد',
                            showConfirmButton: false,
                            timer: 4000
                        }).then((result) => {
                            valBooks.length == 0 ? navigate(`/addTypeSpellTranslate/bookType/add`) :
                                navigate(`/addTypeSpellTranslate/bookType/select`);
                        })
                    })
                    .catch(error => {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'کتاب حذف نشد !!',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    })
            }
        })

    }

    return (
        <section className="SAED_content">
            <form className='AE_Form' ref={form} method="post" onSubmit={handleEditBook} onFocus={deleteAlert}>

                <div className="formAlert" ref={notify} ></div>

                <input type="text" dir="auto" className="form-control input_text" value={input.book} onChange={e => handleSaveValInput(e, 'book')} placeholder='نام کتاب' autoComplete="off" />

                <div className="formError" ref={bookError} ></div>

                <input type="text" dir="auto" className="form-control input_text" value={input.link} onChange={e => handleSaveValInput(e, 'link')} placeholder='لینک کتاب' autoComplete="off" />

                <div className="formError" ref={linkError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت ویرایش' />
                <input type="button" className='btn btn-danger btn_form btn_form_danger' onClick={() => deleteBook(book.id)} value='حذف کتاب' />
            </form>
        </section>
    )
}

export default EditDelBookType;