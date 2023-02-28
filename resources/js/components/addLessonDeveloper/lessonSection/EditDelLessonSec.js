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
            updateOrdering: false,
            ordering:lessonSec.ordering,
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

                deleteAlert();

                // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
                 let newLessonSecs = valLessonSecs.map((valLessonSec) => {
                    if (valLessonSec.id == lessonSec.id) return Object.assign({}, valLessonSec, { ...input });
                    return valLessonSec;
                });

                setValLessonSecs(newLessonSecs);

                setLessonSec(per => ({...per, ...input}));

                if (input.updateOrdering) { setUpdateOrdirng(lessonSec.id, input.ordering); }

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'بخش با موفقیت ویرایش شد',
                    showConfirmButton: false,
                    timer: 4000
                })

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
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'بخش ویرایش نشد !! دیتابیس را چک کنید، همچنین صفحه را ویرایش کنید و مجددا تلاش کنید',
                        showConfirmButton: false,
                        timer: 3000
                    })
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
            

            <form className='AET_form' ref={form} method="post" onSubmit={handleEditLessonSection} onFocus={deleteAlert}>

                <div className="formAlert" ref={notify}></div>

                <div className="dropdown select_book select_ordering">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleChangeOverflowUl}>
                        بعد از بخش...
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        { setLessonSecs()}
                    </ul>
                </div>

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