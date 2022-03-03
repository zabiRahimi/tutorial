import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useChengeDocumentTitle from '../hooks/useChengeDocumentTitle';

const ViewBooks = () => {
  useChengeDocumentTitle('lessons developer');

  const [valBooks, setValBooks] = useState();

  const [hasBook, setHasBook] = useState(false);

  /**
   * دریافت کتابها از دیتابیس
   */
  async function getBooks() {
    await axios.get('/getAllBooks', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      .then(response => {

        if (response.data.books.length) {

          setValBooks(response.data.books);
          setHasBook('hasBook');

        } else {
          setHasBook('notBook');
        }

      })
      .catch(error => {
        alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
      })
  }

  useEffect(() => {
    getBooks();
  }, [hasBook]);

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
          {books.lessons.length != 0 ? showLink(books.id, books.book, books.link, books.lessons) : <div className="alert alert-danger notBookAlert">تا کنون هیچ فصلی برای این کتاب ایجاد نشده است.</div>}
        </div>
      </div>
    })
    return val;
  }

  const showLink = (book_id, book, bookLink, lessons) => {
    let val = lessons.map((lesson, k) => {
      return <Link to={`/lessons/${bookLink}/${lesson.link}`}
        state={{ book_id, book, lesson_id: lesson.id, lesson: lesson.lesson }} className="pageA fontEn" key={k}>{lesson.lesson}</Link>
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
        <Link to="lessonsDeveloper/guideAddLesson">راهنمای اضافه کردن درس</Link>
        <Link to="/addLessonDeveloper/book"  >ایجاد و ویرایش درس </Link>
      </div>
      {
        !hasBook ?
          <div className="d-flex justify-content-center select_spinner">
            <div className="spinner-border " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          : hasBook == 'hasBook' ?
            setBooks()
            :
            <div className="alert alert-danger notBookAlert">تا کنون هیچ درسی ایجاد نشده است. برای ایجاد درس وارد صفحه ایجاد و ویرایش درس شوید.</div>
      }
    </div>
  );
}

export default ViewBooks;