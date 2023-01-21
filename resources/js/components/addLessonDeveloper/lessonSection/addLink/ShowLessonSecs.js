import { useState, useEffect } from 'react';

const ShowLessonSecs = (props) => {

    const { runLessonSec,lessonSec, lessonSecs, loading, oldLinks, links, setLinks, setLoading } = props;

    const [styleLessonSec, setStyleLessonSec] = useState({

        forSpinnerLesssonSec: {

            height: 'auto'

        },
        spinnerAddLessonSec: {

            height: 'auto',
            top: 0

        }
    })

    useEffect(() => {

        let getHieght = document.getElementById('bodyAddLessonSecs').offsetHeight;
        setStyleLessonSec(styleLessonSec => ({

            ...styleLessonSec,

            forSpinnerLessonSec: {

                height: `${getHieght}px`
            },
            spinnerAddLessonSec: {

                height: `${getHieght}px`,
                top: `-${getHieght}px`

            }
        }));

    }, [runLessonSec]);

    const showLessonSecs = () => {

        let lessonSecId=lessonSec.id;

        let val = lessonSecs.map((lessonSec, i) => {

            return <section key={i} className="listLessons">

                <div className="itemNameBook">{lessonSec[0].lesson.book.book} --- {lessonSec[0].lesson.lesson}</div>

                {
                    lessonSec.map((subLesson, k) => {

                        return <section key={k}
                            {...(subLesson.id == lessonSecId ?
                                {
                                    className: "itemCurrentLesson",
                                    onMouseOver: e => showAlert(e),
                                    onMouseOut: e => showAlert(e)
                                } :
                                findOldLink(subLesson.id) == -1 ?
                                    {
                                        className: "itemLesson",
                                        onClick: (e) => {

                                            setClassLessons(e);

                                            if (e.currentTarget.classList.contains('selectedLesson')) {

                                                addLink(subLesson.id, subLesson.lesson.book.book, subLesson.lesson.lesson, subLesson.lesson_section, e.currentTarget);

                                            }
                                            else {

                                                deleteLinkFromLessonSec(subLesson.id);

                                            }
                                        }
                                    } :
                                    {
                                        className: "itemOldLinkLesson",
                                        onMouseOver: e => showAlertOldLink(e),
                                        onMouseOut: e => showAlertOldLink(e)
                                    }

                            )}
                        >

                            <div className="itemLessonState">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check notShowLink" viewBox="0 0 16 16">
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                </svg>
                            </div>
                            <div className="itemLessonName">{subLesson.lesson_section}--{subLesson.id}</div>
                            <div className="notShowLink">این بخش همین بخش جاری است</div>
                            <div className="notShowLink">این بخش قبلا لینک شده است</div>
                        </section>
                    })
                }

            </section>

        });

        return val;
    }

    const setClassLessons = (e) => {

        e.currentTarget.classList.toggle('selectedLesson');
        e.currentTarget.firstChild.firstChild.classList.toggle('notShowLink');

    }

    /**
 * چنانچه بحش درس همین بخش جاری باشد باشد، هنگامی که کاربر بر روی دکمه بخش
 * موس را می برد با این متد متن <<این بخش همین بخش جاری است>> به نمایش در می آید
 * همچنین اکشن آن کلیک را غیر فعال می کند
 * @param {*} e 
 */
    const showAlert = (e) => {

        e.currentTarget.children[1].classList.toggle('notShowLink');
        e.currentTarget.children[2].classList.toggle('notShowLink');
    }

    /**
     * بخش هایی که از قبل لینک شده اند را کنترل می کند
     * مانند متد بالا عمل می کند
     * @param {*} e 
     */
    const showAlertOldLink = (e) => {

        e.currentTarget.children[1].classList.toggle('notShowLink');
        e.currentTarget.children[3].classList.toggle('notShowLink');
    }

    const addLink = (lesson_section_id, book, lesson, lesson_section, e) => {

        setLoading(loading => ({ ...loading, linkNew: true }));

        let has_link_id=  lessonSec.id;

        setLinks(links => ([...links, { lesson_section_id, has_link_id, book, lesson, lesson_section, e }]));

        setLoading(loading => ({ ...loading, linkNew: false }));

    }

    // حذف لینکهای انتخاب شده

    const deleteLinkFromLessonSec = (lessonSec_id) => {

        let index = findINdexLinkNewL(lessonSec_id);

        links.splice(index, 1);

        setLinks(links => ([...links]));

    }

    const findINdexLinkNewL = (lessonSec_id) => {

        let valFind = links.findIndex(items => {

            return items.lesson_section_id == lessonSec_id

        }
        )
        return valFind;

    }

    const findOldLink = (lessonSec_id) => {

        let valFind = oldLinks.findIndex(item => item.lesson_section_id == lessonSec_id);
        return valFind;

    }

    return (
        <section className="bodyAddLinks">

            <div className="headListBooks">انتخاب بخش</div>

            <section className="forSpinner" style={styleLessonSec.forSpinnerLessonSec}>

                <section className="bodyAddBooks" id="bodyAddLessonSecs">

                    {

                        !lessonSecs.length ?

                            <div className="notSelectBook">
                                برای مشاهده بخش درس، یک یا چند درس را از لیست <span> "انتخاب درس" </span> انتخاب کنید
                            </div>
                            :
                            showLessonSecs()

                    }


                </section>
                {
                    loading.lessonSec &&

                    <section className="spinnerAddLesson" style={styleLessonSec.spinnerAddLessonSec}>

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

export default ShowLessonSecs;