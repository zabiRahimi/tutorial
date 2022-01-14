import axios from "axios";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const LessonSection = forwardRef((props, ref) => {
    const { element, handleElement } = props;
    useImperativeHandle(ref, () => ({ deleteAlertSentence }), []);
    const sentenceForm = useRef(null),
        sentenceAlert = useRef(null),
        sentenceError = useRef(null),
        sentenceMeanError = useRef(null),
        sentencePronounceEnError = useRef(null),
        sentencePronounceFaError = useRef(null)

    const handleAddSentence = (e) => {
        e.preventDefault();
        axios.post('/saveSentence', { 'word_id': element.word_id, 'sentenceLink': element.sentenceLink, 'sentence': element.sentence, 'sentenceMean': element.sentenceMean, 'sentencePronounceEn': element.sentencePronounceEn, 'sentencePronounceFa': element.sentencePronounceFa }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(() => {
                resetForm()
                sentenceAlert.current.innerHTML = `<div class='success'>جمله جدید با موفقیت ثبت شد.</div>`
                sentenceAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
            })
            .catch(error => {
                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'sentence':
                            divError = sentenceError.current;
                            break;
                        case 'sentenceMean':
                            divError = sentenceMeanError.current;
                            break;
                        case 'sentencePronounceEn':
                            divError = sentencePronounceEnError.current;
                            break;
                        case 'sentencePronounceFa':
                            divError = sentencePronounceFaError.current;
                            break;
                        default: divError = sentenceAlert.current;
                    }
                    divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                    divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
                else {
                    const errorMessage = 'خطایی رخ داده است، دیتابیس را چک کرده و دوباره تلاش کنید .'
                    sentenceAlert.current.innerHTML = `<div class="error">${errorMessage}</div>`
                    sentenceAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
            })
    }

    const resetForm=()=>{
        setElement(prev => ({ ...prev, sentence: '',sentenceMean:'',sentencePronounceEn:'',sentencePronounceFa:''}));
        sentenceForm.current.reset();
    }

    const deleteAlertSentence = () => {
        sentenceAlert.current.innerHTML = '';
        sentenceError.current.innerHTML = '';
        sentenceMeanError.current.innerHTML = '';
        sentencePronounceEnError.current.innerHTML = '';
        sentencePronounceFaError.current.innerHTML = '';
    }

    return (
        <div className="chunk">
            <div className="title">
                <h6>ایجاد بخش درس</h6>
            </div>

            <div className="content">
                <div className="Ccenter Ccenter2">
                    <div className="contentTitle">ایجاد بخش</div>
                    <div className="dis">{element.lessonName && element.bookName && element.wordName ? `گروه ${element.bookName} و درس ${element.lessonName} و کلمه ${element.wordName}` : 'ابتدا گروه، درس و سپس کلمه را انتخاب کنید.'}</div>

                    <form className='addSentenceForm' ref={sentenceForm} method="post" onSubmit={handleAddSentence} onFocus={deleteAlertSentence}>

                        <div className="formAlert sentenceAlert" ref={sentenceAlert}>alert sentence</div>

                        <div className="sentenceFormItem">
                            <textarea dir="auto" className="form-control input_text"  onChange={e=>handleElement(e,'sentence')} placeholder='جمله' autoComplete="off" />
                            <div className="formError" ref={sentenceError}></div>
                        </div>

                        <div className="sentenceFormItem">
                            <textarea dir="auto" className="form-control input_text" onChange={e=>handleElement(e,'sentenceMean')} placeholder='معنی جمله' autoComplete="off" />
                            <div className="formError" ref={sentenceMeanError}></div>
                        </div>

                        <div className="sentenceFormItem">
                            <textarea dir="auto" className="form-control input_text" onChange={e=>handleElement(e,'sentencePronounceEn')} placeholder='تلفظ به انگلیسی' autoComplete="off" />
                            <div className="formError" ref={sentencePronounceEnError}></div>
                        </div>

                        <div className="sentenceFormItem">
                            <textarea dir="auto" className="form-control input_text" onChange={e=>handleElement(e,'sentencePronounceFa')} placeholder='تلفظ به فارسی' autoComplete="off" />
                            <div className="formError" ref={sentencePronounceFaError}></div>
                        </div>

                        <div className="sentenceFormItem">
                            <input type="submit" className='btn btn-success btn_form ' value='ثبت' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
})

export default LessonSection;