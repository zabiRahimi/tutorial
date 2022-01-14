import { forwardRef, useImperativeHandle, useState } from "react";
import axios from "axios";
import useScrollTo from "../hooks/useScrollTo";

const Lesson = forwardRef((props, ref) => {
    const { element, setElement, handleElement, lessonSecFun, handleChangeOverflowUl } = props;

    // ارسال این متد به والد و از والد به فرزندش بوک
    useImperativeHandle(ref, () => ({ getLessons, deleteAlertLesson }), []);

    const [valLessons, setValLessons] = useState();

    async function getLessons(book_id) {
        await axios.get(`/getLessons/${book_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                console.log(response.data.lessons.length);
                if (response.data.lessons.length != 0) {
                    setValLessons(response.data.lessons);
                } else {
                    setValLessons('not');
                }

            })
            .catch(error => {
                console.log(error.response);
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })

    }

    const setLessons = () => {
        let val = valLessons.map((lessons, i) => {
            return <li key={i} onClick={() => handleSelectLesson(lessons.id, lessons.lesson)}>{lessons.lesson}</li>
        })
        return val;
    }

    const deleteAlertLesson = () => {
        document.getElementById('lessonError').innerHTML = '';
        document.getElementById('lessonLinkError').innerHTML = '';
        document.getElementById('lessonAlert').innerHTML = '';
    }

    const handleAddLesson = (e) => {
        e.preventDefault();
        axios.post('/saveLesson', { 'book_id': element.book_id, 'lesson': element.lesson , 'lessonLink':element.lessonLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                console.log(response.data.lesson_id);
                setElement(prev => ({ ...prev, lesson: '' }))
                getLessons(element.book_id)
                handleSelectLesson(response.data.lesson_id, element.lesson);
                document.getElementById('lesson').value = '';
                document.getElementById('lessonLink').value = '';

                document.getElementById('lessonAlert').innerHTML = `<div class='success'>درس جدید با موفقیت ایجاد شد</div>`
                useScrollTo('lessonAlert');

            })
            .catch(error => {
                document.getElementById('lessonAlert').innerHTML = '';
                if (error.response.status == 422) {
                    const firstElementError = Object.keys(error.response.data.errors)[0];

                    if (firstElementError == 'book_id') {
                        const errorMessage = 'ابتدا لازم است از کادر انتخاب گروه، گروه مورد نظر را انتخاب یا ایجاد نمایید.'

                        document.getElementById('lessonAlert').innerHTML = `<div class='error'>${errorMessage}</div>`
                        useScrollTo('lessonAlert');

                    } else if (firstElementError == 'lesson') {
                        document.getElementById('lessonError').innerHTML = `<div class="error">${error.response.data.errors['lesson'][0]}</div>`
                        useScrollTo('lessonError');
                    }
                    else if (firstElementError == 'lessonLink') {
                        document.getElementById('lessonLinkError').innerHTML = `<div class="error">${error.response.data.errors['lessonLink'][0]}</div>`
                        useScrollTo('lessonLinkError');
                    }
                }
                else {
                    const errorMessage = 'خطایی رخ داده است، دیتابیس را چک کرده و دوباره تلاش کنید .'
                    document.getElementById('lessonAlert').innerHTML = `<div class="error">${errorMessage}</div>`
                    useScrollTo('lessonAlert');

                }
            })


    }

    const handleSelectLesson = (id, name) => {
        console.log(`${id} , ${name}`);
        // setElement({ lesson_id: id, lessonName: name });
        setElement(prev => ({ ...prev, lesson_id: id, lessonName: name }));
        lessonSecFun.current.deleteAlertLessonSec();


        // // ارجا از پدر، پدر نیز این متد را از فرزند لیسن ارجا گرفته
        // lessonFun.current.getLessons(id);
    }

    return (
        <div className="chunk">
            <div className="title">
                <h6>انتخاب یا ایجاد درس</h6>
            </div>
            <div className="content">
                <div className="Cright">

                    <div className="contentTitle">انتخاب درس موجود</div>
                    <div className="dis">{element.bookName ? `گروه ${element.bookName}` : 'ابتدا گروه را انتخاب کنید'}</div>

                    <div className="dropdown select_book">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleChangeOverflowUl}>
                            انتخاب درس
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {!valLessons ? 'loging' : (valLessons == 'not' ? 'برای این گروه درسی موجود نیست' : setLessons())}
                        </ul>
                    </div>
                </div>

                <div className="Cleft">
                    <div className="contentTitle">ایجاد درس</div>
                    <div className="dis">{element.bookName ? `گروه ${element.bookName}` : 'ابتدا گروه را انتخاب کنید'}</div>
                    <form className='addLessonForm' id="addLessonForm" method="post" onSubmit={handleAddLesson} onFocus={deleteAlertLesson}>
                        <div className="formAlert" id='lessonAlert'></div>
                        <input type="text" dir="auto" className="form-control input_text" id="lesson" onChange={handleElement} placeholder='نام درس' autoComplete="off" />
                        <div className="formError" id='lessonError'></div>

                        <input type="text" dir="auto" className="form-control input_text" id="lessonLink" onChange={handleElement} placeholder='لینک درس' autoComplete="off" />
                        <div className="formError" id='lessonLinkError'></div>
                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                    </form>
                </div>
            </div>
        </div>
    );
})

export default Lesson;