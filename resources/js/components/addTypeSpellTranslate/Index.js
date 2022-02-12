
import { useRef, useState } from "react";
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
    const [element, setElement] = useState({
        bookType: '',
        bookTypeLink: '',
        bookType_id: '',

        lessonTypeName: '', //برای نمایش نام درس در صفحه جاری
        lessonType: '',
        lessonTypeLink: '',
        lessonType_id: '',
        lessonTypeCount:'',//هنگام حذف کتاب استفاده می‌شود
        
        wordTypeName: '',
        wordType_id: '',
        wordTypeLink: '',
        wordType: '',
        wordTypeMean: '',
        wordTypePronounceEn: '',
        wordTypePronounceFa: '',
        wordTypeCount:'',//هنگام حذف کتاب استفاده می‌شود
        wordTypeCount2:'',//هنگام حذف درس استفاده می‌شود
        
        sentenceType: '',
        sentenceTypeMean: '',
        sentenceTypePronounceEn: '',
        sentenceTypePronounceFa: '',

    });

    // /**
    //  * دریافت از فرزندش لیسن که نهایتا با پاراپس فرستاده شده به بوک
    //  */
    //  const bookFun = useRef();// book فراخوانی متد از کاپوننت 
    //  const lessonFun = useRef();// lesson فراخوانی متد از کاپوننت 
    //  const wordFun = useRef();//word فراخوانی متد از کامپوننت   
    //  const sentenceFun = useRef();//sentence فراخوانی متد از کامپوننت   
    

    //  /**
    //  * مقدار هر این‌پوت فرم را دخیره می‌کند
    //  * هنگامی که دکمه ثبت فشرده شد این مقادیر به کنترلر فرستاده می‌شود
    //  * @param {*} e 
    //  * @param {*} nameElement 
    //  */
    // const handleSaveValInput = (e,input) => {
    //         let {value } = e.target;
    //         setElement(prev => ({ ...prev, [input]: value }));
    // }

    // /**
    //  * در مورد نیاز اسکرول را به لیست اضافه می‌کند
    //  * عدد 230 ماکزیمم ارتفاع لیست است که در فایل سی‌اس‌اس اعمال شده
    //  * تابع چک می‌کند اگر لیست بیشتر از 230 ارتفاع داشت اسکرول اضافه کند
    //  * و اگر کمتر بود اسکرول حذف می‌گردد
    //  * @param {*} e 
    //  */
    // const handleChangeOverflowUl=(e)=>{
    //     const parent=e.target.parentNode;
    //     const child=parent.querySelector('ul');
    //     const height=child.offsetHeight;
    //     child.style.overflow=height<230?'visible':'auto';
    // }

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
                    <Outlet context={{ element, setElement, refresh, setRefresh }} />
                </section>
            </section>
        </section>
        // <div >
        //     <div className="lessonsDeveloperTitle">
        //         <h3>اضافه کردن درس جدید تایپ، املا، معنی</h3>
        //     </div>
        //     <div className="menuPage">
        //         <Link to='/'>home</Link>
        //         <Link to='/typeSpellTranslate' >go back</Link>
        //         <Link to="/guideAddTypeSpellTranslate">راهنمای اضافه کردن درس</Link>
        //     </div>
            


        // </div>
    );
}

// const AddTypeSpellTranslate = () => {
//     useChengeDocumentTitle('add Type Spell Tarnslate');
//     const [element, setElement] = useState({
//         bookName: '',//برای نمایش نام گروه انتخاب شده در صفحه جاری
//         book: '',
//         bookLink: '',
//         book_id: '',

//         lessonName: '', //برای نمایش نام درس در صفحه جاری
//         lesson: '',
//         lessonLink: '',
//         lesson_id: '',
//         lessonCount:'',//هنگام حذف کتاب استفاده می‌شود
        
//         wordName: '',
//         word_id: '',
//         wordLink: '',
//         word: '',
//         wordMean: '',
//         wordPronounceEn: '',
//         wordPronounceFa: '',
//         wordCount:'',//هنگام حذف کتاب استفاده می‌شود
//         wordCount2:'',//هنگام حذف درس استفاده می‌شود
        
