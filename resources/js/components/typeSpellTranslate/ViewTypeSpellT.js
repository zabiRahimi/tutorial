

import { Link, useNavigate,useLocation,useParams } from "react-router-dom";
import useCheckSpelling from "../hooks/useCheckSpelling.js";
import useType from '../hooks/useType.js';
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';
import useBodySpellType from "../hooks/useBodySpellType.js";
import Spell from "./spell.js";
import Type from "./Type.js";
import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import '../../../css/TypeSpellTranslate.css';

// const words = [
//     [
//         'abandon',//word
//         'ترک کردن، رها کردن',//mean
//         '/əˈbandən/',//en
//         'اِباندِن',//Pr
//     ],
//     [
//         'keen',//word
//         'تیز، شدید، مشتاق، حساس',//mean
//         '/kiːn/',//en
//         'کین',//Pr
//     ],
//     [
//         'jealous',//word
//         'حسود',//mean
//         '/ˈdʒɛləs/',//en
//         'جلِس',//Pr
//     ],
//     [
//         'tact',//word
//         'تدبیر، کیاست، ملاحظه',//mean
//         '/takt/',//en
//         'تاکت',//Pr
//     ],
//     [
//         'oath',//word
//         'قسم، سوگند، ناسزا، دشنام',//mean
//         '/oʊθ/',//en
//         'اَوث',//Pr
//     ],
//     [
//         'vacant',//word
//         'خالی',//mean
//         '/ˈveɪkənt/',//en
//         'وی کِنت',//Pr
//     ],
//     [
//         'hardship',//word
//         'سختی، دشواری',//mean
//         '/ˈhɑːrd.ʃɪp/',//en
//         'هاردشیپ',//Pr
//     ],
//     [
//         'gallant',//word
//         'شجاع، با شکوه',//mean
//         '/ˈɡæl.ənt/',//en
//         'گَلِنت',//Pr
//     ],
//     [
//         'data',//word
//         'اطلاعات، داده ها',//mean
//         '/ˈdeɪ.t̬ə/',//en
//         'دیتا',//Pr
//     ],
//     [
//         'unaccustomed',//word
//         'نا آشنا(به)، خو نگرفته',//mean
//         '/ˌʌn.əˈkʌs.təmd/',//en
//         'آن اِکاستامِد',//Pr
//     ],
//     [
//         'bachelor',//word
//         'مرد مجرد',//mean
//         '/ˈbætʃ.əl.ər/',//en
//         'بَچلِر',//Pr
//     ],
//     [
//         'qualify',//word
//         'واجد شرایط بودن',//mean
//         '/ˈkwɑː.lə.faɪ/',//en
//         'کوالی فای',//Pr
//     ],
    
// ];

const ViewTypeSpellT = () => {
    const[words,setWords]=useState('');
   const { state } = useLocation();

    // const title='504_1';
    // const {bodySpellType}=useBodySpellType(words , title );
    async function getWords() {
        await axios.get(`/getWords/${state.lesson_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
          .then(response => {
            // console.log(response.data.words);
            setWords(response.data.words);
          })
          .catch(error => {
            alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
          })
      }
    useEffect(()=>{
        getWords();
        
    },[])
   
    
    return (
        <div>

            <div className="TSTheader fontEn">type and spell {state.lesson}</div>
                <div className="menuPage">
                    <Link className='fontEn' to="/">home</Link>
                    <Link className='fontEn' to='/typeSpellTranslate'>goBack</Link>
                </div>
            {/* {bodySpellType} */}
           
            <Type
            words={words}
            
            />
            <Spell
            words={words}
            bookLink={state.bookLink}
            lessonLink={state.lessonLink}
            lesson_id={state.lesson_id}
            lesson={state.lesson}

             />
        </div>
    );
}
export default ViewTypeSpellT; 