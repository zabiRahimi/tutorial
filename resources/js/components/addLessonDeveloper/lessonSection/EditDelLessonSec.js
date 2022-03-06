import {  useRef,useState,useEffect } from "react";
import EditorALD from "../../tiptap/AddLessonEditor";
import { useOutletContext,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditDelLessonSec = () => {
    
const navigate = useNavigate();
    const {index, setIndex, valLessonSecs, setValLessonSecs, lessonSec, setLessonSec}=useOutletContext();

    const tiptapFun = useRef(),// tiny فراخوانی متد از کاپوننت 
        form = useRef(null),
        notify = useRef(null),
        lessonSecError = useRef(null),
        desError = useRef(null);

        const [input , setInput]=useState({
            lesson_section:lessonSec.lesson_section,
            des:lessonSec.des
        })

        useEffect(() => {
                checkHasLessonSecId();
        }, []);

           /**
     * این متد چک می‌کند که کاربر یک بخشی را
     *  برای ویرایش و حذف انتخاب کرده باشد
     */
      const checkHasLessonSecId = () => {
        if (lessonSec.id) { } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'هیچ بخشی انتخاب و یا ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                valLessonSecs.length == 0 ?
                    //چنانچه هیچ فصلی از قبل ایجاد نشده باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addLessonDeveloper/lessonSec/add`) :
                    //چنانچه فصلی وجود داشته باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addLessonDeveloper/lessonSec/select`);
            });
        }
    }
        
    const handleEditLessonSection = (e) => {
        e.preventDefault();
        axios.put(`/editLessonSection/${lessonSec.id}`, { 'lesson_id': index.lesson_id, ...input }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                // form.current.reset();
                // tinyFun.current.setContentTiny();//خالی کردن ادیتور
                deleteAlert();
                // setElement(prev => ({ ...prev, id: response.data.id, lesson_section: input.lesson_section ,des:input.des }));
                 // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
                 let newLessonSecs = valLessonSecs.map((valLessonSec) => {
                    if (valLessonSec.id == lessonSec.id) return Object.assign({}, valLessonSec, { ...input });
                    return valLessonSec;
                });
                setValLessonSecs(newLessonSecs);

                setLessonSec(per => ({...per, ...input}));

                notify.current.innerHTML = `<div class='success'>بخش با موفقیت ویرایش شد.</div>`
                notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });

            })
            .catch(error => {
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

    function deleteLessonSec(lessonSecId) {
        Swal.fire({
            title: 'آیا مایل به حذف این بخش هستید؟',
            color: '#aa4f0f',
            showCancelButton: true,
            confirmButtonText: 'delete',
            confirmButtonColor: '#ffd600',
            preConfirm: () => {
                return axios.delete(`/deleteLessonSection/${lessonSecId}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                    .then(() => {

                        const index = valLessonSecs.findIndex(({ id }) => id === lessonSecId);

                        valLessonSecs.splice(index, 1);

                        setValLessonSecs(valLessonSecs);

                        setLessonSec( {id: '', lesson_section: '', des: ''} );
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'بخش با موفقیت حذف شد',
                            showConfirmButton: false,
                            timer: 4000
                        }).then(() => {
                            valLessonSecs.length == 0 ? navigate(`/addLessonDeveloper/lessonSec/add`) :
                                navigate(`/addLessonDeveloper/lessonSec/select`);
                        })
                    })
                    .catch(error => {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'بخش حذف نشد !!',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    })
            }
        })

    }

    return (
        <section className="SAED_content">
            

            <form className='AET_form' ref={form} method="post" onSubmit={handleEditLessonSection} onFocus={deleteAlert}>

                <div className="formAlert" ref={notify}></div>

                <input type="text" dir="auto" value={input.lesson_section} className="form-control input_text"  onChange={e => handleSaveValInput(e, 'lesson_section')} placeholder='تیتر بخش' autoComplete="off" />

                <div className="formError" ref={lessonSecError}></div>

                <div className="labelTextarea">متن بخش</div>
                <EditorALD
                    ref={tiptapFun}
                    setInput={setInput}
                    input={input}
                />
                <div className="formError" ref={desError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ویرایش' />
                <input type="button" className='btn btn-danger btn_form btn_form_danger' onClick={() => deleteLessonSec(lessonSec.id)} value='حذف بخش' />

            </form>

        </section>

    )
}

export default EditDelLessonSec;