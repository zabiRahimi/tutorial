import { useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from 'sweetalert2';

const SelectLessonSec = () => {

    useChengeDocumentTitle('select lesson');

    const navigate = useNavigate();

    const {valLessonSecs,  setLessonSec } = useOutletContext();

    useEffect(() => {
        checkHasLessonSec()

    }, []);

    /**
     * چنانچه بخشی ایجاد نشده باشد این متد هشدار داده  
     * و کاربر به صفحه ایجاد بخش هدایت می‌کند
     */
    const checkHasLessonSec = () => {
        valLessonSecs.length == 0 ?
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'تا کنون بخشی ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then((result) => {
                navigate(`/addLessonDeveloper/lessonSec/add`)
            })
            : '';
    }

    /**
      * انتخاب بخش  و ذخیره اطلاعات بخش
      * index ذخیره اطلاعات در فایل
      * @param {*} id 
      * @param {*} lessonSec 
      * @param {*} des
      */
    const handleSelectLessonSec = (id, ordering, lesson_section, des) => {
        setLessonSec({id, ordering, lesson_section, des});
    }

    const setLessonSecs = () => {
        let val = valLessonSecs.map((lessonSecs, i) => {
            return <li key={i} onClick={() => handleSelectLessonSec(lessonSecs.id, lessonSecs.ordering, lessonSecs.lesson_section, lessonSecs.des)}>{lessonSecs.lesson_section}</li>
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
            <div className="dropdown select_book">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleChangeOverflowUl}>
                    انتخاب بخش
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {setLessonSecs()}
                </ul>
            </div>
        </section>
    )
}

export default SelectLessonSec;