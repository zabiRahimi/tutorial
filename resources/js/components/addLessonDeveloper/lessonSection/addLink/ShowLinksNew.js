import Swal from "sweetalert2";

const ShowLinksNew = (props) => {

    const { links, setLinks,  setOldLinks, setBookRefresh, setLessons, setLessonSecs } = props;

    const showLinksNew = () => {
        let val = links.map((link, i) => {

            return <section key={i} className="rowLink">

                <div className="RL_book">{link.book}</div>
                <div className="RL_lesson">{link.lesson}</div>
                <div className="RL_lessonSec">{link.lesson_section}</div>
                <div className="RL_del">

                    <button className="RL_delBtn" onClick={() => { deleteLinkNew(link.lesson_section_id, link.e); }}>حذف</button>

                </div>

            </section>

        });

        return val;
    }

    // حذف لینکهای انتخاب شده
    const deleteLinkNew = (lessonSec_id, divLessonSec) => {

        let index = findIndexLinkNew(lessonSec_id);

        links.splice(index, 1);

        setLinks(links => ([...links]));

        deleteClassLessonSec(divLessonSec);

    }

    const findIndexLinkNew = (lessonSec_id) => {

        let valFind = links.findIndex(items => {

            return items.lesson_section_id == lessonSec_id

        }
        )

        return valFind;

    }

    /**
     * هنگامی که در لیست لینک های جدید کاربر مبادرت به حذف یک یا چند لینک می کند
     * این متد وارد عمل شده و دو کار انجام می دهد
     * اول در لیست بخش ها کلاس بخشی که از لیست لینک ها حذف شده تغییر می دهد 
     * دوم با اضافه کردن یک کلاس به عنصر چکت باعث حذف علامت چک در همان عنصر می شود
     * @param {*} divLessonSec 
     */
    const deleteClassLessonSec = (divLessonSec) => {

        divLessonSec.classList.toggle('selectedLesson');

        divLessonSec.firstChild.firstChild.classList.toggle('notShowLink');
    }

    const saveLink = async () => {

        if (links.length) {

            toggleClassSpinnerEnd();

            for (let prop in links) {

                await axios.post('/saveLink', { lesson_section_id: links[prop].lesson_section_id, has_link_id: links[prop].has_link_id }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
                    .then(response => {

                        setOldLinks(oldLinks => ([...oldLinks, {

                            id: response.data.link.id,

                            lesson_section_id: links[prop].lesson_section_id,

                            has_link_id: links[prop].has_link_id,

                            lesson_section: {

                                lesson_section: links[prop].lesson_section,

                                lesson: {

                                    lesson: links[prop].lesson,

                                    book: {

                                        book: links[prop].book

                                    }
                                }
                            }
                        }]));

                        if ((links.length - 1) == prop) {

                            setBookRefresh(true);

                            setLessons([]);

                            setLessonSecs([]);

                            setLinks([]);

                            toggleClassSpinnerEnd();

                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'ثبت با موفقیت انجام شد',
                                showConfirmButton: false,
                                timer: 3000
                            })

                        }
                    })
            }
        }

        else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'هیچ لینکی انتخاب نشده است، ابتدا لینک را انتخاب کنید',
                showConfirmButton: false,
                timer: 5000,
            });
        }
    }

    const toggleClassSpinnerEnd = () => {

        document.getElementById('spinnerEnd').classList.toggle('notShowSPE');

    }
    return (

        <section className="bodyAddLinks">

            <div className="headListBooks">ثبت نهایی لینک های انتخاب شده</div>

            <section className="bodyEndAdd">

                <section className="bodyShowLinks">

                    <section className="headShowLikns">

                        <div className="HSL_book">کتاب</div>
                        <div className="HSL_lesson">درس</div>
                        <div className="HSL_lessonSec">بخش</div>
                        <div className="HSL_del">حذف لینک</div>

                    </section>

                    <section className="forSpinner" >

                        <section className="listLinks" >

                            {

                                !links.length ?

                                    <div className="notSelectBook">
                                        تا کنون لینکی انتخاب نشده است
                                    </div>
                                    :
                                    showLinksNew()

                            }

                        </section>

                    </section>

                </section>

                <div className="endAdd">

                    <button className="btnEndAdd" onClick={saveLink}>ثبت نهایی</button>

                    <div className="spinnerEnd notShowSPE" id="spinnerEnd">

                        <div className="d-flex justify-content-center select_spinner">
                            <div className="spinner-border  " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

        </section>
    )

}

export default ShowLinksNew;