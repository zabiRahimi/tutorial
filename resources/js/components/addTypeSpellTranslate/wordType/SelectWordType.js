import { useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from 'sweetalert2';

const SelectWordType=()=>{
    useChengeDocumentTitle('select word Type spell translate');
    const navigate = useNavigate();

    const {  setIndex, valWords, setWord } = useOutletContext();

    useEffect(() => {
        checkHasWord()

    }, []);

    /**
     * چنانچه فصلی ایجاد نشده باشد این متد هشدار داده  
     * و کاربر به صفحه ایجاد فصل هدایت می‌کند
     */
    const checkHasWord = () => {
        valWords.length == 0 ?
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'تا کنون کلمه ای ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then((result) => {
                navigate(`/addTypeSpellTranslate/wordType/add`)
            })
            : '';
    }

    /**
      * انتخاب کلمه و ذخیره اطلاعات کلمه
      * index ذخیره اطلاعات در فایل
      * @param {*} id 
      * @param {*} word 
      * @param {*} link ...
      */
    const handleSelectWord = (id, word, link, mean, pronounceEn, pronounceFa) => {

        setIndex(prev => ({ ...prev, word_id: id, word: word}));
        setWord({id, word, link, mean, pronounceEn, pronounceFa});
        // setElement(prev => ({ ...prev, word_id: id, word: word, link: link, mean:mean, pronounceEn:pronounceEn , pronounceFa:pronounceFa}));
    }

    const setWords = () => {
        let val = valWords.map((words, i) => {
            let mean=words.mean?words.mean:'';
            let pronounceEn=words.pronounceEn?words.pronounceEn:'';
            let pronounceFa =words.pronounceFa?words.pronounceFa:'';
            return <li key={i} onClick={() => handleSelectWord(words.id, words.word, words.link, mean, pronounceEn, pronounceFa)}>{words.word}</li>
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
                    انتخاب کلمه
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    { setWords()}
                </ul>
            </div>
        </section>
    )
}

export default SelectWordType;