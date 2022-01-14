
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';
import Book from './Book';
import Lesson from "./Lesson";
import Word from "./Word";
import Sentence from "./Sentence";

const AddTypeSpellTranslate = (props) => {
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
        
        wordName: '',
        word_id: '',
        wordLink: '',
        word: '',
        wordMean: '',
        wordPronounceEn: '',
        wordPronounceFa: '',
        
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
     * این متد هنگامی که یکی از گروه های موجود درس انتخاب می‌شود 
     * آی‌دی آن را به فرم ایجاد درس اضافه می کند
     */
    const handleElement = (e,nameElement, data = null, getId = null) => {
        
            let {value } = e.target;
            setElement(prev => ({ ...prev, [nameElement]: value }));
        
        // if (data) {
        //     setElement(prev => ({ ...prev, [getId]: data }));

        // } else {
        //     let {value } = e.target;
        //     setElement(prev => ({ ...prev, [name]: value }));
        // }

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
                handleElement={handleElement}
                setElement={setElement}
                element={element}
                handleChangeOverflowUl={handleChangeOverflowUl}
            />

            <Lesson
                ref={lessonFun} //دریافت ارجا متد
                bookFun={bookFun} //ارسال ارجا متد
                wordFun={wordFun} //ارسال ارجا متد
                sentenceFun={sentenceFun} //ارسال ارجا متد
                handleElement={handleElement}
                setElement={setElement}
                element={element}
                handleChangeOverflowUl={handleChangeOverflowUl}
            />

            <Word
                ref={wordFun} //دریافت ارجا متد
                bookFun={bookFun} //ارسال ارجا متد
                lessonFun={lessonFun} //ارسال ارجا متد
                sentenceFun={sentenceFun} //ارسال ارجا متد
                handleElement={handleElement}
                setElement={setElement}
                element={element}
                handleChangeOverflowUl={handleChangeOverflowUl}
            />

            <Sentence
                ref={sentenceFun} //دریافت ارجا متد
                bookFun={bookFun} //ارسال ارجا متد
                lessonFun={lessonFun} //ارسال ارجا متد
                wordFun={wordFun} //ارسال ارجا متد
                handleElement={handleElement}
                setElement={setElement}
                element={element}
            />


        </div>
    );
}

export default AddTypeSpellTranslate;