import useType from "../hooks/useType";

const Type = (props) => {
    const {words}=props;
    const { contextShow, startType, handleWord, message } = useType(words);

    return (
        <div className="TSTbodyType">
            <input type="text" id='inputChar' className='inputChar' onInput={handleWord} />

            <div className='TSTmessageType'>{(message) ? message : 'برای تست تایپ ، دکمه "شروع تایپ" را انتخاب کرده و به سرعت تایپ کنید '}</div>
            <div className='TSTstartType'>
                <button className='btnStartType' id='btnStartType' onClick={startType}>شروع تایپ</button>
            </div>

            <div className="TsTContextType" onClick={startType}>{contextShow}</div>

            <span className='errorChar' id='errorChar'></span>
            <div className='showMeanRow' id='showMean'></div>

        </div>
    )
}
export default Type;