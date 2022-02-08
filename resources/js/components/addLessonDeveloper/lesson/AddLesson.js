import {  useRef, useState } from "react";
import {  useOutletContext} from "react-router-dom";
import Swal from "sweetalert2";


const AddLesson=()=>{
    const { element, setElement,valLessons, setValLessons } = useOutletContext();

    const lessonForm = useRef(null),
    lessonAlert = useRef(null),
    lessonError = useRef(null),
    lessonLinkError = useRef(null);

    const [input , setInput]=useState({
        lesson:'',
        lessonLink:''
    })

    const deleteAlertLesson = () => {
        lessonError.current.innerHTML = '';
        lessonLinkError.current.innerHTML = '';
        lessonAlert.current.innerHTML = '';
    }

    const handleAddLesson = (e) => {
        e.preventDefault();
        axios.post('/saveLesson', { 'book_id': element.book_id, 'lesson': input.lesson, 'lessonLink': input.lessonLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                lessonForm.current.reset();
                setElement(prev => ({ ...prev, lesson_id: response.data.lesson_id, lesson: input.lesson ,lessonLink:input.lessonLink }));
                 setInput(() => ({ lesson: '', lessonLink: '' }));
                //کتاب ایجاد شده را به آرایه کتابها اضافه می‌کند
                valLessons.push({id:response.data.lesson_id, lesson: input.lesson ,lessonLink:input.lessonLink})
                setValLessons(valLessons)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'فصل کتاب با موفقیت ثبت شد',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
            .catch(error => {
                lessonAlert.current.innerHTML = '';

                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'lesson':
                            divError = lessonError.current;
                            break;
                        case 'lessonLink':
                            divError = lessonLinkError.current;
                            break;
                        default: divError = lessonAlert.current;
                    }
                    divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                    divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
                else {
                    const errorMessage = 'خطایی رخ داده است، دیتابیس را چک کرده و دوباره تلاش کنید .'
                    lessonAlert.current.innerHTML = `<div class="error">${errorMessage}</div>`
                    lessonAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
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

                    <form className='AE_Form' ref={lessonForm} method="post" onSubmit={handleAddLesson} onFocus={deleteAlertLesson}>
                        <div className="formAlert" ref={lessonAlert}></div>

                        <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'lesson')} placeholder='نام فصل' autoComplete="off" />
                        <div className="formError" ref={lessonError}></div>

                        <input type="text" dir="auto" className="form-control input_text" id="lessonLink" onChange={e => handleSaveValInput(e, 'lessonLink')} placeholder='لینک فصل' autoComplete="off" />
                        <div className="formError" ref={lessonLinkError} ></div>

                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                    </form>
        </section>
    )
}

export default AddLesson;