import { useState, useEffect } from 'react';

const ShowLessons = (props) => {

    const { runLesson, lessons, setRunLessonSec, lessonSecs, setLessonSecs, loading, setLoading } = props

    const [styleLesson, setStyleLesson] = useState({

        forSpinner: {
            height: 'auto'

        },
        spinnerAddLesson: {
            height: 'auto',
            top: 0

        }
    })

    /**
    *  فقط برای ست کردن استایل به تگها استفاده می شود
    * این هوک جدا گانه استفاده شده است برای اینکه فقط محتوایت خودش 
    * رفرش شود
    */
    useEffect(() => {

        let getHieght = document.getElementById('bodyAddBooks').offsetHeight;

        setStyleLesson(styleLesson => ({

            ...styleLesson,

            forSpinner: {

                height: `${getHieght}px`

            },

            spinnerAddLesson: {

                height: `${getHieght}px`,
                top: `-${getHieght}px`

            }
        }));

    }, [runLesson]);

    const showLessons = () => {

        let val = lessons.map((lesson, i) => {

            return <section key={i} className="listLessons">

                <div className="itemNameBook">{lesson[0].book.book}</div>

                {

                    lesson.map((subLesson, k) => {

                        return <section key={k}

                            {...(subLesson.lesson_sections.length ? {

                                className: "itemLesson",

                                onClick: (e) => {

                                    setClassLessons(e);

                                    if (e.currentTarget.classList.contains('selectedLesson')) {

                                        getLessonSecs(subLesson.id);
                                    }
                                    else {
                                        deleteLessonSecs(subLesson.id);
                                    }

                                }
                            } :
                                {

                                    className: 'itemLessonNotLessonSec',
                                    onMouseOver: e => showAlert(e),
                                    onMouseOut: e => showAlert(e)

                                }

                            )}
                        >

                            <div className="itemLessonState">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check notShowLink" viewBox="0 0 16 16">
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                </svg>
                            </div>

                            <div className="itemLessonName">{subLesson.lesson}</div>
                            <div className="notShowLink">این درس فاقد بخش است</div>

                        </section>

                    })
                }

            </section>
        })

        return val;
    }


    const setClassLessons = (e) => {

        e.currentTarget.classList.toggle('selectedLesson');
        e.currentTarget.firstChild.firstChild.classList.toggle('notShowLink');

    }

    /**
 * چنانچه کتابی هیچ درسی نداشته باشد، هنگامی که کاربر بر روی دکمه کتاب
 * موس را می برد با این متد متن <<این کتاب فاقد درس است>> به نمایش در می آید
 * همچنین اکشن آن کلیک را غیر فعال می کند
 * @param {*} e 
 */
    const showAlert = (e) => {

        e.currentTarget.children[1].classList.toggle('notShowLink');
        e.currentTarget.children[2].classList.toggle('notShowLink');
    }

    const getLessonSecs = async (lesson_id) => {

        setLoading(loading => ({ ...loading, lessonSec: true }));

        await axios.get(`/getAllLessonSections/${lesson_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(async response => {

                lessonSecs.push(await response.data.lessonSections);

                setRunLessonSec(lesson_id);

                setLoading(loading => ({ ...loading, lessonSec: false }));

            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    const deleteLessonSecs = (lesson_id) => {

        let index = findIndexLessonSec(lesson_id);

        lessonSecs.splice(index, 1);

        setLessonSecs(lessonSecs => ([...lessonSecs]));

    }

    const findIndexLessonSec = (lesson_id) => {

        let valFind = lessonSecs.findIndex(items => {

            return items.find(item => item.lesson_id == lesson_id);

        }
        );

        return valFind;

    }

    return (
        <section className="bodyAddLinks" >
            <div className="headListBooks">انتخاب درس</div>
            <section className="forSpinner" style={styleLesson.forSpinner}>

                <section className="bodyAddBooks" id="bodyAddBooks">

                    {

                        !lessons.length ?

                            <div className="notSelectBook">
                                برای مشاهده دروس کتاب، یک یا چند کتاب را از لیست <span> "انتخاب کتاب" </span> انتخاب کنید
                            </div>
                            :
                            showLessons()

                    }


                </section>
                {
                    loading.lesson &&

                    <section className="spinnerAddLesson" id="spinnerAddLesson" style={styleLesson.spinnerAddLesson}>

                        <div className="d-flex justify-content-center select_spinner" >
                            <div className="spinner-border " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>

                    </section>
                }

            </section>

        </section>
    )

}

export default ShowLessons;