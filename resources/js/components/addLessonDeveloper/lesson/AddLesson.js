import { forwardRef, useRef } from "react";
import { Link } from "react-router-dom";

const AddLesson=(props , ref)=>{
const {element}=props;
    const lessonForm = useRef(null),
    lessonAlert = useRef(null),
    lessonError = useRef(null),
    lessonLinkError = useRef(null)

    const deleteAlertLesson = () => {
        lessonError.current.innerHTML = '';
        lessonLinkError.current.innerHTML = '';
        lessonAlert.current.innerHTML = '';
    }

    const handleAddLesson = (e) => {
        e.preventDefault();
        axios.post('/saveLesson', { 'book_id': element.book_id, 'lesson': element.lesson, 'lessonLink': element.lessonLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                getLessons(element.book_id)
                handleSelectLesson(response.data.lesson_id, element.lesson);
                lessonAlert.current.innerHTML = `<div class='success'>درس جدید با موفقیت ایجاد شد</div>`
                lessonAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
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

    return (
        <section>
            <div className="contentTitle">ایجاد درس</div>
                    <div className="dis">{element.bookName ? `گروه ${element.bookName}` : 'ابتدا گروه را انتخاب کنید'}</div>

                    <form className='addLessonForm' ref={lessonForm} method="post" onSubmit={handleAddLesson} onFocus={deleteAlertLesson}>
                        <div className="formAlert" ref={lessonAlert}></div>

                        <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'lesson')} placeholder='نام درس' autoComplete="off" />
                        <div className="formError" ref={lessonError}></div>

                        <input type="text" dir="auto" className="form-control input_text" id="lessonLink" onChange={e => handleSaveValInput(e, 'lessonLink')} placeholder='لینک درس' autoComplete="off" />
                        <div className="formError" ref={lessonLinkError} ></div>

                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                    </form>
        </section>
    )
}

export default forwardRef(AddLesson);