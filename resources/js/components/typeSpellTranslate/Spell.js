import { Link } from "react-router-dom";

const Spell = (props) => {
    const { words , bookLink , link,lesson_id,lesson } = props;
    const checkSpelling = (index) => {
        const getElementInput = document.getElementById(`spellInput${index}`);
        const getElementSpan = document.getElementById(`spellSpan${index}`);
        const getElementWord = document.getElementById(`spellWord${index}`);
        getElementSpan.style.color = '#858585';
        let word = getElementWord.innerHTML;
        let valInput = getElementInput.value;

        getElementSpan.innerHTML = valInput
        if (word.length == valInput.length) {
            getElementInput.value = ''; 
            if (word === valInput) {
                getElementSpan.style.color = 'green';

            } else {
                getElementSpan.style.color = 'red';
            }
        }
    }
    const spellContext = () => {
        let rowWord = !words ? '' : words.map((word, i) => {
            return <div className='spellRow' key={i}>
                <div id={`spellWord${i}`}>{word.word}</div>
                <div>{word.pronounceEn} </div>
                <div className='spellInput'>
                    <input type="text" onInput={() => checkSpelling(i)} id={`spellInput${i}`} />
                    <span id={`spellSpan${i}`}></span>
                </div>
                <div>{word.pronounceFa}</div>
                <div className='spellMean'>{word.mean}</div>
                <div><Link to={`/typeSpellTranslateSentence/${word.link}`}
        state={{'bookLink':bookLink, 'word_id': word.id, 'word': word.word,'link': link, 'lesson_id':lesson_id, 'lesson':lesson  }} className="pageA fontEn" >sentence</Link></div>
            </div>
        });
        return rowWord;
    }
    return (
        <div>{spellContext()}</div>
    )
}
export default Spell;