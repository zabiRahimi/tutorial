import {  useRef, useState } from "react";
import {  useOutletContext} from "react-router-dom";
import Swal from "sweetalert2";

const AddLessonType=()=>{
    const {index, setIndex, valLessons, setValLessons, setLesson } = useOutletContext();

    const form = useRef(null),
    notify = useRef(null),
    lessonError = useRef(null),
    linkError = useRef(null);

    const [input , setInput]=useState({
        lesson:'',
        link:''
    })

    const deleteAlert = () => {
        lessonError.current.innerHTML = '';
        linkError.current.innerHTML = '';
        notify.current.innerHTML = '';
    }

    const handleAddLesson = (e) => {
        e.preventDefault();
        axios.post('/saveLessonType', { 'book_id': index.book_id, ...input }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                const id= response.data.lesson_id;

                form.current.reset();

                setIndex(prev => ({ ...prev, lesson_id: id, lesson: input.lesson}));

                setLesson({id, ...input});

                setInput(() => ({ lesson: '', link: '' }));

                //کتاب ایجاد شده را به آرایه کتابها اضافه می‌کند
                valLessons.push({id:id, ...input});

                setValLessons(valLessons);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'فصل کتاب با موفقیت ثبت شد',
                    showConfirmButton: false,
                    timer: 3000
                });
            })
            .catch(error => {
                notify.current.innerHTML = '';

                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'lesson':
                            divError = lessonError.current;
                            break;
                        case 'link':
                            divError = linkError.current;
                            break;
                        default: divError = notify.current;
                    }
                    divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                    divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
                else {
                    const errorMessage = 'خطایی رخ داده است، دیتابیس را چک کرده و دوباره تلاش کنید .'
                    notify.current.innerHTML = `<div class="error">${errorMessage}</div>`
                    notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
            })
    }

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
    
    return (
        <section className="SAED_content">

                    <form className='AE_Form' ref={form} method="post" onSubmit={handleAddLesson} onFocus={deleteAlert}>
                        <div className="formAlert" ref={notify}></div>

                        <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'lesson')} placeholder='نام فصل' autoComplete="off" />
                        <div className="formError" ref={lessonError}></div>

                        <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'link')} placeholder='لینک فصل' autoComplete="off" />
                        <div className="formError" ref={linkError} ></div>

                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                    </form>
        </section>
    )
}


export default AddLessonType;