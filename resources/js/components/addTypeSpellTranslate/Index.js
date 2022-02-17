
import { useState } from "react";
import { Link, NavLink, Outlet} from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';

const AddTypeSpellTranslate = () => {
    useChengeDocumentTitle('add Type Spell Tarnslate');

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

    /**
     * مقادیر زیر بین زیرشاخه ها به اشتراک گذاشته می‌شود
     */
    const[index,setIndex]=useState({
        book_id:'',
        book:'',

        lesson_id:'',
        lesson:'',

        word_id:'',
        word:'',

        sentence_id:'',
        sentence:''
    })

    return (
        <section >
            <div className="lessonsDeveloperTitle">
             <h3>اضافه کردن درس جدید تایپ، املا، معنی</h3>
            </div>
            <div className="menuPage">
                <Link to='/'>home</Link>
                <Link to='/typeSpellTranslate' >go back</Link>
                <Link to="/guideAddTypeSpellTranslate">راهنمای اضافه کردن درس</Link>
            </div>
            <section className="mainAdd">
                <nav className="menu_mainAdd">
                    <NavLink to='/addTypeSpellTranslate/bookType' onClick={() => setRefresh(refresh + 1)}
                        className={({ isActive }) =>isActive ? 'MA_active' : 'MA_passive'}>
                        کتاب
                    </NavLink>

                    <NavLink to='/addTypeSpellTranslate/lessonType' onClick={() => setRefresh(refresh + 1)}
                        className={({ isActive }) =>isActive ? 'MA_active' : 'MA_passive'}>
                        فصل کتاب
                    </NavLink>

                    <NavLink to='/addTypeSpellTranslate/wordType' onClick={() => setRefresh(refresh + 1)}
                        className={({ isActive }) => isActive ? 'MA_active' : 'MA_passive'}>
                        کلمات
                    </NavLink>
                    <NavLink to='/addTypeSpellTranslate/sentenceType' onClick={() => setRefresh(refresh + 1)}
                        className={({ isActive }) => isActive ? 'MA_active' : 'MA_passive'}>
                        جملات
                    </NavLink>
                </nav>
                <section className="content_mainAdd">
                    <Outlet context={{index, setIndex, refresh, setRefresh }} />
                </section>
            </section>
        </section>
        
    );
}


export default AddTypeSpellTranslate;