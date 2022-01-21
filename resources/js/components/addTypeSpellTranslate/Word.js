import axios from "axios";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Word = forwardRef((props, ref) => {
    const { element, setElement, handleElement, bookFun, lessonFun, sentenceFun, handleChangeOverflowUl } = props;
    useImperativeHandle(ref, () => ({ getWords, deleteAlertWord }), []);
    const [valWords, setValWords] = useState('');

    const wordForm = useRef(null),
        wordAlert = useRef(null),
        wordLinkError = useRef(null),
        wordError = useRef(null),
        wordMeanError = useRef(null),
        wordPronounceEnError = useRef(null),
        wordPronounceFaError = useRef(null)

    async function getWords(lesson_id) {
        await axios.get(`/getWords/${lesson_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.words.length != 0 ?setValWords(response.data.words) :setValWords('is not');
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    /**
     * این تابع آرایه‌از کلمات را که از دیتابیس اخذ شده است را برای
     * نمایش در لیست کلمات آماده می‌کند
     * @returns <li/>
     */
    const setWords = () => {
        let val = valWords.map((words, i) => {
            return <li key={i} onClick={() => handleSelectWord(words.id, words.word)}>{words.word}</li>
        })
        return val;
    }



    const handleAddWord = (e) => {
        e.preventDefault();
        axios.post('/saveWord', { 'lesson_id': element.lesson_id, 'wordLink': element.wordLink, 'word': element.word, 'mean': element.wordMean, 'pronounceEn': element.wordPronounceEn, 'pronounceFa': element.wordPronounceFa, }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                getWords(element.lesson_id)
                handleSelectWord(response.data.word_id, element.word);
                wordAlert.current.innerHTML = `<div class='success'>کلمه جدید با موفقیت ثبت شد.</div>`
                wordAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
            })
            .catch(error => {
                wordAlert.current.innerHTML = '';

                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'word':
                            divError = wordError.current;
                            break;
                        case 'wordLink':
                            divError = wordLinkError.current;
                            break;
                        case 'wordMean':
                            divError = wordMeanError.current;
                            break;
                        case 'wordPronounceEn':
                            divError = wordPronounceEnError.current;
                            break;
                        case 'wordPronounceFa':
                            divError = wordPronounceFaError.current;
                            break;
                        default: divError = wordAlert.current;
                    }
                    divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                    divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
                else {
                    const errorMessage = 'خطایی رخ داده است، دیتابیس را چک کرده و دوباره تلاش کنید .'
                    wordAlert.current.innerHTML = `<div class="error">${errorMessage}</div>`
                    wordAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
            })
    }

    const handleSelectWord = (id, name) => {
        setElement(prev => ({ ...prev, word: '', wordLink: '',wordMean:'',wordPronounceEn:'',wordPronounceFa:'', word_id: id, wordName: name }));
        deleteAlertWord();
        wordForm.current.reset();
        // ارجا از پدر، پدر نیز این متد را از فرزند لیسن ارجا گرفته
        bookFun.current.deleteAlertBook();
        lessonFun.current.deleteAlertLesson();
        sentenceFun.current.deleteAlertSentence();
    }

    const deleteAlertWord = () => {
        wordAlert.current.innerHTML = ''
        wordLinkError.current.innerHTML = ''
        wordError.current.innerHTML = ''
        wordMeanError.current.innerHTML = ''
        wordPronounceEnError.current.innerHTML = ''
        wordPronounceFaError.current.innerHTML = ''
    }



    return (
        <div className="chunk">
            <div className="title">
                <h6>ایجاد بخش درس</h6>
            </div>
            <div className="content">

                <div className="Cright">

                    <div className="contentTitle">انتخاب کلمه موجود</div>
                    <div className="dis">{element.bookName && element.lessonName ? `گروه ${element.bookName}، درس ${element.lessonName}` : 'ابتدا گروه و درس را انتخاب کنید.'}</div>

                    <div className="dropdown select_book">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleChangeOverflowUl}>
                            انتخاب کلمه
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {!element.lesson_id ? 'ابتدا گروه و درس را انتخاب کنید.' :
                                !valWords ? 'loging' : (valWords == 'is not' ? 'برای این درس کلمه‌ای موجود نیست' : setWords())
                            }
                        </ul>
                    </div>
                </div>

                <div className="Cleft">
                    <div className="contentTitle">ایجاد کلمه</div>
                    <div className="dis">{element.lessonName && element.bookName ? `گروه ${element.bookName} و درس ${element.lessonName}` : 'ابتدا گروه و درس را انتخاب کنید.'}</div>
                    <form className='addWordForm'ref={wordForm} method="post" onSubmit={handleAddWord} onFocus={deleteAlertWord}>

                        <div className="formAlert" ref={wordAlert}></div>

                        <input type="text" dir="auto" className="form-control input_text" onChange={e=>handleElement(e ,'wordLink')} placeholder='لینک کلمه' autoComplete="off" />
                        <div className="formError" ref={wordLinkError}></div>

                        <input type="text" dir="auto" className="form-control input_text" onChange={e=>handleElement(e ,'word')} placeholder=' کلمه' autoComplete="off" />
                        <div className="formError" ref={wordError}></div>

                        <input type="text" dir="auto" className="form-control input_text"  onChange={e=>handleElement(e ,'wordMean')} placeholder='معنی' autoComplete="off" />
                        <div className="formError" ref={wordMeanError}></div>

                        <input type="text" dir="auto" className="form-control input_text" onChange={e=>handleElement(e ,'wordPronounceEn')} placeholder='تلفظ به انگلیسی' autoComplete="off" />
                        <div className="formError" ref={wordPronounceEnError}></div>

                        <input type="text" dir="auto" className="form-control input_text" onChange={e=>handleElement(e ,'wordPronounceFa')} placeholder='تلفظ به فارسی' autoComplete="off" />
                        <div className="formError" ref={wordPronounceFaError}></div>

                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                    </form>
                </div>
            </div>
        </div>
    );
})

export default Word;