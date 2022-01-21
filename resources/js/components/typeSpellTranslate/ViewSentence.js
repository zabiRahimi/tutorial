// import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Link ,useLocation} from "react-router-dom";

const ViewSentence = () => {
   const { state } = useLocation();
   const[valSentences , setValSentences]=useState();

   async function getSentences() {
    await axios.get(`/getSentences/${state.word_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      .then(response => {
        response.data.sentences.length != 0 ? setValSentences(response.data.sentences) : setValSentences('is not');

      })
      .catch(error => {
        alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
      })
  }

  useEffect(() => {
    getSentences();
  }, []);

  const showSentences = () => {
    let val = valSentences.map((sentence, i) => {
      return <div className="sentences" key={i}>
      <div className="sentence">{sentence.sentence}</div>
      <div className="sentenceMean">{sentence.mean}</div>
      <div className="sentenceEn">{sentence.pronounceEn}</div>
      <div className="sentenceFa">{sentence.pronounceFa}</div>
  </div>
    })
    return val;
  }

    return (
        <div>
            <div className="TSTheader fontEn">sentences {state.word}</div>
            <div className="menuPage">
                <Link className='fontEn' to="/">home</Link>
                <Link className='fontEn' to='/typeSpellTranslate'>typeSpellTranslate</Link>
                <Link className='fontEn' to={`/typeSpellTranslate/${state.bookLink}/${state.lessonLink}`} state={{'bookLink': state.bookLink , 'lessonLink': state.lessonLink , 'lesson_id': state.lesson_id, 'lesson': state.lesson }}>goBack</Link>
            </div>
      {!valSentences ? 'loging' : (valSentences == 'is not' ? <div className="bg-warning text-danger notSenctences">برای این کلمه جمله ای وجود ندارد</div>  : showSentences())}


            
        </div>
    )
}
export default ViewSentence;