import { useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from 'sweetalert2';

const SelectLessonType=()=>{
    useChengeDocumentTitle('select lesson Type spell translate');
    const navigate = useNavigate();

    const { valLessonTypes, setElement } = useOutletContext();

    useEffect(() => {
        checkHasLessonType()

    }, []);

    /**
     * چنانچه فصلی ایجاد نشده باشد این متد هشدار داده  
     * و کاربر به صفحه ایجاد فصل هدایت می‌کند
     */
    const checkHasLessonType = () => {
        valLessonTypes.length == 0 ?
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'تا کنون فصلی ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then((result) => {
                navigate(`/addTypeSpellTranslate/lessonType/add`)
            })
            : '';
    }

    /**
      * انتخاب فصل کتاب و ذخیره اطلاعات فصل
      * index ذخیره اطلاعات در فایل
      * @param {*} id 
      * @param {*} bookType 
      * @param {*} bookTypeLink 
      */
    const handleSelectLessonType = (id, lessonType, lessonTypeLink) => {
        setElement(prev => ({ ...prev, lessonType_id: id, lessonType: lessonType, lessonTypeLink: lessonTypeLink }));
    }

    const setLessonTypes = () => {
        let val = valLessonTypes.map((lessonTypes, i) => {
            return <li key={i} onClick={() => handleSelectLessonType(lessonTypes.id, lessonTypes.lesson, lessonTypes.lessonLink)}>{lessonTypes.lesson}</li>
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
                    { setLessonTypes()}
                </ul>
            </div>
        </section>
    )
}

export default SelectLessonType;