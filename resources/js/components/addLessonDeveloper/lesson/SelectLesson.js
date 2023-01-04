import { useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from 'sweetalert2';

const SelectLesson = () => {
    useChengeDocumentTitle('select lesson');
    const navigate = useNavigate();

    const {setIndex, valLessons, setLesson } = useOutletContext();

    useEffect(() => {
        checkHasLesson()
    }, []);

    /**
     * چنانچه درسی ایجاد نشده باشد این متد هشدار داده  
     * و کاربر به صفحه ایجاد درس هدایت می‌کند
     */
    const checkHasLesson = () => {
        valLessons.length == 0 ?
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'تا کنون درسی ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then((result) => {
                navigate(`/addLessonDeveloper/lesson/add`)
            })
            : '';
    }

    /**
      * انتخاب درس کتاب و ذخیره اطلاعات درس
      * index ذخیره اطلاعات در فایل
      * @param {*} id 
      * @param {*} lesson 
      * @param {*} link 
      */
    const handleSelectLesson = (id, lesson, link) => {
        setIndex(prev => ({ ...prev, lesson_id: id, lesson: lesson }));
        setLesson({id, lesson, link });
    }

    const setLessons = () => {
        let val = valLessons.map((lessons, i) => {
            return <li key={i} onClick={() => handleSelectLesson(lessons.id, lessons.lesson, lessons.link)}>{lessons.lesson}</li>
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
                    انتخاب درس
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    { setLessons()}
                </ul>
            </div>
        </section>
    )
}

export default SelectLesson;