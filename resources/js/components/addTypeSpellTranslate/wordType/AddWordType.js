import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

const AddWordType = () => {
    const {  index, setIndex, valWords, setValWords, setWord } = useOutletContext();

    const from = useRef(null),
        notify = useRef(null),
        wordError = useRef(null),
        linkError = useRef(null),
        meanError = useRef(null),
        pronounceEnError = useRef(null),
        pronounceFaError = useRef(null)

    const [input, setInput] = useState({
        word: '',
        link: '',
        mean:'',
        pronounceEn:'',
        pronounceFa:''
    })

    const deleteAlert = () => {
        wordError.current.innerHTML = '';
        linkError.current.innerHTML = '';
        notify.current.innerHTML = '';
        meanError.current.innerHTML = '';
        pronounceEnError.current.innerHTML = '';
        pronounceFaError.current.innerHTML = '';
    }

    const handleAddWord = (e) => {
        e.preventDefault();
        // 'link': input.link, 'word': input.word, 'mean': input.mean, 'pronounceEn': input.pronounceEn, 'pronounceFa':input.pronounceFa
        axios.post('/saveWordType', { lesson_id: index.lesson_id, ...input  }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {

                const id=response.data.id;

                from.current.reset();

                setIndex(prev => ({ ...prev, word_id: id, word: input.word }));

                setWord({id, ...input});

                setInput({ word: '', Link: '', mean:'', pronounceEn:'', pronounceFa:''});

                //کتاب ایجاد شده را به آرایه کتابها اضافه می‌کند
                valWords.push({ id, ...input })
                setValWords(valWords)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'فصل کتاب با موفقیت ثبت شد',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
            .catch(error => {
                notify.current.innerHTML = '';

                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'word':
                            divError = wordError.current;
                            break;
                        case 'link':
                            divError = linkError.current;
                            break;
                            case 'mean':
                                divError = meanError.current;
                                break;
                            case 'pronounceEn':
                                divError = pronounceEnError.current;
                                break;
                            case 'pronounceFa':
                                divError = pronounceFaError.current;
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

            <form className='AE_Form' ref={from} method="post" onSubmit={handleAddWord} onFocus={deleteAlert}>
                <div className="formAlert" ref={notify}></div>

                <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'link')} placeholder='لینک کلمه' autoComplete="off" />
                <div className="formError" ref={linkError} ></div>

                <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'word')} placeholder='کلمه' autoComplete="off" />
                <div className="formError" ref={wordError}></div>

                <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'mean')} placeholder='معنی' autoComplete="off" />
                <div className="formError" ref={meanError}></div>

                <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'pronounceEn')} placeholder='تلفظ به انگلیسی' autoComplete="off" />
                <div className="formError" ref={pronounceEnError}></div>

                <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'pronounceFa')} placeholder='تلفظ به فارسی' autoComplete="off" />
                <div className="formError" ref={pronounceFaError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت' />
            </form>
        </section>
    )
}

export default AddWordType;