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
import ViewLesson from "./lessonsDeveloper/ViewLesson";

import AddLessonDeveloper from "./addLessonDeveloper/Index";

import Book from "./addLessonDeveloper/book/Book"
import SelectBook from "./addLessonDeveloper/book/SelectBook";
import AddBook from "./addLessonDeveloper/book/AddBook";
import EditDelBook from "./addLessonDeveloper/book/EditDelBook";

import Lesson from "./addLessonDeveloper/lesson/Lesson";
import SelectLesson from "./addLessonDeveloper/lesson/SelectLesson";
import AddLesson from "./addLessonDeveloper/lesson/AddLesson";
import EditDelLesson from "./addLessonDeveloper/lesson/EditDelLesson";

import LessonSection from "./addLessonDeveloper/lessonSection/LessonSection";
import SelectLessonSec from "./addLessonDeveloper/lessonSection/SelectLessonSec";
import AddLessonSec from "./addLessonDeveloper/lessonSection/AddLessonSec";
import EditDelLessonSec from "./addLessonDeveloper/lessonSection/EditDelLessonSec";

import ViewTypeBooks from './typeSpellTranslate/ViewTypeBooks';
import ViewTypeSpellT from "./typeSpellTranslate/ViewTypeSpellT";
import ViewSentence from "./typeSpellTranslate/ViewSentence";

import AddTypeSpellTarnslate from "./addTypeSpellTranslate/Index";

import BookType from "./addTypeSpellTranslate/bookType/BookType";
import SelectBookType from "./addTypeSpellTranslate/bookType/SelectBookType";
import AddBookType from "./addTypeSpellTranslate/bookType/AddBookType";
import EditDelBookType from "./addTypeSpellTranslate/bookType/EditDelBookType";

import LessonType from "./addTypeSpellTranslate/lessonType/LessonType";
import SelectLessonType from "./addTypeSpellTranslate/lessonType/SelectLessonType";
import AddLessonType from "./addTypeSpellTranslate/lessonType/AddLessonType";
import EditDelLessonType from "./addTypeSpellTranslate/lessonType/EditDelLessonType";


import WordType from "./addTypeSpellTranslate/wordType/WordType";
import SelectWordType from "./addTypeSpellTranslate/wordType/SelectWordType";
import AddWordType from "./addTypeSpellTranslate/wordType/AddWordType";
import EditDelWordType from "./addTypeSpellTranslate/wordType/EditDelWordType";


import SentenceType from './addTypeSpellTranslate/sentenceType/SentenceType';
import SelectSentenceType from "./addTypeSpellTranslate/sentenceType/SelectSentenceType";
import AddSentenceType from "./addTypeSpellTranslate/sentenceType/AddSentenceType";
import EditDelSentenceType from "./addTypeSpellTranslate/sentenceType/EditDelSentenceType";



// for rich editor tinymce
import Tinymce from "./tinymce/Index";

// for rich editor tiptap
import Tiptap from "./tiptap/Tiptap";
import AddLessonEditor from "./tiptap/AddLessonEditor";


import NotFound from './NotFound';






const rootElement = document.getElementById("app");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="addLessonDeveloper" element={<AddLessonDeveloper />} >
        <Route path="book" element={<Book />}>
          {/* <Route index element={<SelectBook />} /> */}
          <Route path="select" element={<SelectBook />} />
          <Route path="add" element={<AddBook />} />
          <Route path="edit" element={<EditDelBook />} />

        </Route>
        <Route path="lesson" element={<Lesson />}>
          {/* <Route index element={<SelectLesson />} /> */}
          <Route path="select" element={<SelectLesson />} />
          <Route path="add" element={<AddLesson />} />
          <Route path="edit" element={<EditDelLesson />} />
        </Route>
        <Route path="lessonSec" element={<LessonSection />}>
          <Route path="select" element={<SelectLessonSec />} />
          <Route path="add" element={<AddLessonSec />} />
          <Route path="edit" element={<EditDelLessonSec />} />
        </Route>
      </Route>

      <Route path="lessons" element={<ViewBooks />} />
      <Route path='/lessons/:book/:lesson' element={<ViewLesson />} />

      <Route path="addTypeSpellTranslate" element={<AddTypeSpellTarnslate />} >
        <Route path="bookType" element={<BookType />}>
          <Route path="select" element={<SelectBookType />} />
          <Route path="add" element={<AddBookType />} />
          <Route path="edit" element={<EditDelBookType />} />
        </Route>

        <Route path="lessonType" element={<LessonType />}>
          <Route path="select" element={<SelectLessonType />} />
          <Route path="add" element={<AddLessonType />} />
          <Route path="edit" element={<EditDelLessonType />} />
        </Route>

        <Route path="wordType" element={<WordType />}>
          <Route path="select" element={<SelectWordType />} />
          <Route path="add" element={<AddWordType />} />
          <Route path="edit" element={<EditDelWordType />} />
        </Route>

        <Route path="sentenceType" element={<SentenceType />}>
          <Route path="select" element={<SelectSentenceType />} />
          <Route path="add" element={<AddSentenceType />} />
          <Route path="edit" element={<EditDelSentenceType />} />
        </Route>

      </Route>


      <Route path="typeSpellTranslate" element={<ViewTypeBooks />} />
      <Route path='/typeSpellTranslate/:book/:lesson' element={<ViewTypeSpellT />} />
      <Route path='/typeSpellTranslateSentence/:word' element={<ViewSentence />} />



      <Route path="tinymce" element={<Tinymce />} />

      <Route path="tiptap" element={<Tiptap />} />

      <Route path="addLessonEditor" element={<AddLessonEditor />} />



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
