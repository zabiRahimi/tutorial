
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';
import Book from './Book';
import Lesson from "./Lesson";
import Word from "./Word";
import Sentence from "./Sentence";

const AddTypeSpellTranslate = () => {
    useChengeDocumentTitle('add Type Spell Tarnslate');
    const [element, setElement] = useState({
        bookName: '',//برای نمایش نام گروه انتخاب شده در صفحه جاری
        book: '',
        bookLink: '',
        book_id: '',

        lessonName: '', //برای نمایش نام درس در صفحه جاری
        lesson: '',
        lessonLink: '',
        lesson_id: '',
        lessonCount:'',//هنگام حذف کتاب استفاده می‌شود
        
        wordName: '',
        word_id: '',
        wordLink: '',
        word: '',
        wordMean: '',
        wordPronounceEn: '',
        wordPronounceFa: '',
        wordCount:'',//هنگام حذف کتاب استفاده می‌شود
        wordCount2:'',//هنگام حذف درس استفاده می‌شود
        
        sentence: '',
        sentenceMean: '',
        sentencePronounceEn: '',
        sentencePronounceFa: '',

    });

    /**
     * دریافت از فرزندش لیسن که نهایتا با پاراپس فرستاده شده به بوک
     */
     const bookFun = useRef();// book فراخوانی متد از کاپوننت 
     const lessonFun = useRef();// lesson فراخوانی متد از کاپوننت 
     const wordFun = useRef();//word فراخوانی متد از کامپوننت   
     const sentenceFun = useRef();//sentence فراخوانی متد از کامپوننت   
    

     /**
     * مقدار هر این‌پوت فرم را دخیره می‌کند
     * هنگامی که دکمه ثبت فشرده شد این مقادیر به کنترلر فرستاده می‌شود
     * @param {*} e 
     * @param {*} nameElement 
     */
    const handleSaveValInput = (e,input) => {
            let {value } = e.target;
            setElement(prev => ({ ...prev, [input]: value }));
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
                <h3>اضافه کردن درس جدید تایپ، املا، معنی</h3>
            </div>
            <div className="menuPage">
                <Link to='/'>home</Link>
                <Link to='/typeSpellTranslate' >go back</Link>
                <Link to="/guideAddTypeSpellTranslate">راهنمای اضافه کردن درس</Link>
            </div>
            <Book
                ref={bookFun}
                lessonFun={lessonFun} //ارسال ارجا متد
                wordFun={wordFun} //ارسال ارجا متد
                sentenceFun={sentenceFun} //ارسال ارجا متد
                handleSaveValInput={handleSaveValInput}
                setElement={setElement}
                element={element}
                handleChangeOverflowUl={handleChangeOverflowUl}
            />

            <Lesson
                ref={lessonFun} //دریافت ارجا متد
                bookFun={bookFun} //ارسال ارجا متد
                wordFun={wordFun} //ارسال ارجا متد
                sentenceFun={sentenceFun} //ارسال ارجا متد
                handleSaveValInput={handleSaveValInput}
                setElement={setElement}
                element={element}
                handleChangeOverflowUl={handleChangeOverflowUl}
            />

            <Word
                ref={wordFun} //دریافت ارجا متد
                bookFun={bookFun} //ارسال ارجا متد
                lessonFun={lessonFun} //ارسال ارجا متد
                sentenceFun={sentenceFun} //ارسال ارجا متد
                handleSaveValInput={handleSaveValInput}
                setElement={setElement}
                element={element}
                handleChangeOverflowUl={handleChangeOverflowUl}
            />

            <Sentence
                ref={sentenceFun} //دریافت ارجا متد
                bookFun={bookFun} //ارسال ارجا متد
                lessonFun={lessonFun} //ارسال ارجا متد
                wordFun={wordFun} //ارسال ارجا متد
                handleSaveValInput={handleSaveValInput}
                setElement={setElement}
                element={element}
            />


        </div>
    );
}

export default AddTypeSpellTranslate;