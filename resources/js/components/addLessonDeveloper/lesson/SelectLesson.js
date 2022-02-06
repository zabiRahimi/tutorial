import { forwardRef, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";

const SelectLesson=(props , ref)=>{
    // const [element , setElement]=useOutletContext();
    // ارسال این متد به والد و از والد به فرزندش بوک
    // useImperativeHandle(ref, () => ({ getLessons, deleteAlertLesson }), []);

    const [valLessons, setValLessons] = useState();


    async function getLessons(book_id) {
        await axios.get(`/getLessons/${book_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.countlessons != 0 ?
                    (setValLessons(response.data.lessons),
                        setElement(prev => ({ ...prev, 'lessonCount': response.data.countlessons, 'lessonSectionCount': response.data.countLessonSections })))
                    :
                    (setValLessons('is not'),
                        setElement(prev => ({ ...prev, 'lessonCount': 0, 'lessonSectionCount': 0 }))
                    );
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }
useEffect(()=>{
    getLessons(1)
},[]);
    const setLessons = () => {
        let val = valLessons.map((lessons, i) => {
            return <li key={i} onClick={() => handleSelectLesson(lessons.id, lessons.lesson)}>{lessons.lesson}</li>
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
                             {/* {!element.book_id ? <div className="seletct_alert">ابتدا گروه را انتخاب کنید.</div> : !valLessons ? <div className="d-flex justify-content-center select_spinner">
                                 <div className="spinner-border " role="status">
                                     <span className="visually-hidden">Loading...</span>
                                 </div>
                             </div> : (valLessons == 'is not' ? <div className="seletct_alert"> برای این گروه درسی موجود نیست</div> : setLessons())} */}
                         </ul>
                     </div>
        </section>
    )
}

export default SelectLesson;