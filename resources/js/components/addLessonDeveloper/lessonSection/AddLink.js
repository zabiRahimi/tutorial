import { useRef, useState, useEffect } from "react";
import EditorALD from "../../tiptap/AddLessonEditor";
import { useOutletContext, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddLink = () => {

    // در این فایل ، اضافه کردن لینک به بخش، ویرایش، خذف و نمایش آنها انجام می شود

    const navigate = useNavigate();


    /**
     * دریافت آی دی کتاب، آی دی درس، آی دی بخش به صورت زیر
     * index.book_id  from components/addLessonDeveloper/index.js
     * index.lesson_id from ... 
     * index.lessonlessonSec_id from ... 
     * lessonSec.id from components/addLessonDeveloper/lessonSection/lessonSection.js 
     * 
     * همچنین دریافت اطلاعات بخش های این درس از دیتابیس که در ثابت زیر ذخیره شده است
     * valLessonSecs from components/addLessonDeveloper/lessonSection/lessonSection.js  from  getLessonSecs()
     */
    const { index, lessonSec, valLessonSecs } = useOutletContext();

    /**
     * برای چک کردن لینک های از قبل ایجاد شده
     * همچنان برای کنترل نماد انتظار در قسمت لینک های ایجاد شده
     * این هوک در متد زیر مقدار دهی می شود
     * getHasLinks()
     * 
     */
    const [hasLinks, setHasLinks] = useState('');

    /**
     * با این هوک چک می کنیم که از قبل کتابی ایجاد شده است یا خیر
     * همچنان برای کنترل نماد انتظار در قسمت انتخاب کتاب
     * این هوک در متد زیر مقدار دهی می شود
     * getAllBooks()
     */
    const [hasBooks, setHasBooks] = useState('');

    /**
     * چنانچه کتابی یا کتابهایی از قبل ایجاد شده باشد اطلاعات دریافتی از دیتابیس
     * در این هوک ذخیره می گردد
     */
    const [books, setBooks] = useState([]);

    const [hasLessons, setHasLessons] = useState('');

    const [lessons, setLessons] = useState([]);

    const [lessonSecs, setLessonSecs] = useState([]);

    /**
     * کنترل کردن نماد انتظار
     */
    const [loading, setLoading] = useState(false);

    /**
     * برای اعمال استایل به عناصر مورد نظر 
     * مورد استفاده برای نماد انتظار
     */
    const [style, setStyle] = useState({});

    // const tiptapFun = useRef(),// tiny فراخوانی متد از کاپوننت 
    //     form = useRef(null),
    //     notify = useRef(null),
    //     lessonSecError = useRef(null),
    //     desError = useRef(null);

    // const [input, setInput] = useState({
    //     updateOrdering: false,
    //     ordering: lessonSec.ordering,
    //     lesson_section: lessonSec.lesson_section,
    //     des: lessonSec.des
    // })

    /**
     * هنگام ورود به این صفحه توسط این هوک 
     * متد زیر فراخوانی می شود
     * checkHasLessonSecId();
     */
    useEffect(() => {

        // checkHasLessonSecId();
        // getHasLinks(index.book_id, index.lesson_id, lessonSec.id);//موقتا و برای جلوگیری از رفتن به صفحات دیگر هنگام رفرش کامنت شده است
        getHasLinks(7, 10, 26);//موقتا به صورت دستی مقدار دهی شده، باید این خط پس از اتمام کار حذف شود
        getAllBooks();
    }, []);

    /**
     *  فقط برای ست کردن استایل به تگها استفاده می شود
     * این هوک جدا گانه استفاده شده است برای اینکه فقط محتوایت خودش 
     * رفرش شود
     */
    useEffect(() => {

        let getHieght = document.getElementById('bodyAddBooks').offsetHeight;
        setStyle({
            forSpinner: {
                height: `${getHieght}px`

            },
            spinnerAddLesson: {
                height: `${getHieght}px`,
                top: `-${getHieght}px`

            }
        });

    }, [hasLessons])

    /**
    * این متد چک می‌کند که کاربر یک بخشی را
    *  برای ویرایش و حذف انتخاب یا ایجاد کرده باشد
    */
    // const checkHasLessonSecId = () => {
    //     if (lessonSec.id) { } else {
    //         Swal.fire({
    //             position: 'center',
    //             icon: 'warning',
    //             title: 'هیچ بخشی انتخاب و یا ایجاد نشده است',
    //             showConfirmButton: false,
    //             timer: 3000,
    //         }).then(() => {
    //             valLessonSecs.length == 0 ?
    //                 //چنانچه هیچ فصلی از قبل ایجاد نشده باشد کاربر به این مسیر هدایت می‌شود
    //                 navigate(`/addLessonDeveloper/lessonSec/add`) :
    //                 //چنانچه فصلی وجود داشته باشد کاربر به این مسیر هدایت می‌شود
    //                 navigate(`/addLessonDeveloper/lessonSec/select`);
    //         });
    //     }
    // } //   ------------------***** موقتا کامنت شده

    const getHasLinks = (book_id, lesson_id, lessonSec_id) => {


        axios.get(`/getHasLinks/${book_id}/${lesson_id}/${lessonSec_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.allLinks.length ?
                    (
                        setShowLinks(response.data.allLinks),
                        setHasLinks('has a link')
                    )
                    :
                    setHasLinks('has not a link');
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })

    }

    async function getAllBooks() {
        await axios.get('/getAllBooks', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                response.data.books.length ?
                    (setBooks(response.data.books), setHasBooks('has a books')) :
                    setCheck('nas not a books');
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
            return <section key={i} className="book" onClick={(e) => {
                setClassBooks(e);
                if (e.currentTarget.classList.contains('selectedBook')) {

                    getAllLessons(book.id, book.book);
                }
                else {
                    deleteLessons(book.book);
                }
            }}>
                <div className="stateBook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-check notShow" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                    </svg>
                </div>
                <div className="nameBook">{book.book}</div>
            </section>
        })
        return val;
    }

    async function getAllLessons(book_id, book_name) {
        await setLoading(true)
        await axios.get(`/getAllLessons/${book_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                let val = response.data.lessons;
                val.push({ book_name });
                lessons.push(val);
                setLessons(lessons);
                setHasLessons(`has a lessons in ${book_name}`);
                setLoading(false)
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    const setClassBooks = (e) => {
        e.currentTarget.classList.toggle('selectedBook');
        let childElement = e.currentTarget.firstChild.firstChild.classList.toggle('notShow');
    }

    // متدهای حذف دروس یک کتاب از لیست انتخاب درس

    const deleteLessons = async (book_name) => {

        let arrLesson = await findeArrLesson(book_name);
        let index = await getIndexArr(arrLesson);
        lessons.splice(index, 1);

        setLessons(lessons);
        setHasLessons(`delete ${book_name}`);//فقط برای تغییر محتویات صفحه

    }

    const findeArrLesson = (book_name) => {
        let valFind = lessons.find(items => {
            return items.find(item => item.book_name == book_name);
        }
        )
        return valFind;

    }

    const getIndexArr = (arrLesson) => {

        let valIndex = lessons.indexOf(arrLesson);
        return valIndex;

    }

    const showLessons = () => {

        let val = lessons.map((lesson, i) => {

            return <section key={i} className="listLessons">

                <div className="itemNameBook">{lesson.at(-1).book_name}</div>

                {
                    lesson.length == 1 ? (
                        <section className="noItemLesson">
                            <div > برای این کتاب تا کنون درسی ایجاد نشده است</div>

                        </section>

                    ) :
                        lesson.map((subLesson, k) => {

                            if ((lesson.length - 1) == k) { return null }

                            return <section key={k} className="itemLesson">

                                <div className="itemLessonState">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check notShow" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                    </svg>
                                </div>
                                <div className="itemLessonName">{subLesson.lesson}</div>
                            </section>


                        })
                }


            </section>
        })

        return val;
    }



    // const handleEditLessonSection = (e) => {
    //     e.preventDefault();
    //     axios.put(`/editLessonSection/${lessonSec.id}`, { 'lesson_id': index.lesson_id, ...input }, { headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json; charset=utf-8' } })
    //         .then(response => {

    //             deleteAlert();

    //             // توسط این دستور مقدارهای ویرایش شده جایگزین می‌شود
    //             let newLessonSecs = valLessonSecs.map((valLessonSec) => {
    //                 if (valLessonSec.id == lessonSec.id) return Object.assign({}, valLessonSec, { ...input });
    //                 return valLessonSec;
    //             });

    //             setValLessonSecs(newLessonSecs);

    //             setLessonSec(per => ({ ...per, ...input }));

    //             if (input.updateOrdering) { setUpdateOrdirng(lessonSec.id, input.ordering); }

    //             notify.current.innerHTML = `<div class='success'>بخش با موفقیت ویرایش شد.</div>`
    //             notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });

    //         })
    //         .catch(error => {
    //             notify.current.innerHTML = '';

    //             if (error.response.status == 422) {
    //                 const elementError = Object.keys(error.response.data.errors)[0];
    //                 let divError;
    //                 switch (elementError) {
    //                     case 'lesson_section':
    //                         divError = lessonSecError.current;
    //                         break;
    //                     case 'des':
    //                         divError = desError.current;
    //                         break;
    //                     default: divError = notify.current;
    //                 }
    //                 divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
    //                 divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
    //             }
    //             else {
    //                 const errorMessage = 'خطایی رخ داده است، دیتابیس را چک کرده و دوباره تلاش کنید .'
    //                 notify.current.innerHTML = `<div class="error">${errorMessage}</div>`
    //                 notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
    //             }
    //         })
    // }

    // const deleteAlert = () => {
    //     notify.current.innerHTML = '';
    //     lessonSecError.current.innerHTML = '';
    //     desError.current.innerHTML = '';
    // }

    /**
   * مقدار هر این‌پوت فرم را دخیره می‌کند
   * هنگامی که دکمه ثبت فشرده شد این مقادیر به کنترلر فرستاده می‌شود
   * @param {*} e 
   * @param {*} nameElement 
   */
    // const handleSaveValInput = (e, input) => {
    //     let { value } = e.target;
    //     setInput(prev => ({ ...prev, [input]: value }));
    // }

    // function deleteLessonSec(lessonSecId) {
    //     Swal.fire({
    //         title: 'آیا مایل به حذف این بخش هستید؟',
    //         color: '#aa4f0f',
    //         showCancelButton: true,
    //         confirmButtonText: 'delete',
    //         confirmButtonColor: '#ffd600',
    //         preConfirm: () => {
    //             return axios.delete(`/deleteLessonSection/${lessonSecId}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
    //                 .then(() => {

    //                     const index = valLessonSecs.findIndex(({ id }) => id === lessonSecId);

    //                     valLessonSecs.splice(index, 1);

    //                     setValLessonSecs(valLessonSecs);

    //                     setLessonSec({ id: '', lesson_section: '', des: '' });

    //                     Swal.fire({
    //                         position: 'center',
    //                         icon: 'success',
    //                         title: 'بخش با موفقیت حذف شد',
    //                         showConfirmButton: false,
    //                         timer: 4000
    //                     }).then(() => {
    //                         valLessonSecs.length == 0 ? navigate(`/addLessonDeveloper/lessonSec/add`) :
    //                             navigate(`/addLessonDeveloper/lessonSec/select`);
    //                     })
    //                 })
    //                 .catch(error => {
    //                     Swal.fire({
    //                         position: 'center',
    //                         icon: 'warning',
    //                         title: 'بخش حذف نشد !!',
    //                         showConfirmButton: false,
    //                         timer: 3000
    //                     })
    //                 })
    //         }
    //     })

    // }

    // const handleSetOrdering = (ordering) => {
    //     ordering++;
    //     setInput(prev => ({ ...prev, updateOrdering: true, ordering }));
    // }

    // هنگامی که اوردرینگ تغییر کرد لازم است که مقدار اوردینگها نیز آپدیت شود
    //این متد این کار را انجام می‌دهد
    //لازم به ذکر است که این متد فقط آرایه‌ی vlaLessonSecs را آپدیت می‌کند، نه مقادیر دیتا بیس را
    // const setUpdateOrdirng = (id, ordering) => {
    //     valLessonSecs.map((lessonSecs, i) => {
    //         if (lessonSecs.ordering < ordering || lessonSecs.id == id) { }
    //         else {
    //             let objIndex = valLessonSecs.findIndex((obj => obj.id == lessonSecs.id));
    //             valLessonSecs[objIndex].ordering = lessonSecs.ordering + 1;
    //         }
    //     });
    // }

    // const setLessonSecs = () => {
    //     let val = valLessonSecs.map((lessonSecs, i) => {
    //         return <li key={i} onClick={() => handleSetOrdering(lessonSecs.ordering)}>{lessonSecs.lesson_section}</li>
    //     })
    //     return val;
    // }


    // const handleChangeOverflowUl = (e) => {
    //     const parent = e.target.parentNode;
    //     const child = parent.querySelector('ul');
    //     const height = child.offsetHeight;
    //     child.style.overflow = height < 230 ? 'visible' : 'auto';
    // }

    return (

        <section className="SAED_content">
            <section className="allBodyLink">
                <section className="showLinks">
                    <div className="titleShowLinks">لینک های ایجاد شده</div>
                    <section className="bodyShowLinks">
                        <section className="headShowLikns">
                            <div className="HSL_book">کتاب</div>
                            <div className="HSL_lesson">درس</div>
                            <div className="HSL_lessonSec">بخش</div>
                            <div className="HSL_del">حذف لینک</div>
                        </section>


                        <section className="listLinks">

                            {
                                !hasLinks ?

                                    <div className="d-flex justify-content-center select_spinner">
                                        <div className="spinner-border text-light " role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>

                                    :

                                    hasLinks == "has a link" ? <>has a link</>
                                        :
                                        <>has not a link</>



                            }

                        </section>
                    </section>

                </section>

                <section className="addLink">
                    <div className="titleShowLinks">ایجاد لینک</div>
                    <section className="bodyAddLinks">
                        <div className="headListBooks">انتخاب کتاب</div>
                        <section className="bodyListBooks">

                            {
                                !hasBooks ?

                                    <div className="d-flex justify-content-center select_spinner">
                                        <div className="spinner-border text-light " role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>

                                    :

                                    hasBooks == "has a books" ?
                                        showBooks()
                                        :
                                        <div className="notBooks"> تا کنون کتابی ایجاد نشده است </div>

                            }
                        </section>

                    </section>

                    <section className="bodyAddLinks" >
                        <div className="headListBooks">انتخاب درس</div>
                        <section className="forSpinner" style={style.forSpinner}>

                            <section className="bodyAddBooks" id="bodyAddBooks">

                                {
                                    // !hasLessons ?
                                    !lessons.length ?

                                        <div className="notSelectBook">
                                            برای مشاهده دروس کتاب، یک یا چند کتاب را از لیست <span> "انتخاب کتاب" </span> انتخاب کنید
                                        </div>
                                        :
                                        showLessons()

                                }


                            </section>
                            {
                                loading &&

                                <section className="spinnerAddLesson" id="spinnerAddLesson" style={style.spinnerAddLesson}>

                                    <div className="d-flex justify-content-center select_spinner" >
                                        <div className="spinner-border " role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>

                                </section>
                            }

                        </section>

                    </section>

                    <section className="bodyAddLinks">
                        <div className="headListBooks">انتخاب بخش</div>
                        <section className="bodyAddBooks">
                            <section className="listLessons">
                                <div className="itemNameBook">php php php html javascript css class object overflow</div>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">متغیر</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">آریه</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">object</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">class</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">oprator</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">const</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">type</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">function</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">arow function</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">extention</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">length</div>
                                </section>

                            </section>


                            <section className="listLessons">
                                <div className="itemNameBook">php php php html javascript css class object overflow</div>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">متغیر</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">آریه</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">object</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">class</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">oprator</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">const</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">type</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">function</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">arow function</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">extention</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">length</div>
                                </section>

                            </section>
                            <section className="listLessons">
                                <div className="itemNameBook">php php php html javascript css class object overflow</div>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">متغیر</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">آریه</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">object</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">class</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">oprator</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">const</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">type</div>
                                </section>
                            </section>

                            <section className="listLessons">
                                <div className="itemNameBook">php php php html javascript css class object overflow</div>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">متغیر</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">آریه</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">object</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">class</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">oprator</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">const</div>
                                </section>
                                <section className="itemLesson">
                                    <div className="itemLessonState"></div>
                                    <div className="itemLessonName">type</div>
                                </section>
                            </section>
                        </section>

                    </section>


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
                                <section className="listLinks">
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                    <section className="rowLink">
                                        <div className="RL_book">php</div>
                                        <div className="RL_lesson">متغیرها</div>
                                        <div className="RL_lessonSec">معرفی متغیر در php</div>
                                        <div className="RL_del">
                                            <button className="RL_delBtn">حذف</button>
                                        </div>
                                    </section>
                                </section>
                            </section>

                            <div className="endAdd">
                                <button className="btnEndAdd">ثبت نهایی</button>
                            </div>
                        </section>

                    </section>
                </section>

                {/* <div className="showListLink">
                <div className="titleListLink">لینک های ایجاد شده</div>
                <div className="bodyListLink">
                    <div className="headListLink">
                        <div className="Hlink_nameBook">کتاب</div>
                        <div className="Hlink_nameLesson">درس</div>
                        <div className="Hlink_nameLessonSection">بخش درس</div>
                        <div className="Hlikn_delLink">حذف لینک</div>
                    </div>
                    <div className="listLink">
                        <div className="link_nameBook">php</div>
                        <div className="link_nameLesson">آرایه ها</div>
                        <div className="link_nameLessonSection">معرفی آرایه در php</div>
                        <div className="link_delete">
                             <button type="button" className="btn btn-danger link_btnDel">حذف</button>
                        </div>

                    </div>
                    <div className="listLink">
                        <div className="link_nameBook">php</div>
                        <div className="link_nameLesson">آرایه ها</div>
                        <div className="link_nameLessonSection">معرفی آرایه در php</div>
                        <div className="link_delete">
                             <button type="button" className="btn btn-danger link_btnDel">حذف</button>
                        </div>

                    </div>
                    <div className="listLink">
                        <div className="link_nameBook">php</div>
                        <div className="link_nameLesson">آرایه ها</div>
                        <div className="link_nameLessonSection">معرفی آرایه در php</div>
                        <div className="link_delete">
                             <button type="button" className="btn btn-danger link_btnDel">حذف</button>
                        </div>

                    </div>
                </div>


            </div> */}

                {/* //     <form className='AET_form' ref={form} method="post" onSubmit={handleEditLessonSection} onFocus={deleteAlert}>

            //         <div className="formAlert" ref={notify}></div>

       

            //     </form> */}
            </section>
        </section>

    )
}

export default AddLink;



