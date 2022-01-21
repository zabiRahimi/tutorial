import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';

// import "../css/TypeSpellTranslate.css";

//create lesson group snippet -> addGroupLesson
const ViewBooks = () => {
  useChengeDocumentTitle('type spell translate');
  const url = 'typeSpellTranslate';
  const [valBooks, setValBooks] = useState();
  /**
   * دریافت کتابها از دیتابیس
   */
  async function getBook() {
    await axios.get('/getBookType', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      .then(response => {
        setValBooks(response.data.books);
      })
      .catch(error => {
        alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
      })
  }

  useEffect(() => {
    getBook();
  }, []);

  /**
   * آماده سازی استایل کتابها برای درج در صفحه
   */
  const setBooks = () => {
    let val = valBooks.map((books, i) => {
      return <div className="divLessons" key={i}>
        <div className="title">
          <h4 className="titleH4 fontEn">
            {books.book}
          </h4>
        </div>
        <div className="body">
          {books.lesson_types ? showLink(books.bookLink, books.lesson_types) : ''}
        </div>
      </div>
    })
    return val;
  }

  const showLink = (bookLink, lessons) => {
    let val = lessons.map((lesson, k) => {
      return <Link to={`/typeSpellTranslate/${bookLink}/${lesson.lessonLink}`}
        state={{'bookLink': bookLink , 'lessonLink': lesson.lessonLink , 'lesson_id': lesson.id, 'lesson': lesson.lesson }} className="pageA fontEn" key={k}>{lesson.lesson}</Link>
    })
    return val;
  }
  return (
    <div >
      <div className="typeSpellTranslateTitle">
        <h3>تمرین کلمات انگلیسی و تایپ ده انگشتی</h3>
      </div>
      <div className="menuPage">
        <Link className='fontEn' to="/">home</Link>
        <Link to="/">راهنمای اضافه کردن درس</Link>
        <Link to="/addTypeSpellTranslate">ایجاد و ویرایش درس </Link>
      </div>
      {!valBooks ? 'loging' : setBooks()}

      {/* <div className="divLessons">
        <div className="title">
          <h4 className="titleH4 fontEn">
            504 words
          </h4>
        </div>
        <div className="body">
          <Link to={`${url}/w504_1`} className='pageA fontEn'>504_1</Link>
          <Link to={`${url}/w504_2`} className='pageA fontEn'>504_2</Link>
        </div>

      </div> */}
      {/* <div className="divLessons">
        <div className="title">
          <h4 className="titleH4 fontEn">
            laravel
          </h4>
        </div>
        <div className="body">
          <Link to={`${url}/api1`} className='pageA fontEn' >api1</Link>
          <Link to={`${url}/word1`} className='pageA fontEn' >word1</Link>
          <Link to={`${url}/word2`} className='pageA fontEn'>word2</Link>
          <Link to={`${url}/word3`} className='pageA fontEn'>word3</Link>
          <Link to={`${url}/word4`} className='pageA fontEn'>word4</Link>
          <Link to={`${url}/word5`} className='pageA fontEn'>word5</Link>
          <Link to={`${url}/migration`} className='pageA fontEn'>migration</Link>
          <Link to={`${url}/model`} className='pageA fontEn'>model</Link>
          <Link to={`${url}/public1`} className='pageA fontEn'>public1</Link>
          <Link to={`${url}/faker1`} className='pageA fontEn '>faker1</Link>
        </div>
      </div> */}
      {/* <div className="divLessons">
        <div className="title">
          <h4 className="titleH4 fontEn">
            universal
          </h4>
        </div>
        <div className="body">
          <Link to={`${url}/people`} className="pageA fontEn">people</Link>



        </div>

      </div> */}
      {/* <div className='divLessons'>
        <div className='title'>
          <h4 className='titleH4 fontEn'>
            barron's 1100 words
          </h4>
        </div>
        <div className='body'>
          <Link to={`${url}/w1100_1`} className='pageA fontEn'>w1100_1</Link>

        </div>
      </div> */}

      {/* //create lesson group snippet -> addGroupLesson */}
    </div>
  );
}

export default ViewBooks;