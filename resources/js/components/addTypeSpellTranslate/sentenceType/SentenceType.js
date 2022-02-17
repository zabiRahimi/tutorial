import { useEffect, useState } from "react";
import { NavLink, useOutletContext, Outlet, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const SentenceType=()=>{
    const navigate = useNavigate();

    const { index, setIndex, refresh } = useOutletContext();

    const [check, setCheck] = useState('');

    const [valSentences, setValSentences] = useState([]);

    const [sentence, setSentence] = useState({
        id:'',
        sentence: '',
        mean: '',
        pronounceEn:'',
        pronounceFa:'',
    })

    async function getAllSentences(word_id) {
        await axios.get(`/getAllSentenceTypes/${word_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.sentences != 0 ?
                    (
                        setValSentences(response.data.sentences),
                        setCheck(1)
                    )
                    :
                    (
                        setCheck(2)
                    );
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    const alertSelectSentence = () => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'ابتدا لازم است کلمه را انتخاب کنید',
            showConfirmButton: false,
            timer: 3500
        }).then(() => {
            navigate(`/addTypeSpellTranslate/wordType`)
        })
    }

    useEffect(() => {
        !index.book_id ? '' : getAllSentences(index.word_id);
        checkHasSentence();
    }, [index.word_id, check, refresh]);

    const checkHasSentence= () => {
        if (!index.word_id) {
            alertSelectSentence()
        } else {

            switch (check) {
                case '': ''
                    break;
                case 2: navigate("add");
                    break;
                default:
                    navigate(`select`);
            }
        }
    }
    
    return (
        <section className="sectionAED">

            {check != '' ?
                <>
                    <section className="showNameBook">
                        <div className="line"></div>
                        <div className="nameBook">{index.book} --- {index.lesson} --- {index.word} </div>
                    </section> 

                    <nav className="navAED">
                        <NavLink to='select' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}>انتخاب جمله</NavLink>
                        <NavLink to='add' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                            >ایجاد جمله</NavLink>
                        <NavLink to='edit' className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                            >ویرایش و حذف جمله</NavLink>
                    </nav>
                    <Outlet context={{ index, setIndex, valSentences, setValSentences, sentence, setSentence }} />
                </>
                :
                <div className="d-flex justify-content-center select_spinner">
                    <div className="spinner-border " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

        </section>
    )
}

export default SentenceType;