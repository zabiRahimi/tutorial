import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';

const ViewBooks = () => {
  useChengeDocumentTitle('lessons developer');
  const url = 'lessonsDeveloper';

  const [valBooks, setValBooks] = useState();
  /**
   * دریافت کتابها از دیتابیس
   */
  async function getBook() {
    await axios.get('/getBook', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      .then(response => {
        setValBooks(response.data.book);
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
          {books.lessons ? showLink(books.bookLink, books.lessons) : 'r'}
        </div>
      </div>
    })
    return val;
  }

  const showLink = (bookLink, lessons) => {
    let val = lessons.map((lesson, k) => {
      return <Link to={`/lessons/${bookLink}/${lesson.lessonLink}`}
        state={{ 'lesson_id': lesson.id , 'lesson':lesson.lesson  }} className="pageA fontEn" key={k}>{lesson.lesson}</Link>
    })
    return val;
  }

  return (
    <div >
      <div className="lessonsDeveloperTitle">
        <h3>درسهای توسعه دهنده</h3>
      </div>
      <div className="menuPage">
        <Link to='/'>home</Link>
        <Link to={`${url}/guideAddLesson`}>راهنمای اضافه کردن درس</Link>
        <Link to="/addLessonDeveloper/book"  >ایجاد و ویرایش درس </Link>
      </div>
      {!valBooks ? 'loging' : setBooks()}
    </div>
  );
}

export default ViewBooks;