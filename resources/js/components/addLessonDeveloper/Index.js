
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';
import Book from './Book';
import Lesson from "./Lesson";
import LessonSection from "./LessonSection";

const AddLessonDeveloper = (props) => {
    useChengeDocumentTitle('add lesson');
    const [element, setElement] = useState({
        bookName: '',//برای نمایش نام گروه انتخاب شده در صفحه جاری
        book: '',
        bookLink: '',
        book_id: '',
        lessonName: '', //برای نمایش نام درس در صفحه جاری
        lesson: '',
        lessonLink: '',
        lesson_id: '',
        lesson_section: '',
        des: '',
        
    });

    /**
     * دریافت از فرزندش لیسن که نهایتا با پاراپس فرستاده شده به بوک
     */
    const lessonFun = useRef();// lesson فراخوانی متد از کاپوننت 
    const lessonSecFun = useRef();//lessonSection فراخوانی متد از کامپوننت   
    
    /**
     * این متد هنگامی که یکی از گروه های موجود درس انتخاب می‌شود 
     * آی‌دی آن را به فرم ایجاد درس اضافه می کند
     */
    const handleElement = (e ,data=null , getId=null) => {
        console.log('handle element');
        console.log(e.target.id);
        if(data){
            setElement(prev => ({ ...prev, [getId]: data }));

        }else{
            let { id, value } = e.target;
            setElement(prev => ({ ...prev, [id]: value }));
        }
       
    }
    /**
     * در مورد نیاز اسکرول را به لیست اضافه می‌کند
     * عدد 230 ماکزیمم ارتفاع لیست است که در فایل سی‌اس‌اس اعمال شده
     * تابع چک می‌کند اگر لیست بیشتر از 230 ارتفاع داشت اسکرول اضافه کند
     * و اگر کمتر بود اسکرول حذف می‌گردد
     * @param {*} e 
     */
    const handleChangeOverflowUl=(e)=>{
        const parent=e.target.parentNode;
        const child=parent.querySelector('ul');
        const height=child.offsetHeight;
        child.style.overflow=height<230?'visible':'auto';
    }
    return (
        <div >
            <div className="lessonsDeveloperTitle">
                <h3>اضافه کردن درس جدید</h3>
            </div>
            <div className="menuPage">
                <Link to='/'>home</Link>
                <Link to='/lessons' >go back</Link>
                <Link to="lessons/guideAddLesson">راهنمای اضافه کردن درس</Link>
            </div>
            <Book
                lessonFun={lessonFun} //ارسال ارجا متد
                lessonSecFun={lessonSecFun} //ارسال ارجا متد
                handleElement={handleElement}
                setElement={setElement}
                element={element}
                handleChangeOverflowUl={handleChangeOverflowUl}
            />
            <Lesson
                ref={lessonFun} //دریافت ارجا متد
                lessonSecFun={lessonSecFun} //ارسال ارجا متد
                handleElement={handleElement}
                setElement={setElement}
                element={element}
                handleChangeOverflowUl={handleChangeOverflowUl}

            />
            <LessonSection
                ref={lessonSecFun} //دریافت ارجا متد
                handleElement={handleElement}
                setElement={setElement}
                element={element}
            />
            
        </div>
    );
}

export default AddLessonDeveloper;