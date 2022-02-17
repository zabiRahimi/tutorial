import { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from "sweetalert2";

const EditDelWordType = () => {
    useChengeDocumentTitle('edit or delete word');
    const navigate = useNavigate();

    const { index, setIndex, valWords, setValWords, word, setWord} = useOutletContext();

    const form = useRef(null),
        notify = useRef(null),
        wordError = useRef(null),
        linkError = useRef(null),
        meanError = useRef(null),
        pronounceEnError = useRef(null),
        pronounceFaError = useRef(null)

    const [input, setInput] = useState({
        word: word.word,
        link: word.link,
        mean: word.mean,
        pronounceEn: word.pronounceEn,
        pronounceFa: word.pronounceFa
    })

    const [sentenceCount, setSentenceCount] = useState(0);

    /**
     * دریافت تعداد جملات مربوط به کلمه
     * مورد استفاده هنگام حذف کلمه برای هشدار به کاربر
     * @param {*} word_id 
     */
    async function getOneWord(id) {
        await axios.get(`/getOneWordType/${id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                setSentenceCount(response.data.sentenceCount)
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.');
            })
    }

    useEffect(() => {
            checkHasWordId();
            word.id ? getOneWord(word.id) : '';
    }, []);

    /**
    * این متد چک می‌کند که کاربر یک فصلی را
    *  برای ویرایش و حذف انتخاب کرده باشد
    */
    const checkHasWordId = () => {
        if (word.id) { } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'هیچ فصلی انتخاب و یا ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                valWords.length == 0 ?
                    //چنانچه هیچ فصلی از قبل ایجاد نشده باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addTypeSpellTranslate/wordType/add`) :
                    //چنانچه فصلی وجود داشته باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addTypeSpellTranslate/wordType/select`);
            });
        }
    }

    const deleteAlert = () => {
        wordError.current.innerHTML = '';
        linkError.current.innerHTML = '';
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

    const handleEditWord = (e) => {
        e.preventDefault();
        axios.put(`/editWordType/${word.id}`, { lesson_id: index.lesson_id, ...input }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(() => {
                deleteAlert();

                setIndex(prev => ({ ...prev, word: input.word}));

                // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
                let newWords = valWords.map((valWord) => {
                    if (valWord.id == word.id) return Object.assign({}, valWord, { ...input});
                    return valWord;
                });

                setValWords(newWords);

                notify.current.innerHTML = `<div class='success'>فصل کتاب با موفقیت ویرایش شد.</div>`
                notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
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

    function deleteWord(wordId) {
        Swal.fire({
            title: 'آیا مایل به حذف این کلمه هستید؟',
            color: '#aa4f0f',
            html: `<div class='swalDelete'><div class="bold">توجه</div><div class="text">این کلمه شامل<br /> ${sentenceCount} جمله است.</div></div>`,

            showCancelButton: true,
            confirmButtonText: 'delete',
            confirmButtonColor: '#ffd600',
            preConfirm: () => {
                return axios.delete(`/deleteWordType/${wordId}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                    .then(response => {

                        const index = valWords.findIndex(({ id }) => id === wordId);
                        valWords.splice(index, 1);

                        setValWords(valWords);

                        setIndex(prev => ({ ...prev, word_id: '', word: '' }));

                        setWord({id:'',word:'', link:'', mean:'', pronounceEn:'', pronounceFa:'' });

                        setInput({word:'', link:'', mean:'', pronounceEn:'', pronounceFa:''});
                        
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'کلمه با موفقیت حذف شد',
                            showConfirmButton: false,
                            timer: 4000
                        }).then((result) => {
                            valWords.length == 0 ? navigate(`/addTypeSpellTranslate/wordType/add`) :
                                navigate(`/addTypeSpellTranslate/wordType/select`);
                        })
                    })
                    .catch(error => {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'کلمه حذف نشد !!',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    })
            }
        })

    }
    return (
        <section className="SAED_content">

            <form className='AE_Form' ref={form} method="post" onSubmit={handleEditWord} onFocus={deleteAlert}>
                <div className="formAlert" ref={notify}></div>

                <input type="text" dir="auto" className="form-control input_text" value={input.link} onChange={e => handleSaveValInput(e, 'link')} placeholder='لینک کلمه' autoComplete="off" />
                <div className="formError" ref={linkError} ></div>

                <input type="text" dir="auto" className="form-control input_text" value={input.word} onChange={e => handleSaveValInput(e, 'word')} placeholder='کلمه' autoComplete="off" />
                <div className="formError" ref={wordError}></div>

                <input type="text" dir="auto" className="form-control input_text" value={input.mean} onChange={e => handleSaveValInput(e, 'mean')} placeholder='معنی' autoComplete="off" />
                <div className="formError" ref={meanError}></div>

                <input type="text" dir="auto" className="form-control input_text" value={input.pronounceEn} onChange={e => handleSaveValInput(e, 'pronounceEn')} placeholder='تلفظ به انگلیسی' autoComplete="off" />
                <div className="formError" ref={pronounceEnError}></div>

                <input type="text" dir="auto" className="form-control input_text" value={input.pronounceFa} onChange={e => handleSaveValInput(e, 'pronounceFa')} placeholder='تلفظ به فارسی' autoComplete="off" />
                <div className="formError" ref={pronounceFaError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                <input type="button" className='btn btn-danger btn_form btn_form_danger' onClick={() => deleteWord(word.id)} value='حذف فصل کتاب' />

            </form>
        </section>
    )
}

export default EditDelWordType;