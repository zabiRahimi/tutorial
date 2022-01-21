import { render } from "react-dom";
// import React from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './Home';
import ViewBooks from './lessonsDeveloper/ViewBooks';
import AddLessonDeveloper from "./addLessonDeveloper/Index";
import ViewLesson from "./lessonsDeveloper/ViewLesson";

import ViewTypeBooks from './typeSpellTranslate/ViewTypeBooks';
import AddTypeSpellTarnslate from "./addTypeSpellTranslate/Index";
import ViewTypeSpellT from "./typeSpellTranslate/ViewTypeSpellT";
import ViewSentence from "./typeSpellTranslate/ViewSentence";

 
// for text editor CKEditor
import Tinymce from "./tinymce/Index"


import NotFound from './NotFound';





const rootElement = document.getElementById("app");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
 
      <Route path="addLessonDeveloper" element={<AddLessonDeveloper />} />

      <Route path="lessons" element={<ViewBooks />} />
      <Route path='/lessons/:book/:lesson' element={<ViewLesson/>} />

      <Route path="addTypeSpellTranslate" element={<AddTypeSpellTarnslate />} />


      <Route path="typeSpellTranslate" element={<ViewTypeBooks />} />
      <Route path='/typeSpellTranslate/:book/:lesson' element={<ViewTypeSpellT/>} />
      <Route path='/typeSpellTranslateSentence/:word' element={<ViewSentence/>} />

    

      <Route path="tinymce" element={<Tinymce />} />



      <Route path="*" element={<NotFound />} />

    </Routes>
  </BrowserRouter>
  ,
  rootElement
);

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/"  element={<Home />} >
//         {/* <Route path="startLaravel" element={<StartLaravel />} /> */}

//           <Route path="lessonsDeveloper"  element={<LessonsDeveloper />} >
//             {/* {RouteLessonsDeveloper} */}
//             <Route path="startLaravel" element={<StartLaravel />} />
//             {/* <Route path="startLaravel" element={<StartLaravel />} /> */}

//           </Route>
//         </Route>

//         {/* {RouteLessonsDeveloper} */}

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// export default App;

// if (document.getElementById('app')) {
//   ReactDOM.render(<App />, document.getElementById('app'));
// }
