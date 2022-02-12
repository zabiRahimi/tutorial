import {  useRef,useState,useEffect } from "react";
import EditorALD from "../../tinymce/EditorAddLessonDev";
import { useOutletContext,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditDelLessonSec = () => {
    
const navigate = useNavigate();
    const {valLessonSecs,setValLessonSecs,element , setElement}=useOutletContext();

    const tinyFun = useRef(),// tiny فراخوانی متد از کاپوننت 
        lessonSecForm = useRef(null),
        lessonSecAlert = useRef(null),
        lessonSecError = useRef(null),
        desError = useRef(null);

        const [input , setInput]=useState({
            lesson_section:element.lesson_section,
            des:element.des
        })

        useEffect(() => {
                checkHasLessonSecId();
        }, []);

           /**
     * این متد چک می‌کند که کاربر یک بخشی را
     *  برای ویرایش و حذف انتخاب کرده باشد
     */
      const checkHasLessonSecId = () => {
        if (element.lessonSec_id) { } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'هیچ بخشی انتخاب و یا ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then((result) => {
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
        axios.put(`/editLessonSection/${element.lessonSec_id}`, { 'lesson_id': element.lesson_id, 'lesson_section': input.lesson_section, 'des': input.des }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                // lessonSecForm.current.reset();
                // tinyFun.current.setContentTiny();//خالی کردن ادیتور
                deleteAlertLessonSec();
                // setElement(prev => ({ ...prev, lessonSec_id: response.data.lessonSec_id, lesson_section: input.lesson_section ,des:input.des }));
                 // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
                 let newLessonSecs = valLessonSecs.map((valLessonSec) => {
                    if (valLessonSec.id == input.lesson_id) return Object.assign({}, valLessonSec, { lesson_section: input.lesson_section, 'des': input.des });
                    return valLessonSec;
                });
                setValLessonSecs(newLessonSecs);
                lessonSecAlert.current.innerHTML = `<div class='success'>بخش با موفقیت ویرایش شد.</div>`
                lessonSecAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });

            })
            .catch(error => {
                lessonSecAlert.current.innerHTML = '';

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
                        default: divError = lessonSecAlert.current;
                    }
                    divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                    divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
                else {
                    const errorMessage = 'خطایی رخ داده است، دیتابیس را چک کرده و دوباره تلاش کنید .'
                    lessonSecAlert.current.innerHTML = `<div class="error">${errorMessage}</div>`
                    lessonSecAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
            })
    }

    const deleteAlertLessonSec = () => {
        lessonSecAlert.current.innerHTML = '';
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
                    .then(response => {
                        const index = valLessonSecs.findIndex(({ id }) => id === lessonSecId)
                        valLessonSecs.splice(index, 1)
                        setValLessonSecs(valLessonSecs)
                        setElement(prev => ({ ...prev, lessonSec_id: '', lesson_section: '', des: '' }));
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'بخش با موفقیت حذف شد',
                            showConfirmButton: false,
                            timer: 4000
                        }).then((result) => {
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
            

            <form className='AET_form' ref={lessonSecForm} method="post" onSubmit={handleEditLessonSection} onFocus={deleteAlertLessonSec}>

                <div className="formAlert" ref={lessonSecAlert}></div>

                <input type="text" dir="auto" value={input.lesson_section} className="form-control input_text" id="lesson_section" onChange={e => handleSaveValInput(e, 'lesson_section')} placeholder='تیتر بخش' autoComplete="off" />

                <div className="formError" ref={lessonSecError}></div>

                <div className="labelTextarea">متن بخش</div>
                <EditorALD
                    ref={tinyFun}
                    setInput={setInput}
                    input={input}
                />
                <div className="formError" ref={desError}></div>

                <input type="submit" className='btn btn-success btn_form' value='ویرایش' />
                <input type="button" className='btn btn-danger btn_form btn_form_danger' onClick={() => deleteLessonSec(element.lessonSec_id)} value='حذف بخش' />

            </form>

        </section>

    )
}

export default EditDelLessonSec;