// import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ViewSentence = () => {
  const { state } = useLocation();
  const [valSentences, setValSentences] = useState();

  const [hasSentence, setHasSentence] = useState(false);

  async function getSentences() {
    await axios.get(`/getAllSentenceTypes/${state.word_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      .then(response => {
        if (response.data.sentences.length != 0) {
          setValSentences(response.data.sentences);
          setHasSentence('hasSentence');
        } else {
          setHasSentence('notSentence');
        }

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
        <Link className='fontEn' to={`/typeSpellTranslate/${state.bookLink}/${state.link}`} state={{ 'bookLink': state.bookLink, 'link': state.link, 'lesson_id': state.lesson_id, 'lesson': state.lesson }}>goBack</Link>
      </div>
      {
        !hasSentence ?
          <div className="d-flex justify-content-center select_spinner">
            <div className="spinner-border " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          : 
          hasSentence == 'hasSentence' ?
            showSentences()
            :
            <div className="bg-warning text-danger notSenctences">برای این کلمه جمله ای وجود ندارد</div>
      }



    </div>
  )
}
export default ViewSentence;