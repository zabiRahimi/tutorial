import {  useEffect, useRef, useState } from "react";
import {  useOutletContext,useNavigate} from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from "sweetalert2";

const EditDelLessonType=()=>{
    useChengeDocumentTitle('edit or delete lesson');
    const navigate = useNavigate();

    const { element, setElement,valLessonTypes, setValLessonTypes } = useOutletContext();

    const lessonTypeForm = useRef(null),
    lessonTypeAlert = useRef(null),
    lessonTypeError = useRef(null),
    lessonTypeLinkError = useRef(null);

    const [input , setInput]=useState({
        lessonType_id:element.lessonType_id,
        lessonType:element.lessonType,
        lessonTypeLink:element.lessonTypeLink
    });

    const [count , setCount]=useState({
        wordType:0,
        sentenceType:0
    });

    /**
     * دریافت تعداد بخشهای فصل کتاب
     * مورد استفاده هنگام حذف فصل برای هشدار به کاربر
     * @param {*} lesson_id 
     */
    async function getOneLessonType(lessonType_id){
        await axios.get(`/getOneLessonType/${lessonType_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
        .then(response => {
            setCount( {
                wordType:response.data.wordTypeCount,
                sentenceType:response.data.sentenceTypeCount
            })
                
        })
        .catch(error => {
            alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.');
        })
    }

    useEffect(() => {
        const fetchData=async ()=>{
           await checkHasLessonTypeId();
           await getOneLessonType(input.lessonType_id);
        }
        fetchData();
    }, [input.bookType_id]);

     /**
     * این متد چک می‌کند که کاربر یک فصلی را
     *  برای ویرایش و حذف انتخاب کرده باشد
     */
      const checkHasLessonTypeId = () => {
        if (input.lessonType_id) { } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'هیچ فصلی انتخاب و یا ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then((result) => {
                valLessonTypes.length == 0 ?
                    //چنانچه هیچ فصلی از قبل ایجاد نشده باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addTypeSpellTranslate/lessonType/add`) :
                    //چنانچه فصلی وجود داشته باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addTypeSpellTranslate/lessonType/select`);
            });
        }
    }

    const deleteAlertLessonType = () => {
        lessonTypeError.current.innerHTML = '';
        lessonTypeLinkError.current.innerHTML = '';
        lessonTypeAlert.current.innerHTML = '';
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

    const handleEditLessonType = (e) => {
        e.preventDefault();
        axios.put(`/editLessonType/${input.lessonType_id}`, { 'lesson': input.lessonType, 'lessonLink': input.lessonTypeLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                deleteAlertLessonType();

                setElement(prev => ({ ...prev, lessonType: input.lessonType ,lessonTypeLink:input.lessonTypeLink }));
                 // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
                 let newLessonTypes = valLessonTypes.map((valLessonType) => {
                    if (valLessonType.id == input.lessonType_id) return Object.assign({}, valLessonType, { lesson: input.lessonType, 'lessonLink': input.lessonTypeLink });
                    return valLessonType;
                });
                setValLessonTypes(newLessonTypes);
                lessonTypeAlert.current.innerHTML = `<div class='success'>فصل کتاب با موفقیت ویرایش شد.</div>`
                lessonTypeAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
            })
            .catch(error => {
                lessonTypeAlert.current.innerHTML = '';

                if (error.response.status == 422) {
                    const elementError = Object.keys(error.response.data.errors)[0];
                    let divError;
                    switch (elementError) {
                        case 'lesson':
                            divError = lessonTypeError.current;
                            break;
                        case 'lessonLink':
                            divError = lessonTypeLinkError.current;
                            break;
                        default: divError = lessonTypeAlert.current;
                    }
                    divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                    divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
                else {
                    const errorMessage = 'خطایی رخ داده است، دیتابیس را چک کرده و دوباره تلاش کنید .'
                    lessonTypeAlert.current.innerHTML = `<div class="error">${errorMessage}</div>`
                    lessonTypeAlert.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                }
            })
    }

    function deleteLessonType(lessonTypeId) {
        Swal.fire({
            title: 'آیا مایل به حذف این فصل هستید؟',
            color: '#aa4f0f',
            html: `<div class='swalDelete'><div class="bold">توجه</div><div class="text">این فصل شامل<br /> ${count.wordType} کلمه و ${count.sentenceType} جمله است.</div></div>`,

            showCancelButton: true,
            confirmButtonText: 'delete',
            confirmButtonColor: '#ffd600',
            preConfirm: () => {
                return axios.delete(`/deleteLessonType/${lessonTypeId}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                    .then(response => {
                        const index = valLessonTypes.findIndex(({ id }) => id === lessonTypeId)
                        valLessonTypes.splice(index, 1)
                        setValLessonTypes(valLessonTypes)
                        setElement(prev => ({ ...prev, lessonType_id: '', lessonType: '', lessonTypeLink: '' }));
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'فصل با موفقیت حذف شد',
                            showConfirmButton: false,
                            timer: 4000
                        }).then((result) => {
                            valLessonTypes.length == 0 ? navigate(`/addTypeSpellTranslate/lessonType/add`) :
                                navigate(`/addTypeSpellTranslate/lessonType/select`);
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
            <form className='AE_Form' ref={lessonTypeForm} method="post" onSubmit={handleEditLessonType} onFocus={deleteAlertLessonType}>
                        <div className="formAlert" ref={lessonTypeAlert}></div>

                        <input type="text" dir="auto" value={input.lessonType} className="form-control input_text" onChange={e => handleSaveValInput(e, 'lessonType')} placeholder='نام فصل' autoComplete="off" />
                        <div className="formError" ref={lessonTypeError}></div>

                        <input type="text" dir="auto" value={input.lessonTypeLink} className="form-control input_text" id="lessonLink" onChange={e => handleSaveValInput(e, 'lessonTypeLink')} placeholder='لینک فصل' autoComplete="off" />
                        <div className="formError" ref={lessonTypeLinkError} ></div>

                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                        <input type="button" className='btn btn-danger btn_form btn_form_danger' onClick={() => deleteLessonType(input.lessonType_id)} value='حذف فصل کتاب' />
                    </form>
        </section>
    )
}

export default EditDelLessonType;