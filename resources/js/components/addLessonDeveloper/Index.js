import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';


const AddLessonDeveloper = () => {

    useChengeDocumentTitle('add lesson');

    // let navigate = useNavigate();

    /**
     * هنگامی که کاربر یکی از لینک های این صفحه را کلیک کند
     * یوزافکت صفحه مورد نظر بازخوانی می‌شود، این متد زمانی 
     * کاربرد دارد که کاربر در صفحه مورد نظر دوباره لینک همان
     * صفحه را کلیک کند 
     * افکت صفحه مورد نظر با تغییر مقدار این متد فراخوانی می‌شود
     * مقدار این متد در همین صفحه تغییر می‌کند آن هم زمانی که 
     * کاربر لینک صفحه مورد نظرش را کلیک کند
     */
    const [refresh, setRefresh] = useState(1);
    const [element, setElement] = useState({
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
        lessonSectionCount2: '',//هنگام حذف درس استفاده می‌شود

    });

    /**
     * دریافت از فرزندش لیسن که نهایتا با پاراپس فرستاده شده به بوک
     */
    const bookFun = useRef();//lessonSection فراخوانی متد از کامپوننت   
    const lessonFun = useRef();// lesson فراخوانی متد از کاپوننت 
    const lessonSecFun = useRef();//lessonSection فراخوانی متد از کامپوننت   

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
                    <NavLink to='/addLessonDeveloper/book' onClick={() => setRefresh(refresh + 1)}
                        className={({ isActive }) =>isActive ? 'MA_active' : 'MA_passive'}>
                        کتاب
                    </NavLink>

                    <NavLink to='/addLessonDeveloper/lesson'
                        className={({ isActive }) =>isActive ? 'MA_active' : 'MA_passive'}>
                        فصل کتاب
                    </NavLink>

                    <NavLink to='/addLessonDeveloper/lessonSec'
                        className={({ isActive }) => isActive ? 'MA_active' : 'MA_passive'}>
                        بخش کتاب
                    </NavLink>
                </nav>
                <section className="content_mainAdd">
                    <Outlet context={{ element, setElement, refresh, setRefresh }} />
                </section>
            </section>
        </div>
    );
}

export default AddLessonDeveloper;