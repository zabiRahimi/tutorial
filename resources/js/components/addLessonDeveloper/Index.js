import { useRef, useState } from "react";
import { Link, NavLink, Outlet} from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';


const AddLessonDeveloper = () => {

    useChengeDocumentTitle('add lesson');

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
        
        lesson: '',
        lessonLink: '',
        lesson_id: '',

        lesson_section: '',
        des: '',
        lessonSec_id:''

    });

    return (
        <section >
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

                    <NavLink to='/addLessonDeveloper/lesson' onClick={() => setRefresh(refresh + 1)}
                        className={({ isActive }) =>isActive ? 'MA_active' : 'MA_passive'}>
                        فصل کتاب
                    </NavLink>

                    <NavLink to='/addLessonDeveloper/lessonSec' onClick={() => setRefresh(refresh + 1)}
                        className={({ isActive }) => isActive ? 'MA_active' : 'MA_passive'}>
                        بخش کتاب
                    </NavLink>
                </nav>
                <section className="content_mainAdd">
                    <Outlet context={{ element, setElement, refresh, setRefresh }} />
                </section>
            </section>
        </section>
    );
}

export default AddLessonDeveloper;