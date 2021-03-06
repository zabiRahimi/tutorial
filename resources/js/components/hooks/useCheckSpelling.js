const useCheckSpelling = (words) => {

    const checkSpelling = (index) => {
        const getElementInput = document.getElementById(`spellInput${index}`);
        const getElementSpan = document.getElementById(`spellSpan${index}`);
        const getElementWord = document.getElementById(`spellWord${index}`);
        getElementSpan.style.color = '#c5c5c5';
        let word = getElementWord.innerHTML;
        let valInput = getElementInput.value;

        getElementSpan.innerHTML = valInput
        if (word.length == valInput.length) {
            getElementInput.value = '';
            if (word === valInput) {
                getElementSpan.style.color = '#97e597';

            } else {
                getElementSpan.style.color = '#f9a382';
            }
        }
    }

    const spellContext = words.map((spellWords, index) => {
        return <div className='spellRow' key={index}>

            <div id={`spellWord${index}`}>{spellWords[0]}</div>
            <div>{spellWords[2]}</div>
            <div className='spellInput'>
                <input type="text" onInput={() => checkSpelling(index)} id={`spellInput${index}`} />
                <span id={`spellSpan${index}`}></span>
            </div>
            <div>{spellWords[3]}</div>
            <div className='spellMean'>{spellWords[1]}</div>

        </div>
    });
    return { spellContext }
}

export default useCheckSpelling;