import { useEffect, useRef, useState } from "react";
import EditorALD from "../../tiptap/AddLessonEditor";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";


const AddLessonSec = () => {
    const { index, setIndex, valLessonSecs, setValLessonSecs, lessonSec, setLessonSec } = useOutletContext();

    const tipTapFun = useRef(),// tiny فراخوانی متد از کاپوننت 

        form = useRef(null),
        notify = useRef(null),
        lessonSecError = useRef(null),
        desError = useRef(null);

    const [input, setInput] = useState({
        updateOrdering: false,
        ordering: 1,
        lesson_section: '',
        des: ''
    })
    useEffect(() => {
        //ایجاد آخرین عدد اوردرینگ (ترتیب نمایش) برای رکورد جدید
        if (valLessonSecs.length != 0) { setInput(per => ({ ...per, ordering: valLessonSecs.length + 1 })) }
    }, []);

    const handleAddLessonSection = (e) => {
        e.preventDefault();
        axios.post('/saveLessonSection', { 'lesson_id': index.lesson_id, ...input }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {

                const id = response.data.lessonSec_id;

                form.current.reset();

                tipTapFun.current.deleteContent();//خالی کردن ادیتور

                setIndex(per => ({ ...per, lessonSec_id: id }));

                if (input.updateOrdering) { setUpdateOrdirng(id, input.ordering); }

                //کتاب ایجاد شده را به آرایه کتابها اضافه می‌کند
                valLessonSecs.push({ id, ...input });

                setValLessonSecs(valLessonSecs);

                setLessonSec({ id, ...input });

                setInput(() => ({ updateOrdering: false }));
                
                setInput(per => ({ ...per, ordering: valLessonSecs.length + 1 }));

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

    const handleSetOrdering = (ordering) => {
        ordering++;
        setInput(prev => ({ ...prev, updateOrdering: true, ordering }));
    }

    // هنگامی که اوردرینگ تغییر کرد لازم است که مقدار اوردینگها نیز آپدیت شود
    //این متد این کار را انجام می‌دهد
    //لازم به ذکر است که این متد فقط آرایه‌ی vlaLessonSecs را آپدیت می‌کند، نه مقادیر دیتا بیس را
    const setUpdateOrdirng = (id, ordering) => {
        valLessonSecs.map((lessonSecs, i) => {
            if (lessonSecs.ordering < ordering || lessonSecs.id == id) { }
            else {
                let objIndex = valLessonSecs.findIndex((obj => obj.id == lessonSecs.id));
                valLessonSecs[objIndex].ordering =lessonSecs.ordering + 1;
            }
        });
    }

    const setLessonSecs = () => {
        let val = valLessonSecs.map((lessonSecs, i) => {
            return <li key={i} onClick={() => handleSetOrdering(lessonSecs.ordering)}>{lessonSecs.lesson_section}</li>
        })
        return val;
    }

    const handleChangeOverflowUl = (e) => {
        const parent = e.target.parentNode;
        const child = parent.querySelector('ul');
        const height = child.offsetHeight;
        child.style.overflow = height < 230 ? 'visible' : 'auto';
    }

    return (
        <section className="SAED_content">


            <form className='AET_form' ref={form} method="post" onSubmit={handleAddLessonSection} onFocus={deleteAlert}>

                <div className="formAlert" ref={notify}></div>


                <div className="dropdown select_book select_ordering">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleChangeOverflowUl}>
                        بعد از بخش...
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {valLessonSecs.length != 0 ? setLessonSecs() : <li >تا کنون هیچ بخشی ایجاد نشده است</li>}
                    </ul>
                </div>


                <input type="text" dir="auto" className="form-control input_text" id="lesson_section" onChange={e => handleSaveValInput(e, 'lesson_section')} placeholder='تیتر بخش' autoComplete="off" />

                <div className="formError" ref={lessonSecError}></div>

                <div className="labelTextarea">متن بخش</div>
                <EditorALD
                    ref={tipTapFun}
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