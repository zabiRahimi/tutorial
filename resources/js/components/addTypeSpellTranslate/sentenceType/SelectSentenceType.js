import { useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";
import useChengeDocumentTitle from "../../hooks/useChengeDocumentTitle";
import Swal from 'sweetalert2';

const SelectSentenceType=()=>{
    useChengeDocumentTitle('select sentence Type spell translate');
    const navigate = useNavigate();

    const { valSentences, setSentence } = useOutletContext();

    useEffect(() => {
        checkHasSentence()

    }, []);

    /**
     * چنانچه جمله ای ایجاد نشده باشد این متد هشدار داده  
     * و کاربر را به صفحه ایجاد جمله هدایت می‌کند
     */
    const checkHasSentence = () => {
        valSentences.length == 0 ?
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'تا کنون جمله‌ای ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then((result) => {
                navigate(`/addTypeSpellTranslate/sentenceType/add`)
            })
            : '';
    }

    /**
      * انتخاب جمله و ذخیره اطلاعات جمله
      * index ذخیره اطلاعات در فایل
      * @param {*} id 
      * @param {*} sentence 
      * @param {*} mean ... 
      */
    const handleSelectSentence = (id, sentence, mean, pronounceEn, pronounceFa) => {
        setSentence({id, sentence, mean, pronounceEn, pronounceFa});
    }

    const setSentences = () => {
        let val = valSentences.map((sentences, i) => {
            let mean=sentences.mean?sentences.mean:'';
            let pronounceEn=sentences.pronounceEn?sentences.pronounceEn:'';
            let pronounceFa =sentences.pronounceFa?sentences.pronounceFa:'';
            return <li key={i} onClick={() => handleSelectSentence(sentences.id, sentences.sentence, mean, pronounceEn, pronounceFa)}>{sentences.sentence}</li>
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
                    انتخاب جمله
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    { setSentences()}
                </ul>
            </div>
        </section>
    )
}

export default SelectSentenceType;