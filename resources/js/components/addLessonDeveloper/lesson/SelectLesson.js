import { useEffect, useState } from "react"
import { useOutletContext , useNavigate } from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from 'sweetalert2';

const SelectLesson=()=>{
useChengeDocumentTitle('select lesson');
const navigate = useNavigate();

const {valLessons,setElement} = useOutletContext();

useEffect(()=>{
    checkHasLesson()
    
},[]);

/**
 * چنانچه فصلی ایجاد نشده باشد این متد هشدار داده  
 * و کاربر به صفحه ایجاد فصل هدایت می‌کند
 */
 const checkHasLesson=()=>{
    valLessons.length==0?
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'تا کنون فصلی ایجاد نشده است',
        showConfirmButton: false,
        timer: 3000,
    }).then((result) => {
        navigate(`/addLessonDeveloper/lesson/add`)
    })
    :'';
}
/**
  * انتخاب فصل کتاب و ذخیره اطلاعات فصل
  * index ذخیره اطلاعات در فایل
  * @param {*} id 
  * @param {*} book 
  * @param {*} bookLink 
  */
 const handleSelectLesson = (id, lesson,lessonLink) => {
    setElement(prev => ({ ...prev, lesson_id:id, lesson: lesson, lessonLink:lessonLink }));
}
    const setLessons = () => {
        let val = valLessons.map((lessons, i) => {
            return <li key={i} onClick={() => handleSelectLesson(lessons.id, lessons.lesson, lessons.lessonLink)}>{lessons.lesson}</li>
        })
        return val;
    }
    const handleChangeOverflowUl = (e) => {
        const parent = e.target.parentNode;
        const child = parent.querySelector('ul');
        const height = child.offsetHeight;
        child.style.overflow = height < 230 ? 'visible' : 'auto';
    }
    return(
        <section className="SAED_content">
            <div className="dropdown select_book">
                         <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleChangeOverflowUl}>
                             انتخاب درس
                         </button>
                         <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                             {!valLessons ? <div className="seletct_alert">ابتدا گروه را انتخاب کنید.</div> : !valLessons ? <div className="d-flex justify-content-center select_spinner">
                                 <div className="spinner-border " role="status">
                                     <span className="visually-hidden">Loading...</span>
                                 </div>
                             </div> : (valLessons == 'is not' ? <div className="seletct_alert"> برای این گروه درسی موجود نیست</div> : setLessons())}
                         </ul>
                     </div>
        </section>
    )
}

export default SelectLesson;