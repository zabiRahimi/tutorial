import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';


const AddLessonDeveloper = () => {

    useChengeDocumentTitle('add lesson');

    // let { state } = useLocation();

    let navigate = useNavigate();

    const [element, setElement] = useState({
        // bookName: '',//برای نمایش نام گروه انتخاب شده در صفحه جاری
        book: '',
        bookLink: '',
        // bookLink2: '',//جهت استفاده در فرم ویرایش
        book_id: '',

        lessonName: '', //برای نمایش نام درس در صفحه جاری
        lesson: '',
        lessonLink: '',
        lesson_id: '',
        lessonCount: 0,//هنگام حذف کتاب استفاده می‌شود

        lesson_section: '',
        des: '',
        lessonSectionCount: 0,//هنگام حذف کتاب استفاده می‌شود
        lessonSectionCount2: '',//هنگام حذف درس استفاده می‌شود

    });

    useEffect(() => {
        // checkLink();
    }, [])

    // const checkLink = () => {
    //     navigate(`${state.link}`, { state: { re_index: state.re_index, link: state.link, link2: state.link2 } })
    // }
    // console.log(zabi);
    /**
     * دریافت از فرزندش لیسن که نهایتا با پاراپس فرستاده شده به بوک
     */
    const bookFun = useRef();//lessonSection فراخوانی متد از کامپوننت   
    const lessonFun = useRef();// lesson فراخوانی متد از کاپوننت 
    const lessonSecFun = useRef();//lessonSection فراخوانی متد از کامپوننت   

    // /**
    //  * مقدار هر این‌پوت فرم را دخیره می‌کند
    //  * هنگامی که دکمه ثبت فشرده شد این مقادیر به کنترلر فرستاده می‌شود
    //  * @param {*} e 
    //  * @param {*} nameElement 
    //  */
    // const handleSaveValInput = (e, input) => {
    //     let { value } = e.target;
    //     setElement(prev => ({ ...prev, [input]: value }));
    // }

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
                    <NavLink to='/addLessonDeveloper/book'
                        state={{ re_index: 1, link: 'book', link2: 'select' }}
                        className={({ isActive }) =>
                            isActive ? 'MA_active' : 'MA_passive'}>کتاب</NavLink>
                    <NavLink to='/addLessonDeveloper/lesson'
                        state={{ re_index: 2, link: 'lesson', link2: 'select' }}
                        className={({ isActive }) =>
                            isActive ? 'MA_active' : 'MA_passive'}>فصل کتاب</NavLink>
                    <NavLink to='/addLessonDeveloper/lessonSec'
                        state={{ re_index: 3, link: 'lessonSec', link2: 'select' }}
                        className={({ isActive }) =>
                            isActive ? 'MA_active' : 'MA_passive'}>بخش کتاب</NavLink>
                </nav>
                <section className="content_mainAdd">
                    <Outlet context={[element, setElement]} />

                </section>
            </section>


        </div>
    );
}

export default AddLessonDeveloper;