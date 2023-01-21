import { useState, useEffect } from "react";

const ShowBooks = (props) => {

    const { setRunLesson, lessons, setLessons, setLoading, bookRefresh, setBookRefresh } = props;

    const [loadingBook, setLoadingBook] = useState(false);

    /**
    * چنانچه کتابی یا کتابهایی از قبل ایجاد شده باشد اطلاعات دریافتی از دیتابیس
    * در این هوک ذخیره می گردد
    */
    const [books, setBooks] = useState([]);

    useEffect(() => {

        getAllBooks();

    }, []);

    useEffect(() => {

        if (bookRefresh) {

            for (let key in books) {

                let e = document.getElementById(`book${key}`);
                e.classList.remove('selectedBook');
                e.firstChild.firstChild.classList.add('notShowLink');

            }

            setBookRefresh(false);
        }

    }, [bookRefresh]);

    async function getAllBooks() {

        setLoadingBook(true);

        await axios.get('/getAllBooks', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {

                setBooks(response.data.books);

                setLoadingBook(false);
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    /**
* این تابع دیتاهای مربوط به کتاب را که از دیتابیس دریافت شده است
* را برای نمایش در لیسیت کتابها آماده می‌کند
* @returns <li/> 
*/
    const showBooks = () => {
        let val = books.map((book, i) => {


            return <section key={i} id={`book${i}`}
                {...(book.lessons.length ?

                    {
                        className: 'book',

                        onClick: (e) => {

                            setClassBooks(e);
                            if (e.currentTarget.classList.contains('selectedBook')) {

                                getAllLessons(book.id);

                            }
                            else {
                                deleteLessons(book.id);
                            }

                        }
                    }
                    : {

                        className: 'bookNotLesson',
                        onMouseOver: e => showAlert(e),
                        onMouseOut: e => showAlert(e)

                    }

                )}
            >

                <div className="stateBook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-check notShowLink" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                    </svg>
                </div>

                <div className="nameBook">{book.book}</div>
                <div className="notShowLink">این کتاب فاقد درس است </div>

            </section >
        })

        return val;
    }

    const setClassBooks = (e) => {

        e.currentTarget.classList.toggle('selectedBook');
        e.currentTarget.firstChild.firstChild.classList.toggle('notShowLink');
    }

    /**
     * چنانچه کتابی هیچ درسی نداشته باشد، هنگامی که کاربر بر روی دکمه کتاب
     * موس را می برد با این متد متن این کتاب فاقد درس است به نمایش در می آید
     * همچنین اکشن آن کلیک را غیر فعال می کند
     * @param {*} e 
     */
    const showAlert = (e) => {

        e.currentTarget.children[1].classList.toggle('notShowLink');
        e.currentTarget.children[2].classList.toggle('notShowLink');
    }

    async function getAllLessons(book_id) {

        setLoading(loading => ({ ...loading, lesson: true }))

        await axios.get(`/getAllLessons/${book_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {

                lessons.push(response.data.lessons);
                setRunLesson(book_id);
                setLoading(loading => ({ ...loading, lesson: false }))

            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            });

    }

    // متدهای حذف دروس یک کتاب از لیست انتخاب درس

    const deleteLessons = (book_id) => {

        let index = findIndexLesson(book_id);

        lessons.splice(index, 1);

        setLessons(lessons => ([...lessons]));

    }

    const findIndexLesson = (book_id) => {

        let valFind = lessons.findIndex(items => {
            return items.find(item => item.book_id == book_id);
        }
        )

        return valFind;

    }

    return (
        <section className="bodyAddLinks">
            <div className="headListBooks">انتخاب کتاب</div>
            <section className="bodyListBooks" >

                {
                    loadingBook ?

                        <div className="d-flex justify-content-center select_spinner">
                            <div className="spinner-border " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        :

                        books.length ?
                            showBooks()
                            :
                            <div className="notBooks"> تا کنون کتابی ایجاد نشده است </div>
                }
            </section>

        </section>
    )

}

export default ShowBooks; 