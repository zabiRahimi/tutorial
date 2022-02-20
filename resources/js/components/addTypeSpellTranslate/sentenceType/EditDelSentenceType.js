import { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from "sweetalert2";

const EditDelSentenceType=()=>{
    useChengeDocumentTitle('edit or delete sentence');
    const navigate = useNavigate();

    const { index, valSentences, setValSentences, sentence, setSentence} = useOutletContext();

    const form = useRef(null),
        notify = useRef(null),
        sentenceError = useRef(null),
        meanError = useRef(null),
        pronounceEnError = useRef(null),
        pronounceFaError = useRef(null)

    const [input, setInput] = useState({
        sentence: sentence.sentence,
        mean: sentence.mean,
        pronounceEn: sentence.pronounceEn,
        pronounceFa: sentence.pronounceFa
    });

    useEffect(() => {
            checkHasSentenceId();
    }, []);

    /**
    * این متد چک می‌کند که کاربر یک فصلی را
    *  برای ویرایش و حذف انتخاب کرده باشد
    */
    const checkHasSentenceId = () => {
        if (sentence.id) { } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'هیچ فصلی انتخاب و یا ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                valSentences.length == 0 ?
                    //چنانچه هیچ فصلی از قبل ایجاد نشده باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addTypeSpellTranslate/sentenceType/add`) :
                    //چنانچه فصلی وجود داشته باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addTypeSpellTranslate/sentenceType/select`);
            });
        }
    }

    const deleteAlert = () => {
        sentenceError.current.innerHTML = '';
        meanError.current.innerHTML = '';
        pronounceEnError.current.innerHTML = '';
        pronounceFaError.current.innerHTML = '';
        notify.current.innerHTML = '';
    }

    /**
    * هنگامی که کاربر مقدار یک باکس را وارد می‌کند، این متد آن را ذخیره می‌کند
    * @param {*} e 
    * @param {*} input 
    */
    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        setInput(prev => ({ ...prev, [input]: value }));
    }

    const handleEditSentence = (e) => {
        e.preventDefault();
        axios.put(`/editSentenceType/${sentence.id}`, { word_id:index.word_id, ...input }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(() => {
                deleteAlert();

                setSentence(prev => ({...prev, ...input}));

                // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
                let newSentences = valSentences.map((valSentence) => {
                    if (valSentence.id == sentence.id) return Object.assign({}, valSentence, { ...input});
                    return valSentence;
                });

                setValSentences(newSentences);

                notify.current.innerHTML = `<div class='success'>فصل کتاب با موفقیت ویرایش شد.</div>`
                notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
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

    function deleteSentence(sentenceId) {
        Swal.fire({
            title: 'آیا مایل به حذف این جمله هستید؟',
            color: '#aa4f0f',

            showCancelButton: true,
            confirmButtonText: 'delete',
            confirmButtonColor: '#ffd600',
            preConfirm: () => {
                return axios.delete(`/deleteSentenceType/${sentenceId}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                    .then(response => {

                        const index = valSentences.findIndex(({ id }) => id === sentenceId);
                        valSentences.splice(index, 1);

                        setValSentences(valSentences);

                        setSentence({id:'',sentence:'', mean:'', pronounceEn:'', pronounceFa:'' });

                        setInput({sentence:'', mean:'', pronounceEn:'', pronounceFa:''});
                        
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'جمله با موفقیت حذف شد',
                            showConfirmButton: false,
                            timer: 4000
                        }).then(() => {
                            valSentences.length == 0 ? navigate(`/addTypeSpellTranslate/sentenceType/add`) :
                                navigate(`/addTypeSpellTranslate/sentenceType/select`);
                        })
                    })
                    .catch(error => {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'جمله حذف نشد !!',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    })
            }
        })

    }
    return(
        <section className="SAED_content">

            <form className='AES_form' ref={form} method="post" onSubmit={handleEditSentence} onFocus={deleteAlert}>
                <div className="formAlert" ref={notify}></div>

                <textarea dir="auto" className="form-control"  rows="2" value={input.sentence}  onChange={e => handleSaveValInput(e, 'sentence')} placeholder='جمله'></textarea>
                <div className="formError" ref={sentenceError}></div>

                <textarea dir="auto" className="form-control"  rows="2" value={input.mean} onChange={e => handleSaveValInput(e, 'mean')} placeholder='معنی'></textarea>
                <div className="formError" ref={meanError}></div>
                
                <textarea dir="auto" className="form-control"  rows="2" value={input.pronounceEn} onChange={e => handleSaveValInput(e, 'pronounceEn')} placeholder='تلفظ به انگلیسی'></textarea>
                <div className="formError" ref={pronounceEnError}></div>
                
                <textarea dir="auto" className="form-control"  rows="2" value={input.pronounceFa} onChange={e => handleSaveValInput(e, 'pronounceFa')} placeholder='تلفظ به فارسی'></textarea>
                <div className="formError" ref={pronounceFaError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                <input type="button" className='btn btn-danger btn_form btn_form_danger' onClick={() => deleteSentence(sentence.id)} value='حذف جمله' />

            </form>
        </section>
    )
}

export default EditDelSentenceType;