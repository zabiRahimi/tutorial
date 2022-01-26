import { useRef, useState } from "react";
import { Link,Outlet } from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';
import Book from './book/Book';
import Lesson from "./Lesson";
import LessonSection from "./LessonSection";

const AddLessonDeveloper = () => {
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
        lessonCount: 0,//هنگام حذف کتاب استفاده می‌شود

        lesson_section: '',
        des: '',
        lessonSectionCount: 0,//هنگام حذف کتاب استفاده می‌شود
        lessonSectionCount2: ''//هنگام حذف درس استفاده می‌شود

    });

    /**
     * دریافت از فرزندش لیسن که نهایتا با پاراپس فرستاده شده به بوک
     */
    const bookFun = useRef();//lessonSection فراخوانی متد از کامپوننت   
    const lessonFun = useRef();// lesson فراخوانی متد از کاپوننت 
    const lessonSecFun = useRef();//lessonSection فراخوانی متد از کامپوننت   

    /**
     * مقدار هر این‌پوت فرم را دخیره می‌کند
     * هنگامی که دکمه ثبت فشرده شد این مقادیر به کنترلر فرستاده می‌شود
     * @param {*} e 
     * @param {*} nameElement 
     */
    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        setElement(prev => ({ ...prev, [input]: value }));
    }

    /**
     * در مورد نیاز اسکرول را به لیست اضافه می‌کند
     * عدد 230 ماکزیمم ارتفاع لیست است که در فایل سی‌اس‌اس اعمال شده
     * تابع چک می‌کند اگر لیست بیشتر از 230 ارتفاع داشت اسکرول اضافه کند
     * و اگر کمتر بود اسکرول حذف می‌گردد
     * @param {*} e 
     */
    const handleChangeOverflowUl = (e) => {
        const parent = e.target.parentNode;
        const child = parent.querySelector('ul');
        const height = child.offsetHeight;
        child.style.overflow = height < 230 ? 'visible' : 'auto';
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
            <section className="mainAdd">
                <nav className="menu_mainAdd">
                    <Link to='/addLessonDeveloper/book' className="a_book">کتاب</Link>
                    <Link to='/addLessonDeveloper/lesson' className="a_lesson">فصل کتاب</Link>
                    <Link to='/addLessonDeveloper/lessonSec' className="a_lessonSec">بخش کتاب</Link>
                </nav>
                <section className="content_mainAdd">
                <Outlet context={[element , setElement]} />
                    {/* <Book
                        ref={bookFun}
                        lessonFun={lessonFun} //ارسال ارجا متد
                        lessonSecFun={lessonSecFun} //ارسال ارجا متد
                        handleSaveValInput={handleSaveValInput}
                        setElement={setElement}
                        element={element}
                        handleChangeOverflowUl={handleChangeOverflowUl}
                    /> */}
                </section>
            </section>
            {/* <Book
                ref={bookFun}
                lessonFun={lessonFun} //ارسال ارجا متد
                lessonSecFun={lessonSecFun} //ارسال ارجا متد
                handleSaveValInput={handleSaveValInput}
                setElement={setElement}
                element={element}
                handleChangeOverflowUl={handleChangeOverflowUl}
            /> */}
            <Lesson
                ref={lessonFun} //دریافت ارجا متد
                bookFun={bookFun}
                lessonSecFun={lessonSecFun} //ارسال ارجا متد
                handleSaveValInput={handleSaveValInput}
                setElement={setElement}
                element={element}
                handleChangeOverflowUl={handleChangeOverflowUl}

            />
            <LessonSection
                ref={lessonSecFun} //دریافت ارجا متد
                bookFun={bookFun}
                lessonFun={lessonFun} //ارسال ارجا متد
                handleSaveValInput={handleSaveValInput}
                setElement={setElement}
                element={element}
            />

        </div>
    );
}

export default AddLessonDeveloper;