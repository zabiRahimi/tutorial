import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

const AddSentenceType=()=>{
    const {  index, valSentences, setValSentences, setSentence } = useOutletContext();

    const from = useRef(null),
        notify = useRef(null),
        sentenceError = useRef(null),
        meanError = useRef(null),
        pronounceEnError = useRef(null),
        pronounceFaError = useRef(null)

    const [input, setInput] = useState({
        sentence: '',
        mean:'',
        pronounceEn:'',
        pronounceFa:''
    })

    const deleteAlert = () => {
        sentenceError.current.innerHTML = '';
        notify.current.innerHTML = '';
        meanError.current.innerHTML = '';
        pronounceEnError.current.innerHTML = '';
        pronounceFaError.current.innerHTML = '';
    }

    const handleAddSentence = (e) => {
        e.preventDefault();
        axios.post('/saveSentenceType', { word_id:index.word_id, ...input  }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {

                const id=response.data.id;

                from.current.reset();

                setSentence({id, ...input});

                setInput({ sentence: '', mean:'', pronounceEn:'', pronounceFa:''});

                //کتاب ایجاد شده را به آرایه کتابها اضافه می‌کند
                valSentences.push({ id, ...input });
                setValSentences(valSentences);

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
                        case 'sentence':
                            divError = sentenceError.current;
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

            <form className='AES_form' ref={from} method="post" onSubmit={handleAddSentence} onFocus={deleteAlert}>
                <div className="formAlert" ref={notify}></div>

                <textarea dir="auto" className="form-control"  rows="2"  onChange={e => handleSaveValInput(e, 'sentence')} placeholder='جمله'></textarea>
                <div className="formError" ref={sentenceError}></div>

                <textarea dir="auto" className="form-control"  rows="2"  onChange={e => handleSaveValInput(e, 'mean')} placeholder='معنی'></textarea>
                <div className="formError" ref={meanError}></div>
                
                <textarea dir="auto" className="form-control"  rows="2"  onChange={e => handleSaveValInput(e, 'pronounceEn')} placeholder='تلفظ به انگلیسی'></textarea>
                <div className="formError" ref={pronounceEnError}></div>
                
                <textarea dir="auto" className="form-control"  rows="2"  onChange={e => handleSaveValInput(e, 'pronounceFa')} placeholder='تلفظ به فارسی'></textarea>
                <div className="formError" ref={pronounceFaError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت' />
            </form>
        </section>
    )
}

export default AddSentenceType;