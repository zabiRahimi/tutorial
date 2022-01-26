import { forwardRef, useRef } from "react";
import EditorALD from "../../tinymce/EditorAddLessonDev";
// import EditorALD from "../tinymce/EditorAddLessonDev";
import { Link,useOutletContext } from "react-router-dom";


const AddLessonSec = (props, ref) => {
    // const{element , setElement}=props;
    const [element , setElement]=useOutletContext();

    const tinyFun = useRef(),// tiny فراخوانی متد از کاپوننت 
        lessonSecForm = useRef(null),
        lessonSecAlert = useRef(null),
        lessonSecError = useRef(null),
        desError = useRef(null)
        
    const handleAddLessonSection = (e) => {
        e.preventDefault();
        axios.post('/saveLessonSection', { 'lesson_id': element.lesson_id, 'lesson_section': element.lesson_section, 'des': element.des }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                lessonSecForm.current.reset();
                tinyFun.current.setContentTiny();//خالی کردن ادیتور
                lessonSecAlert.current.innerHTML = `<div class='success'>بخش جدید با موفقیت ایجاد شد</div>`
                lessonSecAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });

            })
            .catch(error => {
                lessonSecAlert.current.innerHTML = '';

                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'lesson_section':
                            divError = lessonSecError.current;
                            break;
                        case 'des':
                            divError = desError.current;
                            break;
                        default: divError = lessonSecAlert.current;
                    }
                    divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                    divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
                else {
                    const errorMessage = 'خطایی رخ داده است، دیتابیس را چک کرده و دوباره تلاش کنید .'
                    lessonSecAlert.current.innerHTML = `<div class="error">${errorMessage}</div>`
                    lessonSecAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
            })
    }

    const deleteAlertLessonSec = () => {
        lessonSecAlert.current.innerHTML = '';
        lessonSecError.current.innerHTML = '';
        desError.current.innerHTML = '';
    }
    return (
        <section>
            <div className="contentTitle">ایجاد بخش</div>
            <div className="dis">{element.lessonName && element.bookName ? `گروه ${element.bookName} و درس ${element.lessonName}` : 'ابتدا گروه و سپس درس را انتخاب یا ایجاد کنید.'}</div>

            <form className='addLessonSecForm' ref={lessonSecForm} method="post" onSubmit={handleAddLessonSection} onFocus={deleteAlertLessonSec}>

                <div className="formAlert" ref={lessonSecAlert}></div>

                <input type="text" dir="auto" className="form-control input_text" id="lesson_section" onChange={e => handleSaveValInput(e, 'lesson_section')} placeholder='تیتر درس' autoComplete="off" />

                <div className="formError" ref={lessonSecError}></div>

                <div className="labelTextarea">متن درس</div>
                <EditorALD
                    ref={tinyFun}
                    setElement={setElement}
                    element={element}
                />
                <div className="formError" ref={desError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت' />
            </form>

        </section>

    )
}

export default forwardRef(AddLessonSec);