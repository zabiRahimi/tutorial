
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';
import useToChunkLesson from "../hooks/useToChunkLesson";

const ViewLesson = () => {
   let params = useParams();

   const { state } = useLocation();

   useChengeDocumentTitle(state.lesson);

   const { toChunkLesson } = useToChunkLesson();

   const [valLessonSection, setValLessonSection] = useState('');

   const [hasLessonSec, setHaslessonSec] = useState(false);


   /**
    * دریافت متن درس از دیتابیس
    */
   async function getLessonSection() {
      await axios.get(`/getAllLessonSections/${state.lesson_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
         .then(response => {

            if (response.data.lessonSections.length != 0) {

               setValLessonSection(response.data.lessonSections);
               setHaslessonSec('hasLessonSec');

            } else {

               setHaslessonSec('notHas');
            }
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
         return <a className="" key={i} onClick={() => toChunkLesson(`chunk${i}`)}>{val.lesson_section}</a>

      })
      return links
   }

   const setDes = () => {
      let desL = valLessonSection.map((val, i) => {
         return <div className="chunkLesson" id={`chunk${i}`} key={i} >
            <div className="titleLesson fa " ># {val.lesson_section} </div>
            <div className="articleLesson" dangerouslySetInnerHTML={{ __html: val.des }}>

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
            <Link to='/addLessonDeveloper/lessonSec' state={{book_id:state.book_id , book:state.book , lesson_id:state.lesson_id, lesson:state.lesson}} >ایجاد بخش جدید</Link>
         </div>

         {!hasLessonSec ?
            <div className="d-flex justify-content-center select_spinner">
               <div className="spinner-border " role="status">
                  <span className="visually-hidden">Loading...</span>
               </div>
            </div>
            : hasLessonSec == 'hasLessonSec' ?
               <>
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
               </>
               :
               <div className="alert alert-danger notBookAlert">تا کنون هیچ متنی برای این درس نوشته نشده است.</div>
         }
         {/* <!-- سر فصل درس title lesson --> */}



         {/* {!valLessonSection ? 'loging' :} */}
         {/* <div className="bodyLesson" id="bodyLesson" dangerouslySetInnerHTML={!valLessonSection ? {__html:'loging'} : {__html:ReactDOMServer.renderToStaticMarkup(setDes)}}></div> */}
         {/* {!valLessonSection ? 'loging' : setDes()} */}

         {/* </div> */}


      </div>//end document .lessonSinglePage
   );
}

export default ViewLesson;