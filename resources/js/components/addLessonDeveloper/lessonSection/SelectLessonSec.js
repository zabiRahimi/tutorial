import { useEffect} from "react"
import { useOutletContext , useNavigate } from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from 'sweetalert2';

const SelectLessonSec=()=>{
    useChengeDocumentTitle('select lesson');
const navigate = useNavigate();

const {valLessonSecs,setElement} = useOutletContext();

useEffect(()=>{
    checkHasLessonSec()
    
},[]);

/**
 * چنانچه فصلی ایجاد نشده باشد این متد هشدار داده  
 * و کاربر به صفحه ایجاد فصل هدایت می‌کند
 */
 const checkHasLessonSec=()=>{
    valLessonSecs.length==0?
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'تا کنون بخشی ایجاد نشده است',
        showConfirmButton: false,
        timer: 3000,
    }).then((result) => {
        navigate(`/addLessonDeveloper/lessonSec/add`)
    })
    :'';
}

/**
  * انتخاب فصل کتاب و ذخیره اطلاعات فصل
  * index ذخیره اطلاعات در فایل
  * @param {*} id 
  * @param {*} lessonSec 
  * @param {*} des
  */
 const handleSelectLessonSec = (id, lessonSec,des) => {
    setElement(prev => ({ ...prev, lessonSec_id:id, lesson_section: lessonSec, des:des }));
}

const setLessonSecs = () => {
    let val = valLessonSecs.map((lessonSecs, i) => {
        return <li key={i} onClick={() => handleSelectLessonSec(lessonSecs.id, lessonSecs.lesson_section, lessonSecs.des)}>{lessonSecs.lesson_section}</li>
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