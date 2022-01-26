import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import axios from "axios";

const Lesson = forwardRef((props, ref) => {
    const { element, setElement, handleSaveValInput, bookFun, wordFun, sentenceFun, handleChangeOverflowUl } = props;

    // ارسال این متد به والد و از والد به فرزندش بوک
    useImperativeHandle(ref, () => ({ getLessons, deleteAlertLesson }), []);

    const [valLessons, setValLessons] = useState();
    const lessonForm = useRef(null),
        lessonAlert = useRef(null),
        lessonError = useRef(null),
        lessonLinkError = useRef(null)

    async function getLessons(book_id) {
        await axios.get(`/getLessonTypes/${book_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.lessons.length != 0 ? setValLessons(response.data.lessons) : setValLessons('is not');
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    /**
     * این تابع آرایه‌‍‌ای از دروس را که از دیتابیس اخذ شده است را برای
     * نمایش در لیست درس ها آماده می کند 
     * @returns <li/>
     */
    const setLessons = () => {
        let val = valLessons.map((lessons, i) => {
            return <li key={i} onClick={() => handleSelectLesson(lessons.id, lessons.lesson)}>{lessons.lesson}</li>
        })
        return val;
    }

    const deleteAlertLesson = () => {
        lessonError.current.innerHTML = '';
        lessonLinkError.current.innerHTML = '';
        lessonAlert.current.innerHTML = '';
    }

    const handleAddLesson = (e) => {
        e.preventDefault();
        axios.post('/saveLessonType', { 'book_id': element.book_id, 'lesson': element.lesson, 'lessonLink': element.lessonLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
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

    const handleSelectLesson = (id, name) => {
        setElement(prev => ({ ...prev, lesson: '', lessonLink: '', lesson_id: id, lessonName: name }));
        deleteAlertLesson()
        lessonForm.current.reset();//خالی کردن فرم درس ها
        // ارجا از پدر، پدر نیز این متد را از فرزند لیسن ارجا گرفته
        bookFun.current.deleteAlertBook();
        wordFun.current.getWords(id);
        wordFun.current.deleteAlertWord();
        sentenceFun.current.deleteAlertSentence();
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
                            {!element.book_id ? <div className="seletct_alert">ابتدا گروه را انتخاب کنید.</div> : !valLessons ? <div className="d-flex justify-content-center select_spinner">
                                <div className="spinner-border " role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : (valLessons == 'is not' ? <div className="seletct_alert"> برای این گروه درسی موجود نیست</div> : setLessons())}
                        </ul>
                    </div>
                </div>

                <div className="Cleft">
                    <div className="contentTitle">ایجاد درس</div>
                    <div className="dis">{element.bookName ? `گروه ${element.bookName}` : 'ابتدا گروه را انتخاب کنید'}</div>
                    
                    <form className='addLessonForm' id="addLessonForm" method="post" ref={lessonForm} onSubmit={handleAddLesson} onFocus={deleteAlertLesson}>

                        <div className="formAlert" ref={lessonAlert} ></div>

                        <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'lesson')} placeholder='نام درس' autoComplete="off" />
                        <div className="formError" ref={lessonError}></div>

                        <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'lessonLink')} placeholder='لینک درس' autoComplete="off" />
                        <div className="formError" ref={lessonLinkError}></div>

                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                    </form>
                </div>
            </div>
        </div>
    );
})

export default Lesson;