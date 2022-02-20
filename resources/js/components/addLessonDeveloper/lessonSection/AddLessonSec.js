import {  useRef,useState } from "react";
import EditorALD from "../../tinymce/EditorAddLessonDev";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";


const AddLessonSec = () => {
    const {index, setIndex, valLessonSecs, setValLessonSecs, lessonSec, setLessonSec}=useOutletContext();

    const tinyFun = useRef(),// tiny فراخوانی متد از کاپوننت 
        form = useRef(null),
        notify = useRef(null),
        lessonSecError = useRef(null),
        desError = useRef(null);

        const [input , setInput]=useState({
            lesson_section:'',
            des:''
        })
        
    const handleAddLessonSection = (e) => {
        e.preventDefault();
        axios.post('/saveLessonSection', { 'lesson_id': index.lesson_id, ...input }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {

                const id=response.data.lessonSec_id;

                form.current.reset();

                tinyFun.current.setContentTiny();//خالی کردن ادیتور

                setIndex(per=>({...per, lessonSec_id:id}));

                //کتاب ایجاد شده را به آرایه کتابها اضافه می‌کند
                valLessonSecs.push({id, ...input});

                setValLessonSecs(valLessonSecs);

                setLessonSec({id, ...input});

                setInput(() => ({ lesson_section: '', des: '' }));

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'فصل کتاب با موفقیت ثبت شد',
                    showConfirmButton: false,
                    timer: 3000
                })

            })
            .catch(error => {
                console.log(error);
                notify.current.innerHTML = '';

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

    const deleteAlert = () => {
        notify.current.innerHTML = '';
        lessonSecError.current.innerHTML = '';
        desError.current.innerHTML = '';
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
            

            <form className='AET_form' ref={form} method="post" onSubmit={handleAddLessonSection} onFocus={deleteAlert}>

                <div className="formAlert" ref={notify}></div>

                <input type="text" dir="auto" className="form-control input_text" id="lesson_section" onChange={e => handleSaveValInput(e, 'lesson_section')} placeholder='تیتر بخش' autoComplete="off" />

                <div className="formError" ref={lessonSecError}></div>

                <div className="labelTextarea">متن بخش</div>
                <EditorALD
                    ref={tinyFun}
                    setInput={setInput}
                    input={input}
                />
                <div className="formError" ref={desError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ثبت' />
            </form>

        </section>

    )
}

export default AddLessonSec;