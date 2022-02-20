import {  useEffect, useRef, useState } from "react";
import {  useOutletContext,useNavigate} from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from "sweetalert2";

const EditDelLesson=()=>{
    useChengeDocumentTitle('edit or delete lesson');
    const navigate = useNavigate();

    const { index, setIndex, valLessons, setValLessons, lesson, setLesson } = useOutletContext();

    const form = useRef(null),
    notify = useRef(null),
    lessonError = useRef(null),
    linkError = useRef(null);

    const [input , setInput]=useState({
        lesson:lesson.lesson,
        link:lesson.link
    });

    const [secCount , setSecCount]=useState(0);

    /**
     * دریافت تعداد بخشهای فصل کتاب
     * مورد استفاده هنگام حذف فصل برای هشدار به کاربر
     * @param {*} id 
     */
    async function getOneLesson(id){
        await axios.get(`/getOneLesson/${id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
        .then(response => {
            
            setSecCount( response.data.lessonSecCount)
                
        })
        .catch(error => {
            alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
        })
    }

    useEffect(() => {
        
            checkHasLessonId();
            getOneLesson(lesson.id);
    }, []);

     /**
     * این متد چک می‌کند که کاربر یک فصلی را
     *  برای ویرایش و حذف انتخاب کرده باشد
     */
      const checkHasLessonId = () => {
        if (lesson.id) { } else {
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

    const deleteAlert = () => {
        lessonError.current.innerHTML = '';
        linkError.current.innerHTML = '';
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

    const handleEditLesson = (e) => {
        e.preventDefault();
        axios.put(`/editLesson/${lesson.id}`, {'book_id':index.book_id, ...input}, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(() => {

                deleteAlert();

                setIndex(prev => ({ ...prev, lesson: input.lesson  }));

                setLesson(prev => ({...prev, ...input}));

                 // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
                 let newLessons = valLessons.map((valLesson) => {
                    if (valLesson.id == lesson.id) return Object.assign({}, valLesson, {...input});
                    return valLesson;
                });

                setValLessons(newLessons);

                notify.current.innerHTML = `<div class='success'>فصل کتاب با موفقیت ویرایش شد.</div>`
                notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
            })
            .catch(error => {
                notify.current.innerHTML = '';

                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'lesson':
                            divError = lessonError.current;
                            break;
                        case 'link':
                            divError = linkError.current;
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
                    .then(() => {

                        const index = valLessons.findIndex(({ id }) => id === lessonId);

                        valLessons.splice(index, 1);

                        setValLessons(valLessons);

                        setIndex(prev => ({ ...prev, lesson_id: '', lesson: '' }));

                        setLesson({id:'', lesson:'', link:''});

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
            <form className='AE_Form' ref={form} method="post" onSubmit={handleEditLesson} onFocus={deleteAlert}>
                        <div className="formAlert" ref={notify}></div>

                        <input type="text" dir="auto" value={input.lesson} className="form-control input_text" onChange={e => handleSaveValInput(e, 'lesson')} placeholder='نام فصل' autoComplete="off" />
                        <div className="formError" ref={lessonError}></div>

                        <input type="text" dir="auto" value={input.link} className="form-control input_text"  onChange={e => handleSaveValInput(e, 'link')} placeholder='لینک فصل' autoComplete="off" />
                        <div className="formError" ref={linkError} ></div>

                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                        <input type="button" className='btn btn-danger btn_form btn_form_danger' onClick={() => deleteLesson(lesson.id)} value='حذف فصل کتاب' />
                    </form>
        </section>
    )
}

export default EditDelLesson;