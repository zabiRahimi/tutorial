import {  useEffect, useRef, useState } from "react";
import {  useOutletContext,useNavigate} from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from "sweetalert2";

const EditDelLesson=()=>{
    useChengeDocumentTitle('edit or delete lesson');
    const navigate = useNavigate();

    const { element, setElement,valLessons, setValLessons } = useOutletContext();

    const lessonForm = useRef(null),
    lessonAlert = useRef(null),
    lessonError = useRef(null),
    lessonLinkError = useRef(null);

    const [input , setInput]=useState({
        lesson_id:element.lesson_id,
        lesson:element.lesson,
        lessonLink:element.lessonLink
    });

    const [secCount , setSecCount]=useState(0);

    /**
     * دریافت تعداد بخشهای فصل کتاب
     * مورد استفاده هنگام حذف فصل برای هشدار به کاربر
     * @param {*} lesson_id 
     */
    async function getLessonSections(lesson_id){
        await axios.get(`/getLessonSections/${lesson_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
        .then(response => {
            
            setSecCount( response.data.lessonSecCount)
                
        })
        .catch(error => {
            alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
        })
    }

    useEffect(() => {
        const fetchData=async ()=>{
           await checkHasLessonId();
           await getLessonSections(input.lesson_id);
        }
        fetchData();
    }, [input.book_id]);

     /**
     * این متد چک می‌کند که کاربر یک فصلی را
     *  برای ویرایش و حذف انتخاب کرده باشد
     */
      const checkHasLessonId = () => {
        if (input.lesson_id) { } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'هیچ فصلی انتخاب و یا ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then((result) => {
                valLessons.length == 0 ?
                    //چنانچه هیچ فصلی از قبل ایجاد نشده باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addLessonDeveloper/lesson/add`) :
                    //چنانچه فصلی وجود داشته باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addLessonDeveloper/lesson/select`);
            });
        }
    }

    const deleteAlertLesson = () => {
        lessonError.current.innerHTML = '';
        lessonLinkError.current.innerHTML = '';
        lessonAlert.current.innerHTML = '';
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

    const handleEditLesson = (e) => {
        e.preventDefault();
        axios.put(`/editLesson/${input.lesson_id}`, { 'lesson': input.lesson, 'lessonLink': input.lessonLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                deleteAlertLesson();

                setElement(prev => ({ ...prev, lesson: input.lesson ,lessonLink:input.lessonLink }));
                 // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
                 let newLessons = valLessons.map((valLesson) => {
                    if (valLesson.id == input.lesson_id) return Object.assign({}, valLesson, { lesson: input.lesson, 'lessonLink': input.lessonLink });
                    return valLesson;
                });
                setValLessons(newLessons);
                lessonAlert.current.innerHTML = `<div class='success'>فصل کتاب با موفقیت ویرایش شد.</div>`
                lessonAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
            })
            .catch(error => {
                lessonAlert.current.innerHTML = '';

                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'lesson':
                            divError = lessonError.current;
                            break;
                        case 'lessonLink':
                            divError = lessonLinkError.current;
                            break;
                        default: divError = lessonAlert.current;
                    }
                    divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                    divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
                else {
                    const errorMessage = 'خطایی رخ داده است، دیتابیس را چک کرده و دوباره تلاش کنید .'
                    lessonAlert.current.innerHTML = `<div class="error">${errorMessage}</div>`
                    lessonAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
            })
    }

    function deleteLesson(lessonId) {
        Swal.fire({
            title: 'آیا مایل به حذف این فصل هستید؟',
            color: '#aa4f0f',
            html: `<div class='swalDelete'><div class="bold">توجه</div><div class="text">این فصل شامل<br /> ${secCount} بخش است.</div></div>`,

            showCancelButton: true,
            confirmButtonText: 'delete',
            confirmButtonColor: '#ffd600',
            preConfirm: () => {
                return axios.delete(`/deleteLesson/${lessonId}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                    .then(response => {
                        const index = valLessons.findIndex(({ id }) => id === lessonId)
                        valLessons.splice(index, 1)
                        setValLessons(valLessons)
                        setElement(prev => ({ ...prev, lesson_id: '', lesson: '', lessonLink: '' }));
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'فصل با موفقیت حذف شد',
                            showConfirmButton: false,
                            timer: 4000
                        }).then((result) => {
                            valLessons.length == 0 ? navigate(`/addLessonDeveloper/lesson/add`) :
                                navigate(`/addLessonDeveloper/lesson/select`);
                        })
                    })
                    .catch(error => {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'گروه حذف نشد !!',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    })
            }
        })

    }

    return (
        <section className="SAED_content">
            <form className='AE_Form' ref={lessonForm} method="post" onSubmit={handleEditLesson} onFocus={deleteAlertLesson}>
                        <div className="formAlert" ref={lessonAlert}></div>

                        <input type="text" dir="auto" value={input.lesson} className="form-control input_text" onChange={e => handleSaveValInput(e, 'lesson')} placeholder='نام فصل' autoComplete="off" />
                        <div className="formError" ref={lessonError}></div>

                        <input type="text" dir="auto" value={input.lessonLink} className="form-control input_text" id="lessonLink" onChange={e => handleSaveValInput(e, 'lessonLink')} placeholder='لینک فصل' autoComplete="off" />
                        <div className="formError" ref={lessonLinkError} ></div>

                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                        <input type="button" className='btn btn-danger btn_form' onClick={() => deleteLesson(input.lesson_id)} value='حذف فصل کتاب' />
                    </form>
        </section>
    )
}

export default EditDelLesson;