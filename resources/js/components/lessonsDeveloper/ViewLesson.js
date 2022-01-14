
import axios from "axios";
import { defaultsDeep } from "lodash";
import { useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server'
import {
   useParams,
   useLocation,
   Link
} from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';
import useToChunkLesson from "../hooks/useToChunkLesson";


const ViewLesson = () => {
   let params = useParams();
   const { state } = useLocation()
   useChengeDocumentTitle(state.lesson);
   const { toChunkLesson } = useToChunkLesson();
   const [valLessonSection, setValLessonSection] = useState('');
   /**
    * دریافت متن درس از دیتابیس
    */
   async function getLessonSection() {
      await axios.get(`/getLessonSection/${state.lesson_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
         .then(response => {
            setValLessonSection(response.data.lessonSection);
         })
         .catch(error => {
            alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
         })
   }

   useEffect(() => {
      getLessonSection();
   }, []);

   /**
    * لینک های درس را اضافه می‌کند
    */
   const setLink = () => {
      let links = valLessonSection.map((val, i) => {
         return <a key={i} onClick={() => toChunkLesson(`chunk${i}`)}>{val.lesson_section}</a>

      })
      return links
   }

   const setDes = () => {
      let desL = valLessonSection.map((val, i) => {
         return  <div className="chunkLesson" id={`chunk${i}`} key={i} >
         <div className="titleLesson fa " ># {val.lesson_section} </div>
         <div className="articleLesson" dangerouslySetInnerHTML={ {__html:val.des}}>
           
         </div>
      </div>
      });
      return desL;
   }
   // const setDes = [
   //     valLessonSection.map((val, i) => {
   //         <xmp key={i}><div className="chunkLesson" id={`chunk${i}`}  >
   //       <div className="titleLesson fa " ># {val.lesson_section} </div>
   //       <div className="articleLesson">
   //          {val.des}
   //       </div>
   //    </div></xmp>
   //     })]
      // return desL;
      // return {__html:`${desL}`}
   // }

   return (
      <div className="lessonSinglePage " id="lessonSinglePage">
         <div className="typeSpellTranslateTitle fontEn">
            <h3>{state.lesson}</h3>
         </div>
         <div className="menuPage">
            <Link to='/' >home</Link>
            <Link to='/lessons' >go back</Link>
         </div>

         {/* <!-- سر فصل درس title lesson --> */}
         <div className="divTitleLesson">
            <div className="titleLesson"># titles lesson</div>

            {/* <!-- سرفصل ها از فایل مربوط به درس توسط برنامه خوانده شده و به این دایو اضافه می شود --> */}
            <div className="listTitleLesson" id="listTitleLesson">
               {!valLessonSection ? 'loging' : setLink()}
            </div>
         </div>
         <div className="bodyLesson" id="bodyLesson" >
            {!valLessonSection ? 'loging' : setDes()}

         </div>


         {/* {!valLessonSection ? 'loging' :} */}
         {/* <div className="bodyLesson" id="bodyLesson" dangerouslySetInnerHTML={!valLessonSection ? {__html:'loging'} : {__html:ReactDOMServer.renderToStaticMarkup(setDes)}}></div> */}
            {/* {!valLessonSection ? 'loging' : setDes()} */}

         {/* </div> */}


      </div>//end document .lessonSinglePage
   );
}

export default ViewLesson;