//         sentence: '',
//         sentenceMean: '',
//         sentencePronounceEn: '',
//         sentencePronounceFa: '',

//     });

//     /**
//      * دریافت از فرزندش لیسن که نهایتا با پاراپس فرستاده شده به بوک
//      */
//      const bookFun = useRef();// book فراخوانی متد از کاپوننت 
//      const lessonFun = useRef();// lesson فراخوانی متد از کاپوننت 
//      const wordFun = useRef();//word فراخوانی متد از کامپوننت   
//      const sentenceFun = useRef();//sentence فراخوانی متد از کامپوننت   
    

//      /**
//      * مقدار هر این‌پوت فرم را دخیره می‌کند
//      * هنگامی که دکمه ثبت فشرده شد این مقادیر به کنترلر فرستاده می‌شود
//      * @param {*} e 
//      * @param {*} nameElement 
//      */
//     const handleSaveValInput = (e,input) => {
//             let {value } = e.target;
//             setElement(prev => ({ ...prev, [input]: value }));
//     }
//     /**
//      * در مورد نیاز اسکرول را به لیست اضافه می‌کند
//      * عدد 230 ماکزیمم ارتفاع لیست است که در فایل سی‌اس‌اس اعمال شده
//      * تابع چک می‌کند اگر لیست بیشتر از 230 ارتفاع داشت اسکرول اضافه کند
//      * و اگر کمتر بود اسکرول حذف می‌گردد
//      * @param {*} e 
//      */
//     const handleChangeOverflowUl=(e)=>{
//         const parent=e.target.parentNode;
//         const child=parent.querySelector('ul');
//         const height=child.offsetHeight;
//         child.style.overflow=height<230?'visible':'auto';
//     }
//     return (
//         <div >
//             <div className="lessonsDeveloperTitle">
//                 <h3>اضافه کردن درس جدید تایپ، املا، معنی</h3>
//             </div>
//             <div className="menuPage">
//                 <Link to='/'>home</Link>
//                 <Link to='/typeSpellTranslate' >go back</Link>
//                 <Link to="/guideAddTypeSpellTranslate">راهنمای اضافه کردن درس</Link>
//             </div>
//             <Book
//                 ref={bookFun}
//                 lessonFun={lessonFun} //ارسال ارجا متد
//                 wordFun={wordFun} //ارسال ارجا متد
//                 sentenceFun={sentenceFun} //ارسال ارجا متد
//                 handleSaveValInput={handleSaveValInput}
//                 setElement={setElement}
//                 element={element}
//                 handleChangeOverflowUl={handleChangeOverflowUl}
//             />

//             <Lesson
//                 ref={lessonFun} //دریافت ارجا متد
//                 bookFun={bookFun} //ارسال ارجا متد
//                 wordFun={wordFun} //ارسال ارجا متد
//                 sentenceFun={sentenceFun} //ارسال ارجا متد
//                 handleSaveValInput={handleSaveValInput}
//                 setElement={setElement}
//                 element={element}
//                 handleChangeOverflowUl={handleChangeOverflowUl}
//             />

//             <Word
//                 ref={wordFun} //دریافت ارجا متد
//                 bookFun={bookFun} //ارسال ارجا متد
//                 lessonFun={lessonFun} //ارسال ارجا متد
//                 sentenceFun={sentenceFun} //ارسال ارجا متد
//                 handleSaveValInput={handleSaveValInput}
//                 setElement={setElement}
//                 element={element}
//                 handleChangeOverflowUl={handleChangeOverflowUl}
//             />

//             <Sentence
//                 ref={sentenceFun} //دریافت ارجا متد
//                 bookFun={bookFun} //ارسال ارجا متد
//                 lessonFun={lessonFun} //ارسال ارجا متد
//                 wordFun={wordFun} //ارسال ارجا متد
//                 handleSaveValInput={handleSaveValInput}
//                 setElement={setElement}
//                 element={element}
//             />


//         </div>
//     );
// }

export default AddTypeSpellTranslate;