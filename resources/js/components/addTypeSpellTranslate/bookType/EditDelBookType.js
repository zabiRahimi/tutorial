import { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";

const EditDelBookType=()=>{
    useChengeDocumentTitle('edit or delete book type spell translate');

    const navigate = useNavigate();

    const bookTypeForm = useRef(null),
        bookTypeAlert = useRef(null),
        bookTypeError = useRef(null),
        bookTypeLinkError = useRef(null);

    const { element, setElement, valBookTypes, setValBookTypes } = useOutletContext();

    const [input, setInput] = useState({
        bookType_id: element.bookType_id,
        bookType: element.bookType,
        bookTypeLink: element.bookTypeLink
    });

    const [count, setCount] = useState({
        lessonTypeCount: 0,
        wordTypeCount: 0,
        sentenceTypeCount: 0
    })

    /**
     * دریافت تعداد فصلها و بخشهای کتاب
     * مورد استفاده هنگام حذف کتاب برای هشدار به کاربر
     * @param {*} bookType_id 
     */
    async function getOneBookType(bookType_id) {
        await axios.get(`/getOneBookType/${bookType_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            
                .then(response => {
                    response.data.bookType.length != 0 ? (setCount({lessonTypeCount:response.data.lessonCount, wordTypeCount:response.data.wordCount, sentenceTypeCount:response.data.sentenceCount})) : setCount({lessonTypeCount:0, wordTypeCount:0, sentenceTypeCount:0});
                })
                .catch(error => {
                    alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
                })
            
    }

    useEffect(() => {
        checkHasBookTypeId()
        getOneBookType(input.bookType_id)
    }, [input.bookType_id])

    /**
     * این متد چک می‌کند که کاربر یک کتاب را برای ویرایش و حذف انتخاب کرده باشد
     */
    const checkHasBookTypeId = () => {
        if (input.bookType_id) { } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'هیچ کتابی انتخاب و یا ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then((result) => {
                valBookTypes.length == 0 ?
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
    const deleteAlertBookType = () => {
        bookTypeError.current.innerHTML = '';
        bookTypeLinkError.current.innerHTML = '';
        bookTypeAlert.current.innerHTML = '';
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

    const handleEditBookType = (e) => {
        e.preventDefault();
        axios.put(`/editBookType/${input.bookType_id}`, { 'book': input.bookType, 'bookLink': input.bookTypeLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                deleteAlertBookType();
                setElement(prev => ({ ...prev, bookType: input.bookType, bookTypeLink:input.bookTypeLink }));
                // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
                let newBookTypes = valBookTypes.map((valBookType) => {
                    if (valBookType.id == input.bookType_id) return Object.assign({}, valBookType, { book: input.bookType, 'bookLink': input.bookTypeLink });
                    return valBookType;
                });
                setValBookTypes(newBookTypes);
                bookTypeAlert.current.innerHTML = `<div class='success'>کتاب با موفقیت ویرایش شد.</div>`
                bookTypeAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
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

    function deleteBookType(bookTypeId) {
        Swal.fire({
            title: 'آیا مایل به حذف این کتاب هستید؟',
            color: '#aa4f0f',
            html: `<div class='swalDelete'><div class="bold">توجه</div><div class="text">این گروه شامل<br /> ${count.lessonTypeCount} فصل و ${count.wordTypeCount} کلمه و ${count.sentenceTypeCount} جمله است .</div></div>`,

            showCancelButton: true,
            confirmButtonText: 'delete',
            confirmButtonColor: '#ffd600',
            preConfirm: () => {
                return axios.delete(`/deleteBookType/${bookTypeId}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                    .then(response => {
                        const index = valBookTypes.findIndex(({ id }) => id === bookTypeId)
                        valBookTypes.splice(index, 1)
                        setValBookTypes(valBookTypes)
                        setElement(prev => ({ ...prev, bookType_id: '', bookType: '', bookTypeLink: '' }));
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'کتاب با موفقیت حذف شد',
                            showConfirmButton: false,
                            timer: 4000
                        }).then((result) => {
                            valBookTypes.length == 0 ? navigate(`/addTypeSpellTranslate/bookType/add`) :
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
            <form className='AE_Form' ref={bookTypeForm} method="post" onSubmit={handleEditBookType} onFocus={deleteAlertBookType}>

                <div className="formAlert" ref={bookTypeAlert} ></div>

                <input type="text" dir="auto" className="form-control input_text" value={input.bookType} onChange={e => handleSaveValInput(e, 'bookType')} placeholder='نام کتاب' autoComplete="off" />

                <div className="formError" ref={bookTypeError} ></div>

                <input type="text" dir="auto" className="form-control input_text" value={input.bookTypeLink} onChange={e => handleSaveValInput(e, 'bookTypeLink')} placeholder='لینک کتاب' autoComplete="off" />

                <div className="formError" ref={bookTypeLinkError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت ویرایش' />
                <input type="button" className='btn btn-danger btn_form btn_form_danger' onClick={() => deleteBookType(input.bookType_id)} value='حذف کتاب' />
            </form>
        </section>
    )
}

export default EditDelBookType;