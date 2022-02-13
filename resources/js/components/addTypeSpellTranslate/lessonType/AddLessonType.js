import {  useRef, useState } from "react";
import {  useOutletContext} from "react-router-dom";
import Swal from "sweetalert2";

const AddLessonType=()=>{
    const { element, setElement,valLessonTypes, setValLessonTypes } = useOutletContext();

    const lessonTypeForm = useRef(null),
    lessonTypeAlert = useRef(null),
    lessonTypeError = useRef(null),
    lessonTypeLinkError = useRef(null);

    const [input , setInput]=useState({
        lessonType:'',
        lessonTypeLink:''
    })

    const deleteAlertLessonType = () => {
        lessonTypeError.current.innerHTML = '';
        lessonTypeLinkError.current.innerHTML = '';
        lessonTypeAlert.current.innerHTML = '';
    }

    const handleAddLessonType = (e) => {
        e.preventDefault();
        axios.post('/saveLessonType', { 'book_id': element.bookType_id, 'lesson': input.lessonType, 'lessonLink': input.lessonTypeLink }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                lessonTypeForm.current.reset();
                setElement(prev => ({ ...prev, lessonType_id: response.data.lessonType_id, lessonType: input.lessonType ,lessonTypeLink:input.lessonTypeLink }));
                 setInput(() => ({ lessonType: '', lessonLinkType: '' }));
                //کتاب ایجاد شده را به آرایه کتابها اضافه می‌کند
                valLessonTypes.push({id:response.data.lessonType_id, lesson: input.lessonType ,lessonLink:input.lessonTypeLink})
                setValLessonTypes(valLessonTypes)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'فصل کتاب با موفقیت ثبت شد',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
            .catch(error => {
                console.log(`addlessonType.js error: ${error}`);
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

                    <form className='AE_Form' ref={lessonTypeForm} method="post" onSubmit={handleAddLessonType} onFocus={deleteAlertLessonType}>
                        <div className="formAlert" ref={lessonTypeAlert}></div>

                        <input type="text" dir="auto" className="form-control input_text" onChange={e => handleSaveValInput(e, 'lessonType')} placeholder='نام فصل' autoComplete="off" />
                        <div className="formError" ref={lessonTypeError}></div>

                        <input type="text" dir="auto" className="form-control input_text" id="lessonLink" onChange={e => handleSaveValInput(e, 'lessonTypeLink')} placeholder='لینک فصل' autoComplete="off" />
                        <div className="formError" ref={lessonTypeLinkError} ></div>

                        <input type="submit" className='btn btn-success btn_form' value='ثبت' />
                    </form>
        </section>
    )
}


export default AddLessonType;