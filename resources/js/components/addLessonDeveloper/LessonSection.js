import axios from "axios";
import { forwardRef, useImperativeHandle, useRef } from "react";
import EditorALD from "../tinymce/EditorAddLessonDev";
import useScrollTo from "../hooks/useScrollTo";

const LessonSection = forwardRef((props, ref) => {
    const { element, setElement, handleElement } = props;
    useImperativeHandle(ref, () => ({ deleteAlertLessonSec }), []);
    const tinyFun = useRef();// tiny فراخوانی متد از کاپوننت 

    const handleAddLessonSection = (e) => {
        e.preventDefault();
        axios.post('/saveLessonSection', { 'lesson_id': element.lesson_id, 'lesson_section': element.lesson_section, 'des': element.des }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                document.getElementById('lesson_section').value = '';
                tinyFun.current.setContentTiny();//خالی کردن ادیتور
                document.getElementById('lessonSecAlert').innerHTML = `<div class='success'>بخش جدید با موفقیت ایجاد شد</div>`
                useScrollTo('lessonSecAlert')
            })
            .catch(error => {
                if (error.response.status == 422) {
                    const firstElementError = Object.keys(error.response.data.errors)[0];
                    if (firstElementError == 'lesson_id') {
                        const errorMessage = 'ابتدا گروه و سپس درس را انتخاب یا ایجاد کنید.';
                        document.getElementById('lessonSecAlert').innerHTML = `<div class='error'>${errorMessage}</div>`
                        useScrollTo('lessonSecAlert');
                    } else if (firstElementError == 'lesson_section') {
                        document.getElementById('lessonSecError').innerHTML = `<div class="error">${error.response.data.errors['lesson_section'][0]}</div>`
                        useScrollTo('lessonSecError');

                    } else if (firstElementError == 'des') {
                        document.getElementById('desError').innerHTML = `<div class="error">${error.response.data.errors['des'][0]}</div>`
                        useScrollTo('desError');
                    }
                }
                else {
                    const errorMessage = 'خطایی رخ داده است، دیتابیس را چک کرده و دوباره تلاش کنید .'
                    document.getElementById('lessonSecAlert').innerHTML = `<div class="error">${errorMessage}</div>`
                    useScrollTo('lessonSecAlert');
                }
            })
    }

    const deleteAlertLessonSec = () => {
        document.getElementById('lessonSecAlert').innerHTML = '';
        document.getElementById('lessonSecError').innerHTML = '';
        document.getElementById('desError').innerHTML = '';
    }



    return (
        <div className="chunk">
            <div className="title">
                <h6>ایجاد بخش درس</h6>
            </div>

            <div className="content">
                <div className="Ccenter">
                    <div className="contentTitle">ایجاد بخش</div>
                    <div className="dis">{element.lessonName && element.bookName ? `گروه ${element.bookName} و درس ${element.lessonName}` : 'ابتدا گروه و سپس درس را انتخاب یا ایجاد کنید.'}</div>
                    <form className='addLessonSecForm' id="addLessonSecForm" method="post" onSubmit={handleAddLessonSection} onFocus={deleteAlertLessonSec}>
                        <div className="formAlert" id='lessonSecAlert'></div>
                        <input type="text" dir="auto" className="form-control input_text" id="lesson_section" onChange={handleElement} placeholder='تیتر درس' autoComplete="off" />
                        <div className="formError" id='lessonSecError'></div>
                        <div className="labelTextarea">متن درس</div>
                        <EditorALD
                            ref={tinyFun}
                            setElement={setElement}
                            element={element}
                        />
                        <div className="formError" id='desError'></div>
                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                    </form>
                </div>
            </div>
        </div>
    );
})

export default LessonSection